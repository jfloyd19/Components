var express = require('express');
var router = express.Router();
var db = require('../pgp.js');
const url = require('url');


router.post('/saveToDb', function(req, res, err) {
  console.log("called saveToDb");
var query = `INSERT INTO photo VALUES (DEFAULT, '${req.body.user_id}',  '${req.body.url}', '${req.body.filter_s}', '${req.body.Private}');`;
db.any(query)
  .then(function () {
    console.log("DB Updated successfully");

  })
  .catch(function (err) {
    console.log(err);
  })
});

module.exports = router;
