var express = require('express');
var router = express.Router();
var db = require('../pgp.js');

router.post('/', function(req, res, next) {
    console.log(req.body);
    var query = `INSERT INTO p_user VALUES (DEFAULT, '${req.body.username}', '${req.body.password}', '${req.body.firstname}', '${req.body.lastname}', '${req.body.email}');`;
	  db.any(query)
        .then(function () {
          res.render('registerSuccess');
        })
        .catch(function (err) {
            // display error message in case an error
            request.flash('error', err);
            console.log(err);
        })


  });
  
module.exports = router;