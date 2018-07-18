var express = require('express');
var router = express.Router();
let mnDb = require('../lib/mndb.lib');
let dbInfo = require('../conf/database.config');
let dbLib = require('../lib/db.lib');
let userModel = require('../core/model/userModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond at api');
});
//insert
router.get('/insert', function (req, res, next) {
	var userInfo = { 
		user_name: "John",
		user_pwd: "Doe",
		user_mobile: 28 
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
	dbLib.mFindLimit(userModel,findInfo,function(data){
		console.log("find userInfo success!");
		res.send('respond at api:'+JSON.stringify(data));
	}, req.params.limitNum, 1, onlyArr);
});
//page
router.get('/page/:pageIndex/:limitNum', function (req, res, next) {
	if(!req.params.pageIndex || req.params.pageIndex ==0){
		req.params.pageIndex = 1;
	}
	if(!req.params.limitNum || req.params.limitNum ==0){
		req.params.limitNum = 1;
	}
	var findInfo = { 
		user_name: "John"
	};
	var onlyArr = [
		"user_name",
		"user_pwd"
	];
	dbLib.mPage(req.params.pageIndex, req.params.limitNum, userModel, findInfo, function(data){
		console.log("find userInfo success!pageIndex:"+req.params.pageIndex);
		res.send('respond at api:'+JSON.stringify(data));
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
