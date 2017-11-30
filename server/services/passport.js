const passport = require('passport');
const secret = require('../configs/secret.js');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const client = require('../configs/db.js');
const bcrypt = require('bcrypt');

//Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: secret.secret
};


//Create JWT Strategy
//By default Local Strategy looks for a username and password
//This localOption tells where to look for our username, which is our email in this case.
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  //Verify this email and password, call done with the user
  //if it is the correct email and password
  //otherwise, call done with false

  client.query("SELECT * FROM users where email = $1", [email], function(err, user) {
    console.log('err', err);
    if(err) { return done(err); }

    if(!user) { return done(null, false); }
    // console.log('user', user);
    // console.log('password: ', password);
    // console.log('user.password: ', user.rows[0].password);

    bcrypt.compare(password, user.rows[0].password, function(error, res) {
      console.log('error: ', error)
      console.log('res: ', res);
      if (res) {
        return done(null, user.rows[0].id);
      }
    })


  });
});


//payload is the decode jwt token
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  //See if the user ID in the payload exists in our database

  client.query("SELECT FROM users where id = $1", [payload.sub], function(err, data) {

    if (err) { return done(err, false); }
    if (data) {
      return done(null, data);
    } else {
      return done(null, false);
    }

  });
  //If it does, call done with user
  //Otherwise call done without a user object
});
//Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
