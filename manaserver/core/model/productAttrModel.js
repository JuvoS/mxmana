'use strict';

module.exports = {
	tableName: 'mn_product_attr',	//产品属性表
	attr: {
		productId	: String,	//产品Id
		attrId		: String,	//属性Id
		attrName	: String,	//属性名
		attrValue	: String,	//属性值
		createTime	: Date,		//创建时间
		updateTime	: Date		//更新时间
	},
	func: {
		
	}
};