'use strict';

module.exports = {
	tableName: 'mn_supplier_cert',	//供应商资质表
	attr: {
        supId		: String,	//产品供应商Id
        title		: String,	//供应商资质名称
        description	: { type: 'text'},	//供应商资质描述
        picId		: String,	//图片库Id
        basicPic	: { type: "text"},		//基础图片地址
		open_flag	: String,	//供应商资质开启状态
        createTime	: Date,		//创建时间
        updateTime	: Date		//更新时间
   },
   func: {
   	
   }
};