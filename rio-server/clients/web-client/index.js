var Router = require('express').Router;
var messageAPI = require('./slack-api');
var textAPI = require('./text-api');
var gifAPI = require('./gif-api');
var videoAPI = require('./video-api');

module.exports = function () {
    var api = Router();

    api.use('/slack', messageAPI());
    api.get('/', function (req, res) {
        res.send('Her name is rio and she dances on the sand')
    });
    api.use('/text', textAPI());
    api.use('/gif', gifAPI());
    api.use('/video', videoAPI());

    return api;
};
