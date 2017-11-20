const connectionString = 'jdbc:postgresql://gtapocdbb.c7o752b846hb.us-east-1.rds.amazonaws.com:5432/gtapocdbb'
const client = require('../config.js');

module.exports = function(req, res) {
  client.connect();
  client.query("SELECT FROM rides")
}
