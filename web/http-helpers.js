var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
// these are the default headers sent with all responses
exports.headers = headers = {
  // this allows all users to access our server
  "access-control-allow-origin": "*",
  // this will tell the user what methods are allowed
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  // the default type of content sent in our response may need adjustment
  'Content-Type': "text/html"
};

// function to serve up all assets to the page
exports.serveAssets = serveAssets = function(res, asset, type) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  var statusCode = 200;
  // path.resolve will concatonate and normalize our path
  var filePath = path.resolve(__dirname, asset);
  // third parameter will set/override the default content-type
  headers['Content-Type'] = type;
  // read the file specified by 'asset' parameter
  fs.readFile(filePath,'utf8', function (err, file) {
    if (err) {
      // on error return statusCode 404
      res.writeHead(404, headers);
      // return statusCode and headers to user
    } else {
      res.writeHead(statusCode, headers);
    }
    // on completion of 'read', end the response and serve up the file read
    res.end(file);
  });
};

// handles logic for 'POST' requests or entered URLs
exports.addUrl = function(res, sitePath) {
  // the sitePath be what comes after the '='
  // ex: localhost:8080/=www.google.com
  var sitePath = sitePath.split('=')[1];
  // add url to sites.txt file
  archive.addUrlToList(sitePath, function(wasAdded){
    // wasAdded is boolean, this will be the final callback in our chain
    if(wasAdded){
      var statusCode = 302;
      // change the url bar when the
      res.setHeader('Location', 'http://127.0.0.1:8080/loading.html');
      res.writeHead(statusCode, headers);
      // end the response
      res.end();
    } else {
      // if file was not added to the sites.txt file
      // check if the url has its own file with html contents
      archive.isURLArchived(sitePath, function(isArchived) {
        if (isArchived) {
          // if it is archived, serve up this file
          serveAssets(res,'../archives/sites/' + sitePath, 'text/html');
        }
        } else {
          // if it is not archived, serve up the loading html
          serveAssets(res,'./public/loading.html', 'text/html');
          // download the url html contents to its own file
          archive.downloadUrls();
        }
      });
    }
  });
};

