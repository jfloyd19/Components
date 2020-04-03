var pgp = require('pg-promise')();
pgp.pg.defaults.ssl = true;

const dbConfig = {
  host: 'ec2-52-87-135-240.compute-1.amazonaws.com',
  port: 5432,
  database: 'd8gcf7qcep4147',
  user: 'psptzlcszcboiz',
  password: '5c58ab3f76aee3ca9fb7e70154607fdd001ebf358bf53d20b9c670fcc98150d7'
};
var db = pgp(dbConfig);

module.exports = db;