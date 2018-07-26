 let dbInfo = require('../conf/database.config');
let mnDb = require('./mndb.lib');
var orm	= require('orm');
var mysql  = require('mysql');  
let utilLib = require('./util.lib');
let db = {}

db.mInsert = function(dbModel, dbArray, dbFunc){
	mnDb.mnConnect(dbInfo)
	.then(function (dbLink) {
		var dbTemp = dbLink.mnDefine(dbModel.tableName, dbModel.attr, dbModel.func);

	    dbLink.mnSync(function(err) { 
	        if (err) throw err;
	
	        return dbTemp.mnCreate(dbArray).then(dbFunc);
	    });
	})
	.catch(function(err) {
		return err;
	});
}

db.mGet = function(dbModel, dbArray, dbFunc){
	mnDb.mnConnect(dbInfo)
	.then(function (dbLink) {
		var dbTemp = dbLink.mnDefine(dbModel.tableName, dbModel.attr, dbModel.func);

	    dbLink.mnSync(function(err) { 
	        if (err) throw err;
	
	        dbTemp.mnGet(dbArray).then(function(data){
	        	return dbFunc(data);
	        });
	    });
	})
	.catch(function(err) {
		return err;
	});
}

db.mCount = function(dbModel, dbArray, dbFunc){
	orm.connect(dbInfo, function (err, dbLink) {
		if (err) throw err;
	
	    var dbTemp = dbLink.define(dbModel.tableName, dbModel.attr, dbModel.func);
	
	    // add the table to the database
	    dbLink.sync(function(err) { 
	        if (err) throw err;
	        
	        dbTemp.find({ user_pwd: "Doe" }).count(function (err, data) {
			    return dbFunc(data);
			});

	    });
	});
}

db.mFind = function(dbModel, dbArray, dbFunc){
	mnDb.mnConnect(dbInfo)
	.then(function (dbLink) {
		var dbTemp = dbLink.mnDefine(dbModel.tableName, dbModel.attr, dbModel.func);

	    dbLink.mnSync(function(err) { 
	        if (err) throw err;
	
	        dbTemp.mnAll(dbArray).then(function(data){
	        	return dbFunc(data);
	        });
	    });
	})
	.catch(function(err) {
		return err;
	});
}

db.mFindOr = function(dbModel, dbArray){
	return new Promise(function(resolve,reject){
		var temp = ' ';
		var lastkey="";
		for(var key in dbArray){
			lastkey=key;
		}
		for(var key in dbArray){
			if(key == lastkey){
				temp += key + '="' + dbArray[key]+'"';
			}else{
				temp += key + '="' + dbArray[key]+'" or ';
			}
		}
		var str = 'SELECT * FROM '+dbModel.tableName+' WHERE ' + temp;
		
		var conn = mysql.createConnection(dbInfo);
		conn.connect();
		conn.query(str,async function(err, rows) {
			if(err){
                reject(err);
            	return;
           }
			resolve(rows);
		});
		conn.end();
	});
}

db.mFindLike = function(dbModel, dbArray){
	return new Promise(function(resolve,reject){
		var temp = '';
		var lastkey='';
		var str = 'SELECT * FROM '+dbModel.tableName;
		if(!utilLib.isEmptyObject(dbArray)){
			for(var key in dbArray){
				lastkey=key;
			}
			for(var key in dbArray){
				if(key == lastkey){
					temp += key + ' like "%' + dbArray[key]+'%"';
				}else{
					temp += key + ' like "%' + dbArray[key]+'%" or ';
				}
			}
			str += ' WHERE ' + temp;
		}
		
		var conn = mysql.createConnection(dbInfo);
		conn.connect();
		conn.query(str,async function(err, rows) {
			if(err){
                reject(err);
            	return;
           }
			resolve(rows);
		});
		conn.end();
	});
}

db.mFindLimit = function(dbModel, dbArray, dbFunc, limitNum = 2, offsetNum = 0, onlyArr){
	orm.connect(dbInfo, function (err, dbLink) {
		if (err) throw err;
	
	    var dbTemp = dbLink.define(dbModel.tableName, dbModel.attr, dbModel.func);
	
	    // add the table to the database
	    dbLink.sync(function(err) { 
	        if (err) throw err;
	        
	        dbTemp.find({ user_pwd: "Doe" }, {limit: limitNum}, function (err, data) {
			    console.log(dbModel.tableName+":"+limitNum+":"+JSON.stringify(data));
			    return dbFunc(data);
			});

	    });
	});
}

//分页
db.mPage = function(pageIndex = 1, pageNum = 2, dbModel, dbArray = []){
	return new Promise(function(resolve,reject){
		var current_page = parseInt(pageIndex); //默认为1
		var num = pageNum; //一页条数
		var last_page = current_page - 1;
		if (current_page <= 1) {
			last_page = 1;
		}
		var next_page = current_page + 1;
		var str = 'SELECT * FROM '+dbModel.tableName+
		' limit ' + num + ' offset ' + num * (current_page - 1);
		
		var conn = mysql.createConnection(dbInfo);
		conn.connect();
		conn.query(str, function(err, rows) {
			if(err){
                reject(err);
            	return;
           }
			resolve(rows);
		});
		conn.end();
	});
}

db.mDelete = function(dbModel, dbArray, dbFunc){
	orm.connect(dbInfo, function (err, dbLink) {
		if (err) throw err;
	
	    var dbTemp = dbLink.define(dbModel.tableName, dbModel.attr, dbModel.func);
	    dbLink.sync(function(err) { 
	        if (err) throw err;
	        
	        dbTemp.find(dbArray).remove(function (err) {
			    return dbFunc();
			});
	    });
	});
}

db.mUpdate = function(dbModel, dbArray, resData, dbFunc){
	orm.connect(dbInfo, function (err, dbLink) {
		if (err) throw err;
	
	    var dbTemp = dbLink.define(dbModel.tableName, dbModel.attr, dbModel.func);
	    dbLink.sync(function(err) { 
	        if (err) throw err;
	        console.log(resData.length);
	        dbTemp.find(dbArray).each(function (res) {    
	        	for(var i=0;i<resData.length;i++){
	        		res[resData[i]['name']] = resData[i]['info'];
	        	}
			}).save(function (err) {
			    return dbFunc();
			});
	    });
	});
}

//递归创建数据模型
var recurModel = function(modelArr, index){
	if(index <= modelArr.length){
		mnDb.mnConnect(dbInfo)
		.then(function (dbLink) {			
			var dbTemp = dbLink.mnDefine(modelArr[index].tableName, modelArr[index].attr, modelArr[index].func);
		    dbLink.mnSync(function(err) { 
		        if (err) throw err;
		        index++;
		        recurModel(modelArr, index);
		    });
		})
		.catch(function(err) {
			return err;
		});
	}
	return;
}
db.mInit = function(modelArr){
	recurModel(modelArr, 0);
}

module.exports = db;