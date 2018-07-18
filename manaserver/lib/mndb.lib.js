'use strict';

var Q		= require('q'),
	Qx		= require('qx'),
	orm		= require('orm'),
	events	= require('events');
	
var ucfirst = require('./ucfirst.lib.js').ucfirst;

exports.mnConnect = function (configs) {
	return Q.ninvoke(orm, 'connect', configs)
	.then(setupConnectionMethods);
};

(function(){
var _db = null;
var _models = {};
var _pending = 0;
var _queue = [];

exports.mnExpress = function(uri, opts){
	opts = opts || {};
	
	_pending += 1;
	
	exports.mnConnect(uri).then(function(db){
		if(Array.isArray(_db)){
			_db.push(db);
		}else if(_db !== null){
			_db = [_db, db];
		}else {
			_db = db;
		}
		
		if(typeof opts.define === 'function'){
			if(opts.define.length > 2){
				return Q.nfcall(opts.define, db, _models);
			}
			return Q.fcall(opts.define, db, _models);
		}
	}).catch(function(err){
		if(typeof opts.error === 'function'){
			opts.error(err);
		}else {
			throw err;
		}
	}).then(function(){
		_pending -= 1;
		if(_pending >0) return;
		if(_queue.length === 0) return;
		for(var i=0;i<_queue.length;i++){
			_queue[i]();
		}
		_queue.length = 0;
	}).done();
	
	return function QORM_ExpressMiddleware(req, res, next){
		if(!req.hasOwnProperty("models")){
			req.models = _models;
		}
		if(!req.hasOwnProperty("db")){
			req.db = _db;
		}
		if(next === undefined && typeof res === 'function'){
			next = res;
		}
		if(_pending > 0){
			_queue.push(next);
			return;
		}
		return next();
	}
};
}).bind(this)()

function setupConnectionMethods(connection){
	connection.mnDefine = defineModel.bind(connection);
	connection.mnExecQuery = Q.nbind(connection.driver.execQuery, connection.driver);
	connection.mnSync = Q.nbind(connection.sync, connection);
	connection.mnDrop = Q.nbind(connection.drop, connection);
	
	return connection;
}

function defineModel(name, properties, opts){
	var connection = this;
	
	if(!opts){
		opts = {};
	}
	
	var Model = connection.define(name, properties, opts);
	Model.events = new events.EventEmitter();
	Model.oneAssociations = [];
	Model.manyAssociations = [];
	
	Model.mnCreate = function(){
		return Q.npost(Model, 'create', Array.prototype.slice.apply(arguments)).then(extendInstance);
	}
	Model.mnGet = function(){
		return Q.npost(Model, 'get', Array.prototype.slice.apply(arguments)).then(extendInstance);
	}
	Model.mnFind = function(){
		return Q.npost(Model, 'find', Array.prototype.slice.apply(arguments)).then(extendInstance);
	}
	Model.mnOne = function(){
		return Q.npost(Model, 'one', Array.prototype.slice.apply(arguments)).then(extendInstance);
	}
	Model.mnAll = function(){
		return Q.npost(Model, 'all', Array.prototype.slice.apply(arguments)).then(extendInstance);
	}
	Model.mnCount = function(){
		return Q.npost(Model, 'count', Array.prototype.slice.apply(arguments)).then(extendInstance);
	}
	
	Model.mnHasOne = hasOne.bind(Model);
	Model.mnHasMany = hasMany.bind(Model);
	
	setupOneAssociations(Model, opts.hasOne);
	setupManyAssociations(Model, opts.hasMany);
	
	return Model;
}

function hasOne(){
	var Model = this;
	var opts = {};
	var name;
	var OtherModel = Model;
	
	for(var i=0;i<arguments.length;i++){
		switch (typeof arguments[i]){
			case "string":
				name = arguments[i];
				break;
			case "function":
				if(arguments[i].table){
					OtherModel = arguments[i];
				}
				break;
			case "object":
				opts = arguments[i];
				break;
		}
	}
	
	Model.hasOne(name, OtherModel, opts);
	setUpOneAssociation(name, Model, OtherModel, opts);
	
	if(opts.reverse){
		setUpManyAssociation(opts.reverse, OtherModel, Model, {
			accessor: opts.reverseAccessor
		});
	}
}

function hasMany(){
	var Model = this;
	var name;
	var OtherModel = Model;
	var props = null;
	var opts = {};
	
	for (var i=0;i<arguments.length;i++) {
		switch (typeof arguments[i]) {
			case "string":
				name = arguments[i];
				break;
			case "function":
				OtherModel = arguments[i];
				break;
			case "object":
				if (props === null) {
					props = arguments[i];
				} else {
					opts = arguments[i];
				}
				break;
		}
	}
	
	Model.hasMany(name, OtherModel, props, opts);
	setUpManyAssociation(name, Model, OtherModel, opts);
	
	if(opts.reverse){
		setUpManyAssociation(opts.reverse, OtherModel, Model, {
			accessor: opts.reverseAccessor
		});
	}
}

