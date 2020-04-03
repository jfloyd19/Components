var express = require('express');
var router = express.Router();
var db = require('../pgp.js');

router.get('/', function(req, res, next) {
    var query = 'select * from photo;';
	  db.any(query)
        .then(function (p) {
          console.log(p);
            res.render('gallery',{
            my_title: "Gallery",
            photo_data: p
			})
        })
        .catch(function (err) {
            // display error message in case an error
            request.flash('error', err);
            console.log(err);
        })
});

module.exports = router;
