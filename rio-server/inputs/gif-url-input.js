var inputWorker = require('../input-worker');
module.exports = (url) => {
    inputWorker('gif-url-worker', url)
};
