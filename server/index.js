const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const router = require('./router');

//This lets us use bodyParser to parse incoming requests into JSON.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
router(app);

//Server, getting express to talk to outside world
const port = process.env.PORT || 3000;
//This http.createServer lets you create a server that knows how to receive a request and forward it
//to express application
const server = http.createServer(app);
server.listen(port);
console.log('Server listening to:', port);
