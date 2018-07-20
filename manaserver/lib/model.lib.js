'use strict';

let userModel = require('../core/model/userModel');
let userRoleModel = require('../core/model/userRoleModel');
let roleModel = require('../core/model/roleModel');
let rolePurviewModel = require('../core/model/rolePurviewModel');
let purviewModel = require('../core/model/purviewModel');
let recordLoginModel = require('../core/model/recordLoginModel');
let productModel = require('../core/model/productModel');
let productAttrModel = require('../core/model/productAttrModel');
let patternAttrModel = require('../core/model/patternAttrModel');
let patternCateModel = require('../core/model/patternCateModel');

module.exports = [
	userModel,
	userRoleModel,
	roleModel,
	rolePurviewModel,
	purviewModel,
	recordLoginModel,
	productModel,
	productAttrModel,
	patternAttrModel,
	patternCateModel
];