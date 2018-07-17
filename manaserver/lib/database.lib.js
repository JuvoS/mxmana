let mysql = require('mysql');
let dbInfo = require('../conf/database.config.js');
let db = {}

//插入操作，注意使用异步返回查询结果
db.insert = function(connection, sql, paras, callback){
    connection.query(sql, paras, function (error, results, fields) {
        if (error) throw error;
        callback(results.insertId);//返回插入的id
    });
}
//插入操作，注意使用异步返回查询结果
db.query = function(connection, sql, paras, callback){
    connection.query(sql, paras, function (error, results, fields) {
        if (error) throw error;
        callback(results);//返回插入的id
    });
}


//获取数据库连接
db.connection = function(){
    let connection = mysql.createConnection(dbInfo);
    connection.connect(function(err){
        if(err){console.log(err);return;}
    });
    return connection;
}

//关闭数据库连接
db.close = function(connection){
    connection.end(function(err){
    	if(err){return;}
	});
}

module.exports = db;