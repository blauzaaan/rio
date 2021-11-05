var express = require('express');
var router = express.Router();

const dbo = require("../db/conn");
var ObjectId = require('mongodb').ObjectId;

/* POST mark item as approved. */
router.post('/approve', function(req, res, next) {
  const dbConnect = dbo.getDb();
  dbConnect.collection("inputqueue").updateOne(
    {_id: ObjectId(req.body.id)},
    {$set: {
      status: 'approved',
      updatetime: Date.now()
    }},
    function(err, _result){
      if(err){
        res.status(500).send('Error updating item '+req.body.id);
      }
      else{
        console.log("approved "+req.body.id+"✔");
        res.send('approved ✔');
      }
    }
  );
});

/* POST mark item as rejected. */
router.post('/reject', function(req, res, next) {
  const dbConnect = dbo.getDb();
  dbConnect.collection("inputqueue").updateOne(
    {_id: ObjectId(req.body.id)},
    {$set: {
      status: 'rejected',
      updatetime: Date.now()
    }},
    function(err, _result){
      if(err){
        res.status(500).send('Error updating item '+req.body.id);
      }
      else{
        console.log("rejected "+req.body.id+"✔");
        res.send('rejected ❌');
      }
    }
  );
});
module.exports = router;
