/**
 * Created by david_fang on 2016/6/10.
 */
var socket = require('socket.io-client')('http://localhost:8080');

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
