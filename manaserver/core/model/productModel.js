'use strict';

module.exports = {
	tableName: 'mn_product',	//产品表
	attr: {
        productId	: String,	//产品Id
        patternId	: String,	//产品模型Id
        picId		: String,	//图片库Id
        title		: String,	//产品标题
        description	: { type: "text"},		//产品描述
        basicPic	: { type: "text"},		//基础图片地址
        open_flag	: String,	//产品开启状态
        createTime	: Date,		//创建时间
        updateTime	: Date		//更新时间
   },
   func: {
   	
   }
};