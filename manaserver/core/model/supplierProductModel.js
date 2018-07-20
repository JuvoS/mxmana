'use strict';

module.exports = {
	tableName: 'mn_supplier_product',	//供应商产品表
	attr: {
        supId		: String,	//产品供应商Id
        productId	: String,	//产品Id
		open_flag	: String,	//产品供应商产品开启状态
        createTime	: Date,		//创建时间
        updateTime	: Date		//更新时间
   },
   func: {
   	
   }
};