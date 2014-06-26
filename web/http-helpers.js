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

exports.serveAssets = serveAssets = function(res, asset, type) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)

  var statusCode = 200;
  var filePath = path.resolve(__dirname,asset);
  headers['Content-Type'] = type;
  fs.readFile(filePath,'utf8', function (err, file) {
    if (err) {
      console.log('error at home directory: ', err);
      res.writeHead(404, headers);
    } else {
      res.writeHead(statusCode, headers);
    }
    console.log('response sended');
    res.end(file);
  });
};

exports.addUrl = function(res, sitePath) {
  console.log('sitePath: ',sitePath);
  var sitePath = sitePath.split('=')[1];
  archive.addUrlToList(sitePath, function(wasAdded){
    if(wasAdded){
      var statusCode = 302;
      res.setHeader('Location', 'http://127.0.0.1:8080/loading.html');
      res.writeHead(statusCode, headers);
      console.log('ended when adding');
      res.end();
    } else {
      archive.isURLArchived(sitePath, function(isArchived) {
        console.log('archived callback');
        if (isArchived) {
          serveAssets(res,'../archives/sites/' + sitePath, 'text/html');
        } else {
          serveAssets(res,'./public/loading.html', 'text/html');
          console.log('run archive.downloadUrls');
          archive.downloadUrls();
        }
      });
    }
  });
};

