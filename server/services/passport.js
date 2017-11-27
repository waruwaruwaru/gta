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


//Create JWT Strategy
//payload is the decode jwt token
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  //See if the user ID in the payload exists in our database
  console.log('after connect');
  // console.log('client: ', client);
  // client.connect();
  client.query("SELECT FROM users where id = $1", [payload.sub], function(err, data) {
    // console.log('payload.sub: ', payload.sub);
    console.log('data: ', data);
    console.log('error: ', err);

    console.log('here')
    if (err) { return done(err, false); }
    if (data) {
      console.log('inside data');
      // client.end((err) => {
      //   console.log('client has been disconnected');
      //   if (err) {
      //     console.log('there has been error disconnecting from client: ', err);
      //   }
      // });
      return done(null, data);
    } else {
      console.log('hereeeeeeeeeeeeee?');
      // client.end();
      return done(null, false);
    }

  });
  //If it does, call done with user
  //Otherwise call done without a user object
  console.log('anyfin1');
});

console.log('anyfin2');

//Tell passport to use this strategy
passport.use(jwtLogin);
