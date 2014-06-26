var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths  = paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = readListOfUrls = function(callback){
  fs.readFile(paths.list,'utf8', function(err, data) {
    if (err) {
      console.log('error on reading sites.txt: ', err);
    }
    //console.log('read data ', data);
    callback(data.split('\n'));
  });
};

exports.isUrlInList = isUrlInList = function(url,callback){
  readListOfUrls(function(list){
    // console.log(list.indexOf(url));
    console.log('list: ',list);
    console.log('url: ',url);
    callback(list.indexOf(url) !== -1);
  });
};

exports.addUrlToList = addUrlToList = function(url,callback){
  isUrlInList(url, function(urlExists) {
    if(!urlExists){
      fs.appendFile(paths.list, url + "\n", function(err){
        if(err) throw err;
        console.log('Error when adding to the list');
      });
      callback(true);
    }else{
      callback(false);
    }
  });
};

exports.isURLArchived = isURLArchived = function(url, callback){
  fs.readdir('../archives/sites', function(err,files) {
    if (err) {
      console.log('error in isURLArchived: ', err);
    }
    callback(files.indexOf(url) !== -1);
  });

};

exports.downloadUrls = function(){
  fs.readdir('../archives/sites', function(err,archivedFiles) {
    if (err) {
      console.log('error in downloadUrls: ', err);
    } else {
      readListOfUrls(function(siteFiles){
        siteFiles.pop();
        console.log('site files, line76: ', siteFiles);
        if (siteFiles.length !== archivedFiles.length) {
          for (var i=0; i < siteFiles.length; i++) {
            if (archivedFiles.indexOf(siteFiles[i]) === -1) {
              var siteFile = fs.createWriteStream('../archives/sites/'+siteFiles[i]);
              console.log('siteFile: ', siteFile);
              console.log('siteFiles: ', siteFiles);
              request('http://' + siteFiles[i]).pipe(siteFile);
            }
          }
        }
      });
    }
  });
};
