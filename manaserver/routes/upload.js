var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var uploadModel = require('../lib/upload.lib');
var fs = require('fs');

router.route('/')
.get(function (req, res, next){	  
	res.render('upload', { title: 'hello'});
})
.post(function(req, res, next) {
    var form = new multiparty.Form();
    form.encoding = 'utf-8';
    form.uploadDir = './public/upload/';
    form.maxFilesSize = 2 * 1024 * 1024;	//文件大小
    // form.maxFields = 1000;   //设置所有文件的大小总和
    //上传后处理
    form.parse(req, function(err, fields, files) {
        var filesTemp = JSON.stringify(files, null, 2);

        if(err) res.json({status: 100,content: err});
  
        var inputFile = files.inputFile[0];
        var uploadedPath = inputFile.path;
        var dstPath = './public/upload/' + inputFile.originalFilename;
        //重命名为真实文件名
        fs.rename(uploadedPath, dstPath, function(err) {
            if(err) {
                console.log('rename error:' + err);
            }else {
                console.log('rename ok');
            }
        }) 
        res.json({status: 200,content:'发布成功！',data:util.inspect({fields: fields, files: filesTemp})});
    })
});
router.route('/cc')
.get(function (req, res, next){	  
	res.render('uploadfor', { title: 'hello'});
})
.post(function(req, res, next) {
//  uploadModel.mulUpload(req, res, function(data){
//  	res.json({status: 200,content:'上传成功！',data:data});
//  });
	uploadModel.forUpload(req, res, function(data){
    	res.json({status: 200,content:'上传成功！',data:data});
    });
});

module.exports = router;
