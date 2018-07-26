'use strict';

module.exports = {
	tableName: 'mn_pic_pool',	//图片池表
	attr: {
        picId		: String,	//图片Id
        poolId		: String,	//用户池Id
        picName		: String,	//图片名称
        picRealName	: String,	//图片原名称
        picType		: String,	//图片类型
        picUrl		: { type: 'text'},	//图片地址
		open_flag	: String,	//图片开启状态
        createTime	: Date,		//创建时间
        updateTime	: Date		//更新时间
   },
   func: {
   	
   }
};