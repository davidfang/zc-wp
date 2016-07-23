/**
 * Created by david_fang on 2016/6/10.
 */
var config = require('config').default;
//var socket = require('socket.io-client')('http://localhost:8080');
//var socket = require('socket.io-client')('http://node-socket.dev');
var socket = require('socket.io-client')(config.socketHost);


var feed = {
  onChange: function (callback) {
    socket.on('stock', callback);
  },
  watch: function (symbols) {
    socket.emit('join', symbols);
  },
  unwatch: function (symbol) {
    socket.emit('leave', symbol);
  }
}
export default feed ;
