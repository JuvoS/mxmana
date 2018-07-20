'use strict';

module.exports = {
	tableName: 'mn_supplier_scheme',	//供应商方案表
	attr: {
        supId		: String,	//产品供应商Id
        schemeId	: String,	//方案Id
		open_flag	: String,	//产品供应商方案开启状态
        createTime	: Date,		//创建时间
        updateTime	: Date		//更新时间
   },
   func: {
   	
   }
};