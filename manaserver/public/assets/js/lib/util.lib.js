var utilLib = {
	successStatus: 200,
	failStatus: 0,
	successMessage: '成功',
	failMessage: '失败',
	isEmptyObject: function (obj){
	    for(var key in obj)
	    {
	        return false;
	    } 
	    return true; 
	},
	getMD5Password: function (content) {
	    var md5 = crypto.createHash('md5');//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
	    md5.update(content);
	    var d = md5.digest('hex');  //加密后的值d
	    return d;
	}
};
