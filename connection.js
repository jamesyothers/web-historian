var mysql = require('mysql');

exports.connection = connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  database: 'WEBHIST'
});
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


