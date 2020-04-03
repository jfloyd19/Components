var pgp = require('pg-promise')();
pgp.pg.defaults.ssl = true;

const dbConfig = {
  host: 'ec2-34-193-232-231.compute-1.amazonaws.com',
  port: 5432,
  database: 'd79o9u7hg8n0c9',
  user: 'iycpdeaxlyiscy',
  password: '5f3ec7574b7804c02a11c81c683c67a9b052dfacd111a2cecb4f2fd525e035fa'
};
var db = pgp(dbConfig);

module.exports = db;