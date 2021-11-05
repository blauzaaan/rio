const request = require('request').defaults({ encoding: null });
const _ = require('lodash');
const config = require('../config');
const gifworker = require('./gif-worker');


module.exports = (url, done) => {
  // Download the GIF
  request.get(url, (error, response, body) => {
    if (response.statusCode == 200) {
      gifworker(new GIF(Buffer.from(body)), (result) => done(result));
    } else {
      // Send back an error
      done({ err: 'Failed to download GIF' });
    }
  });
};