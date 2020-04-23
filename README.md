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
| pgp.js
| package.json
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

