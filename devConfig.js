'use strict';
var config = {
  appEnv: 'dev',  // feel free to remove the appEnv property here
  apiHost: 'http://api.dev',
  redis: {
    host: 'localhost',//'redis',
    port: 6379,
    db: 2
  },
  socketHost: 'localhost',//node-socket.dev
  socketPort: 8080
}
module.exports = config;
