var express = require('express');
var router = express.Router();
let dateLib = require('../lib/date.lib');
let codeLib = require('../lib/codeGener.lib');
let utilLib = require('../lib/util.lib');
let dbLib = require('../lib/db.lib');
let jsonFun = require('../lib/json.lib.js');
let userModel = require('../core/model/userModel');
var cookieParser = require('cookie-parser');

router.get('/', function(req, res, next) {
  res.render('users', { title: 'Users', manaId: codeLib.generCode() });
});
router.get('/list/:keywords',[jsonFun.jsonAccessFun] ,async function(req, res, next) {
  var infoTemp = req.params.keywords;
  
  var findInfo = {};
  if(infoTemp != 'all' && infoTemp){
  	findInfo = { 
			user_name		: infoTemp,
			user_pwd		: infoTemp,
			user_mobile	: infoTemp, 
			user_email	: infoTemp,
			manaId			: infoTemp,
		};
  }

	var data = await dbLib.mFindLike(userModel,findInfo);
	res.json({status: 200, message: "success", data: data});

});

router.post('/create', async function(req, res, next) {
	var infoTemp = req.body;
	var findInfo = { 
		manaId			: infoTemp.manaId,
		user_mobile	: infoTemp.user_mobile
	};
	var data = await dbLib.mFindOr(userModel,findInfo);
	if(data === undefined || data.length == 0){
			var userInfo = { 
				user_name		: infoTemp.user_name,
				user_pwd		: infoTemp.user_pwd,
				user_mobile	: infoTemp.user_mobile, 
				user_email	: infoTemp.user_email,
				manaId			: infoTemp.manaId,
				createTime	: dateLib.getTimeStamp(),
				updateTime	: dateLib.getTimeStamp(),
				open_flag		: 1
			};
			dbLib.mInsert(userModel,userInfo,function(){
				res.json({status: 200, message: "success", data: userInfo});
			});
	}else{
		res.json({status: 0, message: "该手机号或身份已注册", data: data});
	}
});

router.post('/update', async function(req, res, next) {
	var infoTemp = req.body;
	var findInfo = { 
		manaId			: infoTemp.manaId
	};
	console.log(infoTemp);
	var userInfo = [];
	for(var key in infoTemp){
		userInfo[]
	}
	var userInfo = [{ 
		user_name		: infoTemp.user_name,
		user_pwd		: infoTemp.user_pwd,
		user_mobile	: infoTemp.user_mobile, 
		user_email	: infoTemp.user_email,
		manaId			: infoTemp.manaId,
		updateTime	: dateLib.getTimeStamp(),
		open_flag		: 1
	}];
	return await dbLib.mUpdate(userModel, findInfo, userInfo,function(){
		res.json({status: utilLib.status, message: utilLib.message});
	});

});

router.get('/login', function(req, res, next) {
	var manaId = '';
	if(req.session.manaId){
		manaId = req.session.manaId;
	}

  res.render('userlogin', { title: 'Login', manaId: req.session.manaId });
})
.post('/login', function(req, res, next) {
	var infoTemp = req.body;
	var findInfo = { 
		user_mobile		: infoTemp.user_mobile,
		user_pwd		: infoTemp.user_pwd
	};
	dbLib.mFind(userModel,findInfo,function(data){
		if(utilLib.isEmptyObject(data)){
			utilLib.status = 0;
			utilLib.message = "用户名或密码错误";
		}else{
			req.session.logged_in = 1;
    	req.session.manaId = data[0].manaId;
		}
		res.json({status: utilLib.status, message: utilLib.message});
	});
});

module.exports = router;
