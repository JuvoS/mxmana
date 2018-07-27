let utilLib = {};

utilLib.status = 200;
utilLib.failStatus = 0;
utilLib.message = "成功";
utilLib.failMessage = "失败";
utilLib.isEmptyObject = function (obj){
    for(var key in obj)
    {
        return false;
    } 
    return true; 
}
utilLib.getMD5Password =function (content) {
    var md5 = crypto.createHash('md5');//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
    md5.update(content);
    var d = md5.digest('hex');  //加密后的值d
    return d;
}

module.exports = utilLib;
