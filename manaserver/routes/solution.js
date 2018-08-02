var express = require('express');
var router = express.Router();
let jsonFun = require('../lib/json.lib.js');


router.get('/', function (req, res, next){
	res.render('solution', { title: 'Solution' , localUrl: jsonFun.localUrl });
});

module.exports = router;
