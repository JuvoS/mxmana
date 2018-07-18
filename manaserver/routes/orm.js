var express = require('express');
var app = express();
var router = express.Router();
var orm = require('orm');
let mnDb = require('../lib/mndb.lib');
let dbInfo = require('../conf/database.config');
let userModel = require('../core/model/userModel');

// 增加url 依赖
var urllib = require('url');
// 初始数据
var data = {
    status: '100', 
    msg: '操作成功',
    data: {
        userId: '123456',
        userName: 'hgdqstudio',
        blog: 'http://hgdqstudio.online'
    }
};
// get请求
router.get('/', function (req, res, next) {
	orm.connectAsync(dbInfo)
	.then(function(data) {
		console.log("connect!!");
	})
	.catch(function(err) {
		console.error('Connection error: ' + err);
	});
});
// get请求
router.get('/mn', function (req, res, next) {
	return mnDb.mnConnect(dbInfo)
	.then(function (db) {
		var Person = db.mnDefine("mn_usercc", {
			user_name	: String,
	        user_pwd 	: String,
	        user_mobile	: String,
	        user_email  : String,
	        manaId		: String,
	        createTime	: Date,
	        updateTime	: Date,
	        open_flag	: String
		}, {
			methods: {
				fullName: function () {
					return this.user_name + ' ' + this.user_pwd;
				}
			}
		});
		// add the table to the database
	    db.mnSync(function(err) { 
	        if (err) throw err;
	
	        Person.mnCreate({ id: 1, user_name: "John", user_pwd: "Doe", user_mobile: 27 }).then(function (people) {
				// SQL: "SELECT * FROM person WHERE surname = 'Doe'"
		
				console.log("create!!");
				return Person.mnAll({ user_pwd: "Doe" })
				.then(function (people) {
					// SQL: "SELECT * FROM person WHERE surname = 'Doe'"
			
					console.log("People found: %d", people.length);
		            console.log("First person: %s, age %d", people[0].fullName(), people[0].user_mobile);
		
					people[0].age = 16;
					return people[0].mnSave()
					.fail(function (err) {
						console.log(err.stack);
					});
				});
			});
			
			
	    });
		
		
	})
	.catch(function(err) {
		console.error('Connection error: ' + err);
	});
});
// get请求
router.get('/index', function (req, res, next) {
    orm.connect(dbInfo, function (err, db) {
	  if (err) throw err;
	
	    var Person = db.define("person", {
	        name      : String,
	        surname   : String,
	        age       : Number, // FLOAT
	        male      : Boolean,
	        continent : [ "Europe", "America", "Asia", "Africa", "Australia", "Antartica" ], // ENUM type
	        photo     : Buffer, // BLOB/BINARY
	        data      : Object // JSON encoded
	    }, {
	        methods: {
	            fullName: function () {
	                return this.name + ' ' + this.surname;
	            }
	        },
	        validations: {
	            age: orm.enforce.ranges.number(18, undefined, "under-age")
	        }
	    });
	
	    // add the table to the database
	    db.sync(function(err) { 
	        if (err) throw err;
	
	        // add a row to the person table
	        Person.create({ id: 1, name: "John", surname: "Doe", age: 27 }, function(err) {
	            if (err) throw err;
	
	                // query the person table by surname
	                Person.find({ surname: "Doe" }, function (err, people) {
	                    // SQL: "SELECT * FROM person WHERE surname = 'Doe'"
	                    if (err) throw err;
	
	                    console.log("People found: %d", people.length);
	                    console.log("First person: %s, age %d", people[0].fullName(), people[0].age);
	
	                    people[0].age = 16;
	                    people[0].save(function (err) {
	                        // err.msg = "under-age";
	                });
	            });
	
	        });
	    });
	});
});
// get请求
router.get('/ma', function (req, res, next) {
    orm.connect(dbInfo, function (err, db) {
  if (err) throw err;

    var mnUser = db.define("mn_user", userModel.attr, userModel.func);

    // add the table to the database
    db.sync(function(err) { 
        if (err) throw err;

        // add a row to the person table
        mnUser.create({ id: 1, user_name: "John", user_pwd: "Doe", user_mobile: 27 }, function(err) {
            if (err) throw err;

                // query the person table by surname
                mnUser.find({ user_pwd: "Doe" }, function (err, data) {
                    // SQL: "SELECT * FROM person WHERE surname = 'Doe'"
                    if (err) throw err;

                    console.log("People found: %d", data.length);
                    console.log("First person: %s, age %d", data[0].fullName(), data[0].user_mobile);

                    data[0].age = 16;
                    data[0].save(function (err) {
                        // err.msg = "under-age";
                });
            });

        });
    });
});
});

module.exports = router;
