const jwt = require("jwt-simple");
const connectionString = 'jdbc:postgresql://gtapocdbb.c7o752b846hb.us-east-1.rds.amazonaws.com:5432/gtapocdbb'
const bcrypt = require('bcrypt');
const saltRounds = 10;
const client = require('../configs/db.js');
const secret = require('../configs/secret.js');

function tokenForUser(userId) {
  const timestamp = new Date().getTime();
  //as a convention jwt has a sub(subject) property, iat = issue at time
  return jwt.encode({ sub: userId, iat: timestamp }, secret.secret);
}

exports.signup = function(req, res) {
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var dob = req.body.dob;
  var university_id = req.body.university_id;
  var email = req.body.email; //university email
  var password = req.body.password;

  var universityEmails = {
    '@ucdavis.edu': 1,
    '@berkeley.edu': 2,
  };

  client.connect();

  if(!firstname || !lastname || !dob || !university_id || !email || !password) {
    return res.status(422).send({ error: 'You did not provide all the fields required'});
  }

  bcrypt.hash(password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    client.query("SELECT FROM users WHERE email = $1", [email])
      .then(function(data) {
        if (data.rowCount == 0) {
          client.query("INSERT INTO users(firstname, lastname, dob, universityid, email, password) VALUES($1, $2, $3, $4, $5, $6) RETURNING id",
          [firstname, lastname, dob, university_id, email, hash])
          .then((data2) => {
            console.log('data2: ', data2.rows[0].id); //This is the user's id
            res.send({ token: tokenForUser(data2.rows[0].id )});
          });
        } else {
          res.send("EMAIL ALREADY EXISTS");
        }
      });
  });
};


exports.signin = function(req, res) {

};
