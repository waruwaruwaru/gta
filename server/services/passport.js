const passport = require('passport');
const secret = require('../configs/secret.js');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const client = require('../configs/db.js');


//Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: secret.secret
};

client.connect();
//Create JWT Strategy
//payload is the decode jwt token
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  //See if the user ID in the payload exists in our database
  console.log('after connect');
  console.log('client: ', client);
  client.query("SELECT FROM users where id = $1", [payload.sub], function(err, data) {
    console.log('payload.sub: ', payload.sub);
    console.log('data: ', data);
    console.log('error: ', err);
    client.end(function(err) {
      if (err) console.log('err: ', err);
    });
    console.log('here')
    if (err) { return done(err, false); }
    if (data) {
      console.log('inside data');
      return done(null, data);
    } else {
      console.log('hereeeeeeeeeeeeee?');
      return done(null, false);
    }

  });
  //If it does, call done with user
  //Otherwise call done without a user object
});

//Tell passport to use this strategy
passport.use(jwtLogin);
