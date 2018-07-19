var express = require('express');
var app = express();
var router = express.Router();
var async = require('async');
var fs = require('fs');
const jsonFun = require('../lib/json.lib.js');
const fileLib = require('../lib/file.lib.js');
const statusLib = require('../lib/statusCheck.lib.js');

let dbInfo = require('../conf/database.config');
let dbLib = require('../lib/db.lib');
let modelArr = require('../lib/model.lib');


// 数据库页处理
router.route('/')
  // 数据库渲染页面
  .get(function(req,res){
    console.log('install');
    res.render('install', { title: 'Install - SQL' });
  })
  // post请求数据库
  .post(function(req,res) {
		dbLib.mInit(modelArr);
		fileLib.create('file.lock');
		var time = new Date();
		//文本追加写入
		fileLib.appendTxt('file.lock','\n'+'db init at '+time);
    res.send('注册成功');
  });
  
router.get('/Status', [jsonFun.jsonAccessFun], function (req, res, next) {
    var statusArr = {
    	'fileStatus': true
    };
    
    fs.exists('./lib/file.lock', function(exists) {
			if(!exists){
				statusArr['fileStatus'] = false;
			}
		});
    
    res.end(JSON.stringify(statusArr));
});
module.exports = router;
