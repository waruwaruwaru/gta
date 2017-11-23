const Authentication = require('./controllers/authentication');
const Rides = require('./controllers/rides');
const passportServices = require('./services/passport');
const passport = require('passport');

//tells passport to authenticate using jwt and session : false mean don't create a default cookie.
//not needed since we using jwt instead.
const requireAuth = passport.authenticate('jwt', { session: false });


module.exports = function(app) {
  app.post('/signup', Authentication.signup);
  app.post('/signin', Authentication.signin);
  app.get('/rides/:id', requireAuth, Rides);

  //An example of an end point the requires authentication
  app.get('/', requireAuth, function(req, res) {
    res.send("You are authenticated!!!");
  });
};
