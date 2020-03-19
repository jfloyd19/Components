var express = require('express');
var router = express.Router();
var path = require('path');

//This if statement is a temporary distinction so we don't all have to immediately switch to our virtual machines
//If you are on linux, it will start the database, otherwise there will be no access to it.
if(process.platform === "linux"){
  var pgp = require('pg-promise')();

  //Make sure database is created and has a password. 
  // sudo -u postgres psql
  // \password
  const dbConfig = {
    host: 'localhost',
    port: 5432,
    database: 'picopy',
    user: 'postgres',
    password: 'password'
  };
  var db = pgp(dbConfig);
}

router.get('/', function(req, res, next) {
  if(process.platform === "linux"){
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
  }else{
    res.render('gallery', {
      title: 'Gallery'
    });
  }
});

module.exports = router;
