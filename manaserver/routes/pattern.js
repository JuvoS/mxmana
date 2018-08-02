var express = require('express');
var router = express.Router();
let mnDb = require('../lib/mndb.lib');
let dbInfo = require('../conf/database.config');
let dbLib = require('../lib/db.lib');
const jsonFun = require('../lib/json.lib.js');
let userModel = require('../core/model/userModel');
var mysql  = require('mysql');  

router.get('/', function (req, res, next){
	res.render('pattern', { title: 'Pattern' , localUrl: jsonFun.localUrl });
});
//find
router.get('/all', function (req, res, next) {
	var modelInfo = {
		message: "模型获取成功",
		status: 200,
		data: [
			{
				patternId: 1,
				patternName: '开关',
				attr: {
					attrId: 00101,
					attrName: '材质',
					attrCate: 'select',
					attrInfo: ['金属','塑料','树枝']
				}
			},{
				patternId: 2,
				patternName: '灯具',
				attr: {
					attrId: 00201,
					attrName: '材质',
					attrCate: 'input',
					attrInfo: []
				}
			}
		]
	};
	
	res.send(JSON.stringify(modelInfo));
});

module.exports = router;
