var fs = require("fs");
let fileStatus = require('./statusCheck.lib');
let fileLib = {}

//文件创建
fileLib.create = function(fileName, fileTxt = 'M.X'){
	var fileUrl = './lib/'+fileName;
	if(!fileStatus.dbTableHasFunc(fileUrl)){
		fs.createWriteStream(fileUrl);
		fs.writeFile(fileUrl, fileTxt,  function(err) {
			if (err) return console.error(err);
			return true;
		});
	}
	return true;
}
//文本追加写入
fileLib.appendTxt = function(fileName, fileTxt = 'M.X'){
	var fileUrl = './lib/'+fileName;
	if(!fileStatus.dbTableHasFunc(fileUrl)){
		fs.appendFile(fileUrl, fileTxt, function (err) {
			if (err) return console.error(err);
			return;
		});
	}
}
//文本覆盖写入
fileLib.writeTxt = function(fileName, fileTxt = 'M.X'){
	var fileUrl = './lib/'+fileName;
	if(!fileStatus.dbTableHasFunc(fileUrl)){
		fs.writeFile(fileUrl, fileTxt, function (err) {
			if (err) return console.error(err);
			return;
		});
	}
}


module.exports = fileLib;
