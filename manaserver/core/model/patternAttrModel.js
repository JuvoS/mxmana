'use strict';

module.exports = {
	tableName: 'mn_pattern_attr',	//模型属性表
	attr: {
		attrId		: String,	//属性Id
		patternId	: String,	//产品模型Id
		attrName	: String,	//属性名
		attrCate	: String,	//属性类型
		attrInfo	: Object,	//选项型属性内容
		createTime	: Date,		//创建时间
		updateTime	: Date		//更新时间
	},
	func: {
		
	}
};