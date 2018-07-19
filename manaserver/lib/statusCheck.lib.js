var orm = require('orm');
var fs = require("fs");
let dbInfo = require('../conf/database.config');
let statusCheck = {}

statusCheck.dbConnectFunc = function(){
	orm.connectAsync(dbInfo)
	.then(function(data) {
		console.log("connect!!");
		return true;
	})
	.catch(function(err) {
		console.error('Connection error: ' + err);
		return false;
	});
}

statusCheck.dbTableHasFunc = function(fileUrl){
	fs.exists(fileUrl, function(exists) {
		if(!exists){
			return false;
		}
		return true;
	});
}

module.exports = statusCheck;