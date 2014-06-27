// acquire the http moduel to create server
var http = require("http");
var handler = require("./request-handler");
var connection = require("../connection");
var mysql = require('mysql');

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(handler.handleRequest);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

// connection.connect(function(){
//   this.query("INSERT INTO URLS2 VALUES ('www.google.com','safasdfasdfasdfasdf')");
// });
