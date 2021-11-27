global.fetch = require('node-fetch'); // polyfil
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;
const app = express();

//Setup web server
app.server = http.createServer(app);
app.server.listen(PORT);

const api = require('./clients/web-client');
var colors = require('colors');


const slackClient = require('./clients/slack-client');
const wsClient = require('./clients/websocket-client');
const twitterClient = require('./clients/twitter-client');

const getGIFData = require('./inputs/gif-url-input');
const getTextData = require('./inputs/text-input');
const getVideoData = require('./inputs/video-url-input');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json({limit: '50mb'}));

app.use('/', api());

// Start clients
twitterClient.init();
slackClient.init();
wsClient.init(app);

// Startup content
const startup = () => {
    //const getImageData = require('./inputs/image-url-input');

    // giphy links are broken, just for reference
    // getGIFData('https://media.giphy.com/media/xUA7b3zUuoScFWe3bW/giphy.gif'); // rio
    // getGIFData('https://media.giphy.com/media/l3vRjnRH14rBOlUqY/source.gif'); // 50fps 50x30 RGB rect
    // getGIFData('http://i.giphy.com/3oz8xEMwRxFQV21ntC.gif'); // 5s 6x5 stripey GIF
    // getGIFData('http://i.giphy.com/l0MYE0GTUJFY5PWcU.gif'); // 30x1 5s 2 frame GIF
    // getGIFData('http://i.giphy.com/3oz8xwDZ6N4vt2D6so.gif'); // 5s 12x10 stripey GIF
    //
    // getVideoData('https://www.youtube.com/watch?v=wS8ZC271eMQ');

    //current, working examples
    //getVideoData('https://www.youtube.com/watch?v=MLFWLJSPN7I');
    //getGIFData('https://64.media.tumblr.com/fc031ba2e1d62b29056e925dcaeb3e2b/tumblr_ngqeny4hUE1rpj04no1_500.gif');
    //getTextData('Heya, welcome to RIO! Come in and enjoy the show!');
}

// todo: This should be improved
// With RPi output enabled, wait for python script to connect to node before rendering startup.
const config = require('./config');
if (config.sendToPi) {
    const piOutput = require('./outputs/pi-output.js');
    var timer = setInterval(() => {
        if (piOutput.connected()) {
            clearInterval(timer);
            startup();
        }
    }, 500);
} else {
    startup();
}

module.exports = app;

// from: https://hackernoon.com/graceful-shutdown-in-nodejs-2f8f59d1c357
process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    getTextData(' '); //crudely clearing display by sending a space character as text
    process.exit(0);
  });
//on windows (doesn't prevent "Terminate batch job (Y/N)" prompt) - https://stackoverflow.com/a/47314406
process.on('SIGINT', () => {
    console.info('CTRL_BREAK_EVENT (SIGINT) signal received.');
    getTextData(' '); //crudely clearing display by sending a space character as text
    process.exit(0);
  });
