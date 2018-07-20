'use strict';

module.exports = {
	tableName: 'mn_supplier',	//产品供应商表
	attr: {
        supId		: String,	//产品供应商Id
        title		: String,	//产品供应商名称
        description	: { type: 'text'},	//产品供应商描述
        picId		: String,	//图片库Id
        basicPic	: { type: "text"},		//基础图片地址
		open_flag	: String,	//产品供应商开启状态
        createTime	: Date,		//创建时间
        updateTime	: Date		//更新时间
   },
   func: {
   	
   }
};