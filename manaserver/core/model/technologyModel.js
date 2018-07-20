'use strict';

module.exports = {
	tableName: 'mn_technology',	//技术信息表
	attr: {
        tecId		: String,	//技术信息Id
        title		: String,	//技术信息标题
        description	: { type: "text"},		//技术信息描述
        picId		: String,	//图片库Id
        basicPic	: { type: "text"},		//基础图片地址
		open_flag	: String,	//技术信息开启状态
        createTime	: Date,		//创建时间
        updateTime	: Date		//更新时间
   },
   func: {
   	
   }
};