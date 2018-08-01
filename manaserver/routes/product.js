var express = require('express');
var router = express.Router();
let jsonFun = require('../lib/json.lib'); 
let uploadModel = require('../lib/upload.lib');
let dbLib = require('../lib/db.lib');
let codeLib = require('../lib/codeGener.lib');
let dateLib = require('../lib/date.lib');
let utilLib = require('../lib/util.lib');
let productModel = require('../core/model/productModel');

//tab
router.get('/', function (req, res, next){
	res.render('product', { title: 'Product' , localUrl: 'http://127.0.0.1:3322' });
});

//list
router.get('/list/:keywords',[jsonFun.jsonAccessFun] ,async function(req, res, next) {
	var infoTemp = req.params.keywords;
  
	var findInfo = {};
	if(infoTemp != 'all' && infoTemp){
		findInfo = { 
			productId	: infoTemp,
			title		: infoTemp,
			description	: infoTemp
		};
	}

	var data = await dbLib.mFindLike(productModel,findInfo);
	res.json({status: 200, message: "success", data: data});

});

// add
router.post('/create',[jsonFun.jsonAccessFun], async function (req, res, next) {
	var infoTemp = req.body;
	var productId = '';
	while(1){
		productId = codeLib.generProCode();
		var data = await dbLib.mFindOr(productModel,{ productId: productId});
		if(data === undefined || data.length == 0){
			break;
		}
	}

	var productInfo = { 
		productId	: productId,
		title		: infoTemp.title,
		description	: infoTemp.description, 
		picId		: productId,
		createTime	: dateLib.getTimeStamp(),
		updateTime	: dateLib.getTimeStamp(),
		open_flag	: 1
	};
	dbLib.mInsert(productModel,productInfo,function(){
		res.json({status: 200, message: "success", data: productInfo});
	});
});

router.post('/update', async function(req, res, next) {
	var infoTemp = req.body;
	if(infoTemp.productId){
		var findInfo = { 
			productId: infoTemp.productId
		};
		var proInfo = [];
		for(var key in infoTemp){
			var temp = {
				name: key,
				info: infoTemp[key]
			};
			proInfo.push(temp);
		}
		var updateTime = {
			name: 'updateTime',
			info: dateLib.getTimeStamp()
		};
		proInfo.push(updateTime);
		return await dbLib.mUpdate(productModel, findInfo, proInfo,function(){
			res.json({status: utilLib.status, message: utilLib.message});
		});
	}
	res.json({status: utilLib.failStatus, message: utilLib.failMessage});

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
// add
router.route('/upload')
	.get([jsonFun.jsonAccessFun], function (req, res, next){
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
  	})
  	.post([jsonFun.jsonAccessFun], function (req, res, next) {
  		uploadModel.mulUpload(req, res, function(data){
  			var infoData = {
	  			data:'注册成功',
	  			info: data
	  		};
    		res.json(infoData);
  		})  		
  	});


module.exports = router;
