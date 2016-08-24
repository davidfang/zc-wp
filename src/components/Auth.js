var config = require('config').default;
require('es6-promise').polyfill();
require('isomorphic-fetch');
/**
 * 判断登录
 * @param nextState
 * @param replaceState
 * @returns {boolean}
 */
function hasLogin(nextState, replace) {
  if (sessionStorage.getItem('login') == 'y') {
    return true;
  } else {
    if (localStorage.getItem('access-token') !== null) {
      // fetch(config.apiHost + '/v1/user/get-mobile-verification?');
      var apiCall = apiGet('/v1/user/login', {});
      return apiCall.then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json);
        if (json.status) {//access_token登录成功
          sessionStorage.setItem('login','y');
          return true;
        } else {//access_token登录失败
          sessionStorage.setItem('login','n');
          localStorage.removeItem('access-token');
          replace('/user/SignIn' );
        }
      });
    } else {//去登录
      if(localStorage.getItem('registed') == 'y'){
        replace('/user/SignIn' );
        //replaceState({nextPathname: nextState.location.pathname}, '/user/SignIn' );
      }else{
        replace('/user/SignUp' );
        //replaceState({nextPathname: nextState.location.pathname}, '/user/SignUp' );
      }
    }
  }
}
/**
 * 没登录
 * @param nextState
 * @param replace
 * @returns {*}
 */
function noLogin(nextState, replace) {
  if (sessionStorage.getItem('login') == 'y') {
    replace('/ucenter' );
  } else {
    if (localStorage.getItem('access-token') !== null) {
          sessionStorage.setItem('login','n');
          localStorage.removeItem('access-token');
    }
  }
}
/**
 * 需要权限处理
 * @param nextState
 * @param replaceState
 */
function requireAuth(nextState, replace) {
  let check = hasLogin();
  console.log('check----',check);
  if (sessionStorage.getItem('login') !== 'y') {
    if(localStorage.getItem('registed') == 'y'){
      replace('/user/SignIn' );
      //replaceState({nextPathname: nextState.location.pathname}, '/user/SignIn' );
    }else{
      replace('/user/SignUp' );
      //replaceState({nextPathname: nextState.location.pathname}, '/user/SignUp' );
    }
  }
}
/**
 * 不需要权限的页面验证
 * @param nextState
 * @param replaceState
 */
function noAuth(nextState, replace) {
  hasLogin();
  if (sessionStorage.getItem('login') == 'y') {
    //replaceState({nextPathname: nextState.location.pathname}, '/ucenter');
    //replace({pathname:'/ucenter',query:{nextPathname: nextState.location.pathname}} );
    replace('/ucenter' );
  }
}

/**
 * apiGet方法
 * @param url
 * @param params
 * @returns {*}
 */
function apiGet(url, params) {
  var u = new URLSearchParams();
  //u.append('method', 'flickr.interestingness.getList');
  //u.append('api_key', '<insert api key here>');
  u.append('access_token', localStorage.getItem('access-token'));
  u.append('format', 'json');
  u.append('nojsoncallback', '1');

  for (let key of Object.keys(params)) {
    u.append(key, params[key]);
  }
  return fetch(config.apiHost + url + '?' + u);
}
/**
 * POST请求API
 * @param url
 * @param params
 * @returns {*}
 */
function apiPost(url, params) {

  return fetch(config.apiHost + url+'?access_token='+localStorage.getItem('access-token'),{
    method: 'POST',
    body: params
  });
}
//加法
Number.prototype.add = function(arg){
  var r1,r2,m;
  try{r1=this.toString().split(".")[1].length}catch(e){r1=0}
  try{r2=arg.toString().split(".")[1].length}catch(e){r2=0}
  m=Math.pow(10,Math.max(r1,r2))
  return (this*m+arg*m)/m
}
//减法
Number.prototype.sub = function (arg){
  return this.add(-arg);
}

//乘法
Number.prototype.mul = function (arg)
{
  var m=0,s1=this.toString(),s2=arg.toString();
  try{m+=s1.split(".")[1].length}catch(e){}
  try{m+=s2.split(".")[1].length}catch(e){}
  return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}

//除法
Number.prototype.div = function (arg){
  var t1=0,t2=0,r1,r2;
  try{t1=this.toString().split(".")[1].length}catch(e){}
  try{t2=arg.toString().split(".")[1].length}catch(e){}
  /*with(Math){
    r1=Number(this.toString().replace(".",""))
    r2=Number(arg.toString().replace(".",""))
    return (r1/r2)*pow(10,t2-t1);
  }*/
    r1=Number(this.toString().replace(".",""))
    r2=Number(arg.toString().replace(".",""))
    return (r1/r2)*Math.pow(10,t2-t1);

}
/**
 * 获取产品配置信息
 * @returns {Promise.<TResult>}
 */
function goodsItems() {
  if (localStorage.getItem('goodsItems') == null) {//没有产品信息时
    var apiCall = apiGet('/v1/transaction/get-goods-items', {});

    return apiCall.then(function (response) {
      return response.json();
    }).then(function (json) {
      console.log(json);
      if (json.status) {
        console.log('成功');
        localStorage.setItem('goodsItems', JSON.stringify(json.data.goods_items));
        return json.data.goods_items;
      } else {
        console.log('get goodsItem失败');
        return config.goodsItem;
      }
    });

  } else {
    return JSON.parse(localStorage.getItem('goodsItems'));
  }
}
/**
 *  将时间戳转换成日期格式
 *  注意：如果是uinx时间戳记得乘于1000。比如php函数time()获得的时间戳就要乘于1000

 * @param time
 */
function timeToDate(time) {
  let date = new Date(time);
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  let D = date.getDate() + ' ';
  let h = date.getHours() + ':';
  let m = date.getMinutes() + ':';
  let s = date.getSeconds();
  //console.log(Y+M+D+h+m+s); //呀麻碟
// 输出结果：2014-04-23 18:55:49
  return (Y+M+D+h+m+s);
}
exports.hasLogin = hasLogin;
exports.noLogin = noLogin;
exports.requireAuth = requireAuth;
exports.noAuth = noAuth;
exports.apiGet = apiGet;
exports.apiPost = apiPost;
exports.Number = Number;
exports.goodsItems = goodsItems;
exports.timeToDate = timeToDate;

