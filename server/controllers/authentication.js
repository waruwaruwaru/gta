const { Client } = require('pg');
const connectionString = 'postgresql://Waru:123@localhost:5433/gtadb';

exports.signup = function(req, res) {
  const name = req.body.name;
  const dob = req.body.dob;
  const university_id = req.body.university_id;
  const email = req.body.email; //university email
  const password = req.body.password;

  var client = new Client({
    connectionString: connectionString,
  });
  client.connect();
  client.query("SELECT FROM users WHERE university_email = $1", [email])
    .then(function(data) {
      console.log('data: ', data);
      if (data.rowCount == 0) {
        client.query("INSERT INTO users(name, dob, university_id, university_email, password) VALUES($1, $2, $3, $4, $5)",
        [name, dob, university_id, email, password])
        .then(() => { res.send("DONE")});
      } else {
        res.send("EMAIL ALREADY EXISTS");
      }
    });


};

exports.signin = function(req, res) {

};
