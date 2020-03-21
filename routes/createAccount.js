var express = require('express');
var router = express.Router();
var path = require('path');

console.log("here");

router.post('/', function(req, res, next) {
    console.log(req.body);
    res.render('registerSuccess');
  });
  
module.exports = router;