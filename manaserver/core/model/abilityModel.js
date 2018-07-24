'use strict';

module.exports = {
	tableName: 'mn_ability',	//功能表
	attr: {
        abilityId	: String,	//功能Id
        title		: String,	//功能名称
        description	: { type: 'text'},	//功能描述
        picId		: String,	//图片库Id
        basicPic	: { type: "text"},		//基础图片地址
		open_flag	: String,	//功能开启状态
        createTime	: Date,		//创建时间
        updateTime	: Date		//更新时间
   },
   func: {
   	
   }
};