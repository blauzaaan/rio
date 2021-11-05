var express = require('express');
var multer = require('multer');
var router = express.Router();

const dbo = require("../db/conn");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: {fileSize: 10000000} });

/* POST file upload. */
router.post('/', upload.single('bild'), function(req, res, next) {
  const dbConnect = dbo.getDb();
  dbConnect.collection("inputqueue").insertOne({
    file: req.file.buffer, 
    filename: req.file.originalname, 
    comment: req.comment,
    submittime: Date.now()
  });
  res.send('ok, danke! ❤🤗');
});

module.exports = router;
