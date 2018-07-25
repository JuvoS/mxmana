var fs = require('fs');
var multiparty = require('multiparty');
var formidable = require('formidable');
var fileLib = require('./file.lib');
let uploadModel = {}

uploadModel.upload = function (){
	
}

uploadModel.mulUpload = async function (req, res, callback){
	var form = new multiparty.Form();
	var dateTime = new Date();
	var month = dateTime.getMonth()+1;
	var fileUrl = './public/upload/'+dateTime.getFullYear()+'/'+month+'/';
	fileLib.dirExistH(fileUrl).then(function(){
		form.encoding = 'utf-8';
	    form.uploadDir = fileUrl;
	    form.maxFilesSize = 2 * 1024 * 1024;	//文件大小
	    // form.maxFields = 1000;   //设置所有文件的大小总和
	    //上传后处理
	    form.parse(req, function(err, fields, files) {
	        var filesTemp = JSON.stringify(files, null, 2);
	        if(err) res.json({status: 100,content: err});
	  
	        var inputFile = files.inputFile[0];
	        var uploadedPath = inputFile.path;
	        var dateTime = new Date();
	        var dstPath = fileUrl+ inputFile.originalFilename;
	        //重命名为真实文件名
	        fs.rename(uploadedPath, dstPath, function(err) {
	            if(err) res.json({status: 200,content: err});

	        }) 
	        callback(dstPath);
	    })
	});
}

uploadModel.forUpload = function (req, res, callback){
	var form = formidable.IncomingForm({
       encoding : 'utf-8',//上传编码
       uploadDir : "./public/upload/",//上传目录，指的是服务器的路径，如果不存在将会报错。
       keepExtensions : true,//保留后缀
       maxFieldsSize : 2 * 1024 * 1024//byte//最大可上传大小
   });
   var allFile=[];
   form.on('progress', function(bytesReceived, bytesExpected) {//在控制台打印文件上传进度
     var progressInfo = { 
        value: bytesReceived, 
        total: bytesExpected 
     }; 
     console.log('[progress]: ' + JSON.stringify(progressInfo)); 
     res.write(JSON.stringify(progressInfo)); 
   })
   .on('file', function (filed, file) {
      allFile.push([filed, file]);//收集传过来的所有文件
   })
   .on('end', function() { 
      res.end('上传成功！'); 
   })
   .on('error', function(err) {
     console.error('上传失败：', err.message); 
     next(err); 
   })
   .parse(req,function(err, fields, files){
     if(err){
        console.log(err);
     }
     allFile.forEach(function(file,index){
         var fieldName=file[0];
         var types = file[1].name.split('.');
         var date = new Date();
         var ms = Date.parse(date);
         fs.renameSync(file[1].path,form.uploadDir+"/"+types[0]+"."+String(types[types.length-1]));//重命名文件，默认的文件名是带有一串编码的，我们要把它还原为它原先的名字。
     });
   }); 
}

module.exports = uploadModel;