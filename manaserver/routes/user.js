var express = require('express');
var router = express.Router();
let mnDb = require('../lib/mndb.lib');
let dbInfo = require('../conf/database.config');
let dbLib = require('../lib/db.lib');
let userModel = require('../core/model/userModel');
var mysql  = require('mysql');  

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond at api');
});
//insert
router.get('/insert/:num', function (req, res, next) {
	var userInfo = { 
		user_name: "John",
		user_pwd: "Doe",
		user_mobile: req.params.num 
	};
	dbLib.mInsert(userModel,userInfo,function(){
		console.log("insert userInfo success!");
		res.send('respond at api:'+data);
	});
});
//find
router.get('/find', function (req, res, next) {
	var findInfo = { 
		user_name: "John"
	};
	dbLib.mFind(userModel,findInfo,function(data){
		console.log("find userInfo success!");
		res.send('respond at api:'+JSON.stringify(data));
	});
});
//limit
router.get('/limit/:limitNum', function (req, res, next) {
	var findInfo = { 
		user_name: "John"
	};
	var onlyArr = [
		"user_name",
		"user_pwd"
	];
var current_page = 2; //默认为1
  var num = req.params.limitNum; //一页条数
  if (req.query.page) {
    current_page = parseInt(req.query.page);
  }
 
  var last_page = current_page - 1;
  if (current_page <= 1) {
    last_page = 1;
  }
  var next_page = current_page + 1;
  var str = 'SELECT * FROM '+userModel.tableName+' limit ' + num + ' offset ' + num * (current_page - 1);
  var conn = mysql.createConnection(dbInfo);
 
  conn.connect();
	conn.query(str, function(err, rows, fields) {
		
    if (err) return console.log(err);
//  console.log(rows);
	  if (!rows[0]) {
	    res.send('error', '已到最后一页,请返回');
	  }
		res.send(rows);
	});
  conn.end();
});
//page
router.get('/page/:pageIndex/:limitNum', function (req, res, next) {
	var data = dbLib.mPage(req.params.pageIndex, req.params.limitNum, userModel, [])
	console.log(data);
	res.send(data);
});
//count
router.get('/count', function (req, res, next) {
	var findInfo = { 
		user_name: "John"
	};
	dbLib.mCount(userModel,findInfo,function(data){
		console.log("count userInfo success!");
		res.send('respond at api:');
	});
});
// get请求
router.get('/mn', function (req, res, next) {
	return mnDb.mnConnect(dbInfo)
	.then(function (db) {
		var Person = db.mnDefine(userModel.tableName, userModel.attr, userModel.func);
		// add the table to the database
	    db.mnSync(function(err) { 
	        if (err) throw err;
	
	        Person.mnCreate({ user_name: "John", user_pwd: "Doe", user_mobile: 28 })
	        .then(function (people) {
					// SQL: "SELECT * FROM person WHERE surname = 'Doe'"
			
					console.log("create!!");
					return Person.mnAll({ user_pwd: "Doe" })
					.then(function (people) {
						// SQL: "SELECT * FROM person WHERE surname = 'Doe'"
				
						console.log("People found: %d", people.length);
			            console.log("First person: %s, age %d", people[0].fullName(), people[0].user_mobile);
			
						people[0].age = 16;
						return people[0].mnSave()
						.fail(function (err) {
							console.log(err.stack);
						});
					});
				});
			
			
	    });
		
		
	})
	.catch(function(err) {
		console.error('Connection error: ' + err);
	});
	db.close();
	console.log("db close!");
});

module.exports = router;
