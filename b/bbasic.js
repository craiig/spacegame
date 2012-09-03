
var fs = require('fs')
  , express = require('express')
  , app = express()
  , http = require('http')

var world = require('./gameServer.js')

//setup the app & socketio in this weird way thanks to express
var server = http.createServer(app)
var io = require('socket.io').listen(server)

server.listen(59473);
app.use(express.static(__dirname + '/client/'));

//instantiate the world object - which includes a network channel
var MainWorld = new world(io);

