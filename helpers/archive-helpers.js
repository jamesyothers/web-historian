var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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
    callback(data.split('\n'));
  });
};

exports.isUrlInList = isUrlInList = function(url){
  readListOfUrls(function(list){
    return list.indexOf(url) > -1;
  });
};

exports.addUrlToList = addUrlToList = function(url){
  if(!isUrlInList(url)){
    fs.appendFile(paths.list, url + "\n", function(err){
      if(err) throw err;
      console.log('Error when adding to the list');
    });
    debugger;
    return true;
  }
  return false;
};

exports.isURLArchived = function(){
};

exports.downloadUrls = function(){
};