function extendInstanceWithAssociation(Instance, association){
	function extendInstanceForAssociation(instance){
		return extendInstance(Instance, association.model);
	}
	
	Object.defineProperty(Instance, 'mn'+ucfirst(association.hasAccessor), {
		value: function (){
			return Q.npost(Instance, association.hasAccessor, Array.prototype.slice.apply(arguments))
			.then(extendInstanceForAssociation);
		},
		enumerable: false
	});
	Object.defineProperty(Instance, 'mn'+ucfirst(association.hasAccessor), {
		value: function (){
			return Q.npost(Instance, association.getAccessor, Array.prototype.slice.apply(arguments))
			.then(extendInstanceForAssociation);
		},
		enumerable: false
	});
	Object.defineProperty(Instance, 'mn'+ucfirst(association.hasAccessor), {
		value: function (){
			return Q.npost(Instance, association.setAccessor, Array.prototype.slice.apply(arguments))
			.then(extendInstanceForAssociation);
		},
		enumerable: false
	});
	if(!association.reserved){
		Object.defineProperty(Instance, 'mn'+ucfirst(association.hasAccessor), {
			value: function (){
				return Q.npost(Instance, association.delAccessor, Array.prototype.slice.apply(arguments))
				.then(extendInstanceForAssociation);
			},
			enumerable: false
		});
	}
	if(!association.addAccessor){
		Object.defineProperty(Instance, 'mn'+ucfirst(association.hasAccessor), {
			value: function (){
				return Q.npost(Instance, association.addAccessor, Array.prototype.slice.apply(arguments))
				.then(extendInstanceForAssociation);
			},
			enumerable: false
		});
	}
}

function extendInstance(instances, MnModel){
	if(instances === null || instances === []){
		return null;
	}
	
	if(Array.isArray(instances)){
		return Qx.map(instances, function(instance){
			return extendInstance(instance, MnModel);
		});
	}
	
	var instance = instances;
	
	if(instance.isExtended){
		return instance;
	}
	
	if(!MnModel){
		MnModel = instance.model();
	}
	
	Object.defineProperty(instance, 'mnSave', {
		value: Q.nbind(instance.save,instance),
		enumerable: false
	});
	
	Object.defineProperty(instance, 'mnRemove', {
		value: Q.nbind(instance.remove, instance),
		enumerable: false
	});
	
	Object.defineProperty(instance, 'mnValidate', {
		value: Q.nbind(instance.validate, instance),
		enumerable: false
	});
	
	var i;
	for(var i=0;MnModel.oneAssociations && (i<MnModel.oneAssociations.length);i++){
		extendInstanceWithAssociation(instance, MnModel.oneAssociations[i]);		
	}
	for(var i=0;MnModel.manyAssociations && (i<MnModel.manyAssociations.length);i++){
		extendInstanceWithAssociation(instance, MnModel.manyAssociations[i]);		
	}
	
	Object.defineProperty(instance, 'isExtended', {
		value: true,
		enumerable: false
	});
	
	if(MnModel.mnAfterLoad){
		return MnModel.mnAfterLoad.apply(instance);
	}
	
	return instance;
}

function setUpOneAssociation(name, Model, OtherModel, opts) {
	var assocName = opts.name || ucfirst(name);
	var assocTemplateName = opts.accessor || assocName;

	var association = {
		model		   : OtherModel,
		getAccessor    : opts.getAccessor || ("get" + assocTemplateName),
		setAccessor    : opts.setAccessor || ("set" + assocTemplateName),
		hasAccessor    : opts.hasAccessor || ("has" + assocTemplateName),
		delAccessor    : opts.delAccessor || ("remove" + assocTemplateName)
	};
	Model.oneAssociations.push(association);
	Model["mnFindBy" + assocTemplateName] = Q.nbind(Model["findBy" + assocTemplateName], Model);
}

function setUpManyAssociation(name, Model, OtherModel, opts) {
	var assocName = opts.name || ucfirst(name);
	var assocTemplateName = opts.accessor || assocName;

	var association = {
		model		   : OtherModel,
		getAccessor    : opts.getAccessor || ("get" + assocTemplateName),
		setAccessor    : opts.setAccessor || ("set" + assocTemplateName),
		hasAccessor    : opts.hasAccessor || ("has" + assocTemplateName),
		delAccessor    : opts.delAccessor || ("remove" + assocTemplateName),
		addAccessor    : opts.addAccessor || ("add" + assocTemplateName)
	};
	Model.manyAssociations.push(association);
}

function setupOneAssociations(Model, hasOne){
	if(!hasOne){
		return;
	}
	
	var assoc;
	for(var name in hasOne){
		assoc = hasOne[name];
		Model.qHasOne(name, assoc.model, assoc.opts);
	}
}

function setupManyAssociations(Model, hasMany){
	if(!hasMany){
		return;
	}
	
	var assoc;
	for(var name in hasMany){
		assoc = hasMany[name];
		Model.qHasMany(name, assoc.model, assoc.extra, assoc.opts);
	}
}
