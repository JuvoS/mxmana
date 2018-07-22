var express = require('express');
var app = express();
var router = express.Router();
const jsonFun = require('../lib/json.lib.js');

// 增加url 依赖
var urllib = require('url');
// 初始数据
var data = {
    status: '200', 
    msg: '获取成功',
    data: {
        userId: '123456',
        userName: 'hgdqstudio',
        blog: 'http://hgdqstudio.online'
    }
};

// get请求
router.get('/', [jsonFun.jsonAccessFun], function (req, res, next) {
    var params = urllib.parse(req.url, true);
    var query2 = params.query;
    // 打印get请求中的接口参数
    console.log(query2);
    res.end(JSON.stringify(data));
});

// get请求
router.get('/show/:powerId', [jsonFun.jsonAccessFun], function (req, res, next) {
    var params = urllib.parse(req.url, true);
    var query2 = params.query;
    // 打印get请求中的接口参数
    console.log(query2);
    var data = {
		    status: '200', 
		    msg: '获取成功',
		    data: {
		        userId: '95515157896',
		        powerId: req.params.powerId,
		        userName: 'Acine',
		        url: 'acine.com'
		    }
		};
    res.end(JSON.stringify(data));
});

module.exports = router;
