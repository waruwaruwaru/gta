var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var index = require('./routes/index');
var users = require('./routes/users');

var pg = require('pg')
var format = require('pg-format')
var PGUSER = 'yourUserName'
var PGDATABASE = 'example'
var age = 732
var config = {
  user: PGUSER, // name of the user account
  database: PGDATABASE, // name of the database
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
}
var pool = new pg.Pool(config)
var myClient
pool.connect(function (err, client, done) {
  if (err) console.log(err)
  app.listen(4000, function () {
    console.log('listening on 4000')
  })
  myClient = client
  var ageQuery = format('SELECT * from numbers WHERE age = %L', age)
  myClient.query(ageQuery, function (err, result) {
    if (err) {
      console.log(err)
    }
    console.log(result.rows[0])
  })
})

var app = express();
var port = (process.env.PORT || '4000');
var server = http.createServer(app);
server.listen(port);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.set('port', port);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
