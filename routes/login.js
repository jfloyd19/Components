var express = require('express');
var router = express.Router();
var db = require('../pgp.js');

router.post('/', function(req, res, next) {
    console.log(req.body);
    var query = `select * from p_user where username = '${req.body.username}' and pwd = '${req.body.password}'`;
	  db.any(query)
        .then(function (p) {
            req.session.user = p[0];
            res.render('index', {
                title: 'Picopy',
                user:req.session.user
              });
        })
        .catch(function (err) {
            // display error message in case an error
            request.flash('error', err);
            console.log(err);
            alert("Username/password combo not found. Try again.");
        })


  });
  
module.exports = router;