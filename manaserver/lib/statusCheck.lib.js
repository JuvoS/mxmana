let orm = require('orm');
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

module.exports = statusCheck;