'use strict';

module.exports = {
	tableName: 'mn_pattern_cate',	//模型分类表
	attr: {
		patternId	: String,	//产品模型Id
		patternName	: String,	//模型名
		cateId		: String,	//分类Id
		createTime	: Date,		//创建时间
		updateTime	: Date		//更新时间
	},
	func: {
		
	}
};