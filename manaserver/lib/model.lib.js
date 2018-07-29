'use strict';

let abilityModel = require('../core/model/abilityModel');
let cateModel = require('../core/model/cateModel');
let patternAttrModel = require('../core/model/patternAttrModel');
let patternModel = require('../core/model/patternModel');
let picPoolModel = require('../core/model/picPoolModel');
let productAttrModel = require('../core/model/productAttrModel');
let productModel = require('../core/model/productModel');
let productTechnologyModel = require('../core/model/productTechnologyModel');
let purviewModel = require('../core/model/purviewModel');
let recordLoginModel = require('../core/model/recordLoginModel');
let roleModel = require('../core/model/roleModel');
let rolePurviewModel = require('../core/model/rolePurviewModel');
let schemeAbilityModel = require('../core/model/schemeAbilityModel');
let schemeModel = require('../core/model/schemeModel');
let schemeProductModel = require('../core/model/schemeProductModel');
let supplierBasicModel = require('../core/model/supplierBasicModel');
let supplierCertModel = require('../core/model/supplierCertModel');
let supplierModel = require('../core/model/supplierModel');
let supplierProductModel = require('../core/model/supplierProductModel');
let supplierSchemeModel = require('../core/model/supplierSchemeModel');
let technologyModel = require('../core/model/technologyModel');
let userModel = require('../core/model/userModel');
let userRoleModel = require('../core/model/userRoleModel');

module.exports = [
	abilityModel,
	cateModel,
	patternAttrModel,
	patternModel,
	picPoolModel,
	productAttrModel,
	productModel,
	productTechnologyModel,
	purviewModel,
	recordLoginModel,
	roleModel,
	rolePurviewModel,
	schemeAbilityModel,
	schemeModel,
	schemeProductModel,
	supplierBasicModel,
	supplierCertModel,
	supplierModel,
	supplierProductModel,
	supplierSchemeModel,
	technologyModel,
	userModel,
	userRoleModel
];