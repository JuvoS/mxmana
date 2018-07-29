'use strict';

module.exports = {
	tableName: 'mn_supplier_basic',	//产品供应商基础信息表
	attr: {
        supId		: String,	//产品供应商Id
        supName		: String,	//公司名称
        supAddress	: String,	//公司地址
        supPer		: String,	//法人
        supCapital	: String,	//注册资本
        supTime		: String,	//注册日期
        supScope	: { type: "text"},	//经营范围
        supNum		: String,	//统一社会信用代码
        phone		: String,	//座机
        linkPer		: String,	//联系人
        linkPhone	: String,	//联系方式
        email		: String,	//邮箱
        licensePic	: { type: "text"},	//营业执照图片地址
        createTime	: { type: "text"},		//创建时间
        updateTime	: { type: "text"}		//更新时间
   },
   func: {
   	
   }
};