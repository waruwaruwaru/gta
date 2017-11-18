const { Client } = require('pg');
const connectionString = 'jdbc:postgresql://gtapocdbb.c7o752b846hb.us-east-1.rds.amazonaws.com:5432/gtapocdbb'

exports.signup = function(req, res) {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const dob = req.body.dob;
  const university_id = req.body.university_id;
  const email = req.body.email; //university email
  const password = req.body.password;

  var client = new Client({
    user: 'six',
    host: 'gtapocdbb.c7o752b846hb.us-east-1.rds.amazonaws.com',
    database: 'gtapocdbb',
    password: 'gtapocdb',
    port: 5432,
  })
  client.connect();
  client.query("SELECT FROM users WHERE email = $1", [email])
    .then(function(data) {
      console.log('data: ', data);
      if (data.rowCount == 0) {
        client.query("INSERT INTO users(firstname, lastname, dob, universityid, email, password) VALUES($1, $2, $3, $4, $5, $6)",
        [firstname, lastname, dob, university_id, email, password])
        .then(() => { res.send("DONE")});
      } else {
        res.send("EMAIL ALREADY EXISTS");
      }
    });




};

exports.signin = function(req, res) {

};
