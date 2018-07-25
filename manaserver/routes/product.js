var express = require('express');
var router = express.Router();
const jsonFun = require('../lib/json.lib'); 
const uploadModel = require('../lib/upload.lib');

//tab
router.get('/', function (req, res, next){
	res.render('product', { title: 'Product' });
});

// add
router.route('/add')
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
  		var infoData = {
  			data:'注册成功',
  			info: req.body
  		};
    	res.send(JSON.stringify(infoData));
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
