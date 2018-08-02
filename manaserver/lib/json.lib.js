'use strict';

let jsonFun = {}
//json跨域头部信息修正
jsonFun.jsonAccessFun = function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
}
jsonFun.localUrl = 'http://127.0.0.1:3322';

module.exports = jsonFun;