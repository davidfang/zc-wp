'use strict';
import baseConfig from './base';
let config = {
  appEnv: 'dev',  // feel free to remove the appEnv property here
  apiHost: 'http://a-zc-wp.php',
  redis: {
    host: 'localhost',//'redis',
    port: 6379,
    db: 2
  },
  socketHost:'localhost:8080',//'node-socket.dev'
  countDown:20 //获取手机验证码倒计时
};

export default Object.freeze(Object.assign({}, baseConfig, config));
