var Router = require('express');
var handleUrl = require('../../inputs/video-url-input');

module.exports = function () {
    var api = Router();

    api.post('/', function (req, res) {
        if (!req.body.url) {
            res.status(400);
            res.send('Send a "url" in a JSON object');
            return;
        }
        handleUrl(req.body.url);
        res.send('Sent your YouTube video URL to the wall!');
    });

    return api;
};
