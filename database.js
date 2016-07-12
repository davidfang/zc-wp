var redis = require('redis');
//var config = require('./src/config').default;
var config = require('./devConfig');
console.log(config);
//import config from './src/config/dev';
function Database() {
  var self = this;

  //self._redis_host = 'localhost';
  self._redis_host = config.redis.host;
  self._redis_port = config.redis.port;
  self._redis_db = config.redis.db;

  self._redis = null;
  self._redis_selected = false;
}

Database.prototype.redis = function(callback) {
  var self = this;

  if (self._redis && self._redis_selected) {
    return callback(null, self._redis);
  }

  if (! self._redis) {
    self._redis = redis.createClient(self._redis_port, self._redis_host);
  }

  self._redis.select(self._redis_db, function (err) {
    if (err) {
      return callback(err);
    }

    self._redis_selected = true;

    return callback(null, self._redis);
  });
};


module.exports = new Database();
