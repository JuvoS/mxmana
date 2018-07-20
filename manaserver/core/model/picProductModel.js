'use strict';

module.exports = {
	tableName: 'mn_pic_product',	//产品图片表
	attr: {
        picId		: String,	//图片Id
        productId	: String,	//产品Id
        picName		: String,	//图片名称
        picUrl		: { type: 'text'},	//图片地址
		open_flag	: String,	//图片开启状态
        createTime	: Date,		//创建时间
        updateTime	: Date		//更新时间
   },
   func: {
   	
   }
};