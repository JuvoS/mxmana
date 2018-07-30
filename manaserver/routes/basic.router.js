var indexRouter = require('./index');
var usersRouter = require('./users');
var userRouter = require('./user');
var jsonRouter = require('./json');
var ormRouter = require('./orm');
var installRouter = require('./install');
var menuRouter = require('./menu');
var patternRouter = require('./pattern');
var productRouter = require('./product');
var uploadRouter = require('./upload');
var airTabRouter = require('./airTab');
var downLoadRouter = require('./download');

module.exports = {
	index	: indexRouter,
	users	: usersRouter,
	user	: userRouter,
	json	: jsonRouter,
	orm		: ormRouter,
	install	: installRouter,
	menu	: menuRouter,
	pattern	: patternRouter,
	product	: productRouter,
	upload	: uploadRouter,
	airTab	: airTabRouter,
	downLoad: downLoadRouter
}
