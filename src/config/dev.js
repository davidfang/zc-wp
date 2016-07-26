'use strict';
import baseConfig from './base';
let config = {
  appName:'牡丹园',
  appEnv: 'dev',  // feel free to remove the appEnv property here
  apiHost: 'http://a-zc-wp.php',
  imgHost: 'http://localhost:8000',
  redis: {
    host: 'localhost',//'redis',
    port: 6379,
    db: 2
  },
  socketHost:'localhost:8080',//'node-socket.dev'
  countDown:20 //获取手机验证码倒计时
};

export default Object.freeze(Object.assign({}, baseConfig, config));
