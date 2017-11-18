const { Client } = require('pg');
const connectionString = 'jdbc:postgresql://gtapocdbb.c7o752b846hb.us-east-1.rds.amazonaws.com:5432/gtapocdbb'
const bcrypt = require('bcrypt');
const saltRounds = 10;


exports.signup = function(req, res) {
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var dob = req.body.dob;
  var university_id = req.body.university_id;
  var email = req.body.email; //university email
  var password = req.body.password;

  var client = new Client({
    user: 'six',
    host: 'gtapocdbb.c7o752b846hb.us-east-1.rds.amazonaws.com',
    database: 'gtapocdbb',
    password: 'gtapocdb',
    port: 5432,
  })
  client.connect();
  bcrypt.hash(password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    client.query("SELECT FROM users WHERE email = $1", [email])
      .then(function(data) {
        if (data.rowCount == 0) {
          client.query("INSERT INTO users(firstname, lastname, dob, universityid, email, password) VALUES($1, $2, $3, $4, $5, $6)",
          [firstname, lastname, dob, university_id, email, hash])
          .then(() => { res.send("DONE")});
        } else {
          res.send("EMAIL ALREADY EXISTS");
        }
      });
  });

};


exports.signin = function(req, res) {

};
