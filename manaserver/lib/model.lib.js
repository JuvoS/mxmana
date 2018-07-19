'use strict';

let userModel = require('../core/model/userModel');
let userRoleModel = require('../core/model/userRoleModel');
let roleModel = require('../core/model/roleModel');
let rolePurviewModel = require('../core/model/rolePurviewModel');
let purviewModel = require('../core/model/purviewModel');
let recordLoginModel = require('../core/model/recordLoginModel');

module.exports = [
	userModel,
	userRoleModel,
	roleModel,
	rolePurviewModel,
	purviewModel,
	recordLoginModel
];