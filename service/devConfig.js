'use strict';
var config = {
  appEnv: 'dev',  // feel free to remove the appEnv property here
  apiHost: 'http://a-zc-wp.php',
  redis: {
    host: 'localhost',//'redis',
    port: 6379,
    db: 2
  },
  socketHost: 'localhost',//node-socket.dev
  socketPort: 8080,
  stocks : [
  /*{symbol: "GM", open: 38.87},
   {symbol: "GE", open: 25.40},
   {symbol: "MCD", open: 97.05},
   {symbol: "UAL", open: 69.45},
   {symbol: "WMT", open: 83.24},
   {symbol: "AAL", open: 55.76},
   {symbol: "LLY", open: 76.12},
   {symbol: "JPM", open: 61.75},*/
  {symbol: 'sliver',name: "白银", open: 47.84},
  {symbol: 'crude',name: "原油", open: 46.50}
]
}
module.exports = config;
