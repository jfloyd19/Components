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
    var shamData = [ { photo_id: 16,
      user_id: 1,
      filename: '1.jpg',
      private: false,
      date_created: '2020-03-17T20:12:24.996Z' },
    { photo_id: 17,
      user_id: 1,
      filename: '2.jpg',
      private: false,
      date_created: '2020-03-17T20:12:24.997Z' },
    { photo_id: 18,
      user_id: 1,
      filename: '3.jpg',
      private: false,
      date_created: '2020-03-17T20:12:24.999Z' },
    { photo_id: 19,
      user_id: 1,
      filename: '4.jpg',
      private: false,
      date_created: '2020-03-17T20:12:25.000Z' },
    { photo_id: 20,
      user_id: 1,
      filename: '5.jpg',
      private: false,
      date_created: '2020-03-17T20:12:25.000Z' },
    { photo_id: 21,
      user_id: 1,
      filename: '6.jpg',
      private: false,
      date_created: '2020-03-17T20:12:25.001Z' },
    { photo_id: 22,
      user_id: 1,
      filename: '7.jpg',
      private: false,
      date_created: '2020-03-17T20:12:25.002Z' },
    { photo_id: 23,
      user_id: 1,
      filename: '8.jpg',
      private: false,
      date_created: '2020-03-17T20:12:25.002Z' },
    { photo_id: 24,
      user_id: 1,
      filename: '9.jpg',
      private: false,
      date_created: '2020-03-17T20:12:25.003Z' },
    { photo_id: 25,
      user_id: 1,
      filename: '10.jpg',
      private: false,
      date_created: '2020-03-17T20:12:25.004Z' },
    { photo_id: 26,
      user_id: 1,
      filename: '11.jpg',
      private: false,
      date_created: '2020-03-17T20:12:25.005Z' },
    { photo_id: 27,
      user_id: 1,
      filename: '12.jpg',
      private: false,
      date_created: '2020-03-17T20:12:25.006Z' },
    { photo_id: 28,
      user_id: 1,
      filename: '13.jpg',
      private: false,
      date_created: '2020-03-17T20:12:25.007Z' },
    { photo_id: 29,
      user_id: 1,
      filename: '14.jpg',
      private: false,
      date_created: '2020-03-17T20:12:25.007Z' },
    { photo_id: 30,
      user_id: 1,
      filename: '15.jpg',
      private: false,
      date_created: '2020-03-17T20:12:25.008Z' } ];
    res.render('gallery', {
      title: 'Gallery',
      photo_data: shamData
    });
  }
});

module.exports = router;
