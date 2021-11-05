var express = require('express');
var router = express.Router();

const dbo = require('../db/conn');

const mgrtitle = process.env.TITLE+' Manager';

/* GET pending items listing. */
router.get('/', function(req, res, next) {
  const dbConnect = dbo.getDb();
  const items = dbConnect.collection("inputqueue").find({'status':{$exists:false}}).toArray().then(itemsarr => {
    res.render('list', { title: mgrtitle+' - pending', items: itemsarr });
  });
});

/* GET approved items listing. */
router.get('/approved', function(req, res, next) {
  const dbConnect = dbo.getDb();
  const items = dbConnect.collection("inputqueue").find({'status':{$eq:'approved'}}).toArray().then(itemsarr => {
    res.render('list', { title:  mgrtitle+' - approved', items: itemsarr });
  });
});

/* GET rejected items listing. */
router.get('/rejected', function(req, res, next) {
  const dbConnect = dbo.getDb();
  const items = dbConnect.collection("inputqueue").find({'status':{$eq:'rejected'}}).toArray().then(itemsarr => {
    res.render('list', { title:  mgrtitle+' - rejected', items: itemsarr });
  });
});

module.exports = router;
