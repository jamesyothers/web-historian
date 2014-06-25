var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var httpHelp = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if(req.method === 'GET'){
    if (req.url === '/') {
      httpHelp.serveAssets(res,'./public/index.html');
    }else {
      httpHelp.serveAssets(res,'../archives/sites'+req.url);
    }
  } else if (req.method === 'POST') {
    // console.log(req.url);
    var data = '';

    req.on('data', function(chunk){
      data += chunk;
    });

    req.on('end', function(){
      httpHelp.addUrl(res,data);
    })
  }
  // res.end(archive.paths.list);
};
