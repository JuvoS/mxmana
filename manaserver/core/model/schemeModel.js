'use strict';

module.exports = {
	tableName: 'mn_scheme',	//方案表
	attr: {
        schemeId	: String,	//方案Id
        title		: String,	//方案名称
        description	: { type: 'text'},	//方案描述
        picId		: String,	//图片库Id
        basicPic	: { type: "text"},		//基础图片地址
		open_flag	: String,	//方案开启状态
        createTime	: Date,		//创建时间
        updateTime	: Date		//更新时间
   },
   func: {
   	
   }
};