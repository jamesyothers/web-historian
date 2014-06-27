// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.


var archive = require('../helpers/archive-helpers');
// ensure this method is defined with relative file paths to run correctly from here!
// path.join(...)
archive.downloadUrls();

// this is the crontab script that will run this file once a minute
// */1 * * * * exec /Users/student/.nvm/v0.10.26/bin/node /Users/student/Code/jamesyothers/2014-06-web-historian/workers/htmlfetcher.js
