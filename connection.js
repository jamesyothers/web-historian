// acquire the mysql module for creating a connection to your database
var mysql = require('mysql');

exports.connection = connection = mysql.createConnection({
  host: '127.0.0.1',
  // root is the default username
  user: 'root',
  // the 'WEBHIST' database is created in the schema.sql file
  database: 'WEBHIST'
});

// connect to the database
// would call this function from basic-server.js
exports.connect = function(callback){
  connection.connect(function(err) {
    if(err) {
      console.error('error in sql connection: ', err.stack);
      return;
    }
    console.log('connected as id: ', connection.threadId);
    callback();
  });
};


