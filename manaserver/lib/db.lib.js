let dbInfo = require('../conf/database.config.js');
let dbUrl = 'mysql://'+dbInfo.user+':'
	+dbInfo.password+'@'+dbInfo.host
	+'/'+dbInfo.database;

module.exports = dbUrl;