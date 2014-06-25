var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  var statusCode = 200;
  var filePath = path.resolve(__dirname,asset);
  fs.readFile(filePath,'utf8', function (err, file) {
    if (err) {
      console.log('error at home directory: ', err);
      res.writeHead(404, headers);
    } else {
      res.writeHead(statusCode, headers);
    }
    res.end(file);
  });
};

exports.addUrl = function(res, sitePath) {
  console.log('sitePath: ',sitePath);
  if(archive.addUrlToList(sitePath.split('=')[1])){
    var statusCode = 302;
    res.writeHead(statusCode,headers);
    res.end();
  }
};

