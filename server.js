/*eslint no-console:0 */
'use strict';
require('core-js/fn/object/assign');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const open = require('open');


//var express = require('express'),
//  app = express(),
//  path = require('path'),
//  http = require('http').Server(app),
 var io = require('socket.io')(8080),
  feed = require('./feed');

//app.use(express.static(path.join(__dirname, './src')));

io.on('connection', function (socket) {
  console.log('用户连接成功 Socket id %s', socket.id);
  socket.on('join', function (rooms) {
    console.log('Socket %s 用户加入 to %s', socket.id, rooms);
    if (Array.isArray(rooms)) {
      rooms.forEach(function(room) {
        socket.join(room);
      });
    } else {
      socket.join(rooms);
    }
  });

  socket.on('leave', function (rooms) {
    console.log('Socket %s 用户离开 from %s', socket.id, rooms);
    if (Array.isArray(rooms)) {
      rooms.forEach(function(room) {
        socket.leave(room);
      });
    } else {
      socket.leave(rooms);
    }
  });

  socket.on('disconnect', function () {
    //console.log('User disconnected. %s. Socket id %s', socket.id);
    console.log('用户失去连接. %s. Socket id %s', socket.id);
  });
});

feed.start(function(room, type, message) {
  io.to(room).emit(type, message);
  //console.log(room, type);
});


/*http.listen(3000, function () {
  console.log('listening on: 3000');
});*/

new WebpackDevServer(webpack(config), config.devServer)
.listen(config.port, 'localhost', (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:' + config.port);
  console.log('Opening your system browser...');
  //open('http://localhost:' + config.port + '/webpack-dev-server/');
});
