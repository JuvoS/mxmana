'use strict';

module.exports = {
	tableName: 'mn_cate',	//类别表
	attr: {
        cateId		: String,	//类别Id
        parentId	: String,	//父节点Id
        cateName	: String,	//类别名称
        cateType	: String,	//类别种类
        createTime	: Date,		//创建时间
        updateTime	: Date		//更新时间
   },
   func: {
   	
   }
};