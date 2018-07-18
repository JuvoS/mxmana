let dbInfo = require('../conf/database.config');
let mnDb = require('./mndb.lib');
var orm	= require('orm');
let db = {}

db.mInsert = function(dbModel, dbArray, dbFunc){
	mnDb.mnConnect(dbInfo)
	.then(function (dbLink) {
		var dbTemp = dbLink.mnDefine(dbModel.tableName, dbModel.attr, dbModel.func);

	    dbLink.mnSync(function(err) { 
	        if (err) throw err;
	
	        return dbTemp.mnCreate(dbArray).then(dbFunc);
	    });
	})
	.catch(function(err) {
		return err;
	});
}

db.mGet = function(dbModel, dbArray, dbFunc){
	mnDb.mnConnect(dbInfo)
	.then(function (dbLink) {
		var dbTemp = dbLink.mnDefine(dbModel.tableName, dbModel.attr, dbModel.func);

	    dbLink.mnSync(function(err) { 
	        if (err) throw err;
	
	        dbTemp.mnGet(dbArray).then(function(data){
	        	return dbFunc(data);
	        });
	    });
	})
	.catch(function(err) {
		return err;
	});
}

db.mFind = function(dbModel, dbArray, dbFunc){
	mnDb.mnConnect(dbInfo)
	.then(function (dbLink) {
		var dbTemp = dbLink.mnDefine(dbModel.tableName, dbModel.attr, dbModel.func);

	    dbLink.mnSync(function(err) { 
	        if (err) throw err;
	
	        dbTemp.mnAll(dbArray).then(function(data){
	        	return dbFunc(data);
	        });
	    });
	})
	.catch(function(err) {
		return err;
	});
}

db.mFindLimit = function(dbModel, dbArray, dbFunc, limitNum = 2, offsetNum = 0, onlyArr){
	orm.connect(dbInfo, function (err, dbLink) {
		if (err) throw err;
	
	    var dbTemp = dbLink.define(dbModel.tableName, dbModel.attr, dbModel.func);
	
	    // add the table to the database
	    dbLink.sync(function(err) { 
	        if (err) throw err;
	        
	        dbTemp.find({ user_pwd: "Doe" }).limit(limitNum).offset(offsetNum).only(onlyArr).run(function (err, data) {
			    console.log(dbModel.tableName+":"+limitNum+":"+JSON.stringify(data));
			    return dbFunc(data);
			});

	    });
	});
}

db.mPage = function(pageIndex = 1, pageNum = 2, dbModel, dbArray,  dbFunc){
	orm.connect(dbInfo, function (err, dbLink) {
		if (err) throw err;
	
	    var dbTemp = dbLink.define(dbModel.tableName, dbModel.attr, dbModel.func);
	
	    // add the table to the database
	    dbLink.sync(function(err) { 
	        if (err) throw err;
	        	        
	        dbTemp.find({ user_pwd: "Doe" }).offset( (pageIndex - 1) * pageNum ).limit(pageNum).run(function (err, data) {
			    console.log(dbModel.tableName+":"+pageNum+":"+JSON.stringify(data));
			    return dbFunc(data);
			});

	    });
	});
}

module.exports = db;