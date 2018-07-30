var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var uploadModel = require('../lib/upload.lib');
var dbLib = require('../lib/db.lib');
var dateLib = require('../lib/date.lib');
var picPoolModel = require('../core/model/picPoolModel');
var fs = require('fs');
const multer=require("multer");

//文件上传所需代码
//设置文件上传路径和文件命名
var storage = multer.diskStorage({
    destination: function (req, file, cb){
        //文件上传成功后会放入public下的upload文件夹
        cb(null, './public/upload')
    },
    filename: function (req, file, cb){
        //设置文件的名字为其原本的名字，也可以添加其他字符，来区别相同文件，例如file.originalname+new Date().getTime();利用时间来区分
        cb(null, file.originalname)
    }
});
var upload = multer({
    storage: storage
});

router.route('/')
.get(function (req, res, next){	  
	res.render('upload', { title: 'hello'});
})
.post(upload.single('file'),function(req, res, next) {
//拼接文件上传后的网络路径，
    var url = 'http://' + req.headers.host + '/upload/' + req.file.originalname;
    //将其发回客户端
    res.json({
        code : 1,
        data : url
    });
    res.end();
});

router.route('/mul')
.get(function (req, res, next){	  
	res.render('uploadmul', { title: 'hello'});
})
.post(function(req, res, next) {
    uploadModel.mulUpload(req, res,function(data){

		var picInfo = {
			picId	: data.codeGenNum,
			poolId	: 'mx',
			picName	: data.codeGenNum,
			picRealName	: data.originName,
			picType	: data.type,
			picUrl	: data.url,
			createTime	: dateLib.getTimeStamp(),
			updateTime	: dateLib.getTimeStamp()
		};
		dbLib.mInsert(picPoolModel,picInfo,function(){
			res.json({status: 200,content:'上传成功！',data:data});
		});
    });
});
router.route('/for')
.get(function (req, res, next){	  
	res.render('uploadfor', { title: 'hello'});
})
.post(function(req, res, next) {
	uploadModel.forUpload(req, res, function(data){
    	res.json({status: 200,content:'上传成功！',data:data});
    });
});

router.route('/list')
.get(async function (req, res, next){	  
	var findInfo = {};
	var data = await dbLib.mFindLike(picPoolModel,findInfo);
	res.json({status: 200, message: "success", data: data});
})

module.exports = router;
