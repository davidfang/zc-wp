'use strict';
import baseConfig from './base';
let config = {
  appName: '牡丹园',
  appEnv: 'dev',  // feel free to remove the appEnv property here
  apiHost: 'http://a-zc-wp.php',
  imgHost: 'http://localhost:8000',
  socketHost: 'localhost:8080',//'node-socket.dev'
  countDown: 20,//获取手机验证码倒计时 秒
  goodsNames: {'sliver':'白银', 'crude':'原油'},//股票中英文对照
  goodsPriceCoefficient:100,//产品价格调整系数  即产品牌价基点
  goodsItem: {//产品种类
    1: {
      symbol: 'sliver',
      name: '白银',
      size: 100,
      unit: 'g',
      price: 100,
      change: 5
    },
    2: {
      symbol: 'sliver',
      name: '白银',
      size: 1000,
      unit: 'g',
      price: 1000,
      change: 50
    },
    3: {
      symbol: 'sliver',
      name: '白银',
      size: 2000,
      unit: 'g',
      price: 2000,
      change: 100
    },
    4: {
      symbol: 'crude',
      name: '原油',
      size: 100,
      unit: 'g',
      price: 100,
      change: 5
    },
    5: {
      symbol: 'crude',
      name: '原油',
      size: 1000,
      unit: 'g',
      price: 1000,
      change: 50
    },
    6: {
      symbol: 'crude',
      name: '原油',
      size: 2000,
      unit: 'g',
      price: 2000,
      change: 100
    },
  }
};

export default Object.freeze(Object.assign({}, baseConfig, config));
