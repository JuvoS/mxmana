'use strict';

//用户角色表
var userRoleModel = {
	tableName: 'mn_user_role',
	attr: {
        manaId	: String,	//用户manaId
        roleId 	: String	//对应角色Id
   },
   func: {
   	
   }
}
module.exports = userRoleModel;