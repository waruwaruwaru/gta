const Authentication = require('./controllers/authentication');
const Rides = require('./controllers/rides');

module.exports = function(app) {
  app.post('/signup', Authentication.signup);
  app.post('/signin', Authentication.signin);
  app.get('/rides/:id', Rides);
};
