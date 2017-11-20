
const connectionString = 'jdbc:postgresql://gtapocdbb.c7o752b846hb.us-east-1.rds.amazonaws.com:5432/gtapocdbb'
const bcrypt = require('bcrypt');
const saltRounds = 10;
const client = require('../config.js');

exports.signup = function(req, res) {
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var dob = req.body.dob;
  var university_id = req.body.university_id;
  var email = req.body.email; //university email
  var password = req.body.password;

  client.connect();

  if(!firstname || !lastname || !dob || !university_id || !email || !password) {
    return res.status(422).send({ error: 'You did not provide all the fields required'});
  }

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
