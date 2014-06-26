var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var httpHelp = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if(req.method === 'GET'){
    console.log(req.url);
    if (req.url === '/') {
      httpHelp.serveAssets(res,'./public/index.html', 'text/html');
    } else if(req.url === '/styles.css'){
      httpHelp.serveAssets(res,'./public/styles.css', 'text/css');
    } else if(req.url === '/loading.html'){
      httpHelp.serveAssets(res,'./public/loading.html', 'text/html');
    } else {
      httpHelp.serveAssets(res,'../archives/sites'+req.url, 'text/html');
    }
  } else if (req.method === 'POST') {
    // console.log(req.url);
    var data = '';

    req.on('data', function(chunk){
      data += chunk;
    });

    req.on('end', function(){
      console.log('data: ',data);
      httpHelp.addUrl(res,data);
    });
  }
  // res.end(archive.paths.list);
};
