var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res, next) {
	var url = '/upload/2018/07/201807198824120727.png';
  res.render('download', { title: 'DownLoad' });
});

router.get('/list', function(req, res, next) {
	var url = '201807198824120727.zip';
  res.json({name:'001',url:url});
});

router.get('/now',function(req,res,next){
//	console.log(req.params.filename);
  //..db get file realpath
//res.download(realpath,filename);
//res.download('./public/upload/2018/07/',req.params.filename);
	var fileType = req.query.fileType;
    var fileName = req.query.fileName;
 
    if (fileType == 1) {
        //直接访问文件进行下载
        res.redirect(fileName);
    } else if (fileType == 2) {
        //以文件流的形式下载文件
        var filePath = path.join(__dirname, '../public/' + fileName);
        var stats = fs.statSync(filePath);
        var isFile = stats.isFile();
        if(isFile){
            res.set({
                'Content-Type': 'application/octet-stream', //告诉浏览器这是一个二进制文件
                'Content-Disposition': 'attachment; filename=' + fileName, //告诉浏览器这是一个需要下载的文件
                'Content-Length': stats.size  //文件大小
            });
            fs.createReadStream(filePath).pipe(res);
        } else {
            res.end(404);
        }
    } else if (fileType == 3) {
        //读取文件内容后再响应给页面
        var filePath = path.join(__dirname, '../public/' + fileName);
        var stats = fs.statSync(filePath);
        var isFile = stats.isFile();
        if (isFile) {
            fs.readFile(filePath, function(isErr, data){
                if (isErr) {
                    res.end("Read file failed!");
                    return;
                }
                res.set({
                    'Content-Type': 'application/octet-stream', //告诉浏览器这是一个二进制文件
                    'Content-Disposition': 'attachment; filename=' + fileName, //告诉浏览器这是一个需要下载的文件
                    'Content-Length': stats.size  //文件大小
                });
                res.end(data)
            })
        } else {
            res.end(404);
        }
    } else {
        res.end(404);
       }

});

module.exports = router;
