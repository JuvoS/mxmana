'use strict';

module.exports = {
	tableName: 'mn_record_login',	//登录记录表
	attr: {
        manaId		: String,	//角色Id
        login_time	: Date,		//登录时间
        login_ip	: String,	//登录IP
        login_city	: String	//登录地点
   },
   func: {
   	
   }
};