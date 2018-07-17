var express = require('express');
var router = express.Router();
let db = require('../lib/database.lib.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond at api');
});
/* GET users listing. */
router.get('/show', function(req, res, next) {
    let sqlString = 'select * from user';
    let connection = db.connection();
    db.query(connection, sqlString,'',function(id){
        console.log('inserted id is:' + id);
        res.send('respond for show :'+JSON.stringify(id));
    });
    db.close(connection);
    return;
});

module.exports = router;
