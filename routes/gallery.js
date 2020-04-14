var express = require('express');
var router = express.Router();
var db = require('../pgp.js');

router.get('/', function(req, res, next) {
    var query = 'select * from photo;';
    var query2 = 'select count(*) from photo;';
	  db.task('get-everything', task => {
        return task.batch([
          task.any(query),
          task.any(query2)
            ]);
        })
        .then(function (p) {
            res.render('gallery',{
            my_title: "Gallery",
            photo_data: p[0],
            photo_count: p[1],
            //This will be null if no one is logged in!
            user: req.session.user
			})
        })
        .catch(function (err) {
            // display error message in case an error
            request.flash('error', err);
            console.log(err);
        })
});

module.exports = router;
