// var app   = require('./main/app.js'),
//     port  = app.get('port'),
//     log   = 'Listening on ' + app.get('base url') + ':' + port;

var mongodb = require("mongodb");
var server = new mongodb.Server("127.0.0.1", 27017, {});

var client = new mongodb.Db('test', server);


// app.listen(port);
// console.log(log);
