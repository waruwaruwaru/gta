const passport = require('passport');
const secret = require('../configs/secret.js');
const JwtStrategy = require('passport').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

//Setup options for JWT Strategy
const jwtOptions = {};

//Create JWT Strategy
//payload is the decode jwt token
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  //See if the user ID in the payload exists in our database
  //If it does, call done with user
  //Otherwise call done without a user object
});

//Tell passport to use this strategy
