# Picopy
Repo is organized in the default Express structure.
The vast majority of our code falls under the routes, public, and views directories.
```
├── node_modules
├── public
|   ├── All files that are served to the client
|       (javascripts, css files, site images)
├── views
|   ├── EJS files converted to html and served to the client
├── routes
|   ├── when client sends a REST request, they are directed to
|       one of these files.
| app.js
| package.json
| create_db.sql
|     used for initializing database
| insert.sql
|     used for implementing gallery functionality before Amazon S3
| pgp.js
|     database setup and auth for the app
```

# Accessing Picopy

Picopy can be accessed [here](http://picopyimages.herokuapp.com/).

If this does not work, either the Amazon S3 key has been revoked, or the Heroku Postgres key has been revoked.

To run the app locally, clone the repository and type
`npm install`
to install all the dependencies, then
`npm start`
to start the web server.

Keys for Amazon and Heroku can be entered in the `upload.js` and `pgp.js` files, respectively.

![Architecture Diagram](https://i.imgur.com/LWqYI2p.png)  
[Filter Library Used](https://github.com/arahaya/ImageFilters.js)  
[Amazon S3](https://aws.amazon.com/free/storage/?sc_channel=PS&sc_campaign=acquisition_US&sc_publisher=google&sc_medium=ACQ-P%7CPS-GO%7CBrand%7CDesktop%7CSU%7CStorage%7CS3%7CUS%7CEN%7CText&sc_content=s3_e&sc_detail=amazon%20s3&sc_category=Storage&sc_segment=293617570044&sc_matchtype=e&sc_country=US&s_kwcid=AL!4422!3!293617570044!e!!g!!amazon%20s3&ef_id=CjwKCAjw1v_0BRAkEiwALFkj5gmtOxfFzd_dSxfovDvFwgfGnNHXNAAMCzQ8AmzPD0yVC9xfEcosuRoC2kwQAvD_BwE:G:s)  
[Heroku](https://www.heroku.com/)  
[NPM Cookie Sessions](https://www.npmjs.com/package/cookie-session)  

