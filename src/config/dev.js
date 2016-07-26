'use strict';
import baseConfig from './base';
let config = {
  appName: '牡丹园',
  appEnv: 'dev',  // feel free to remove the appEnv property here
  apiHost: 'http://a-zc-wp.php',
  imgHost: 'http://localhost:8000',
  redis: {
    host: 'localhost',//'redis',
    port: 6379,
    db: 2
  },
  socketHost: 'localhost:8080',//'node-socket.dev'
  countDown: 20,//获取手机验证码倒计时 秒
  goods: ['白银', '原油'],//产品种类
  goodsItem: {
    '白银': [{
      name: '白银',
      size: 100,
      unit: 'g',
      price: 100,
      change: 5
    }, {
      name: '白银',
      size: 1000,
      unit: 'g',
      price: 1000,
      change: 50
    }, {
      name: '白银',
      size: 2000,
      unit: 'g',
      price: 2000,
      change: 100
    },],
    '原油':[{
      name: '原油',
      size: 100,
      unit: 'g',
      price: 100,
      change: 5
    }, {
      name: '原油',
      size: 1000,
      unit: 'g',
      price: 1000,
      change: 50
    }, {
      name: '原油',
      size: 2000,
      unit: 'g',
      price: 2000,
      change: 100
    },],
  },
  stocks: {//股票信息初始化
    '白银': {
      symbol: "白银", open: 0, close: 0, high: 0, low: 0, change: 0
    },
    '原油': {
      symbol: "白银", open: 0, close: 0, high: 0, low: 0, change: 0
    }
  }
};

export default Object.freeze(Object.assign({}, baseConfig, config));
