var express = require('express');
var app = express();
var router = express.Router();
var orm = require('orm');
let dbInfo = require('../conf/database.config.js');

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

module.exports = router;
