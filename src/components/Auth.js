var config = require('config').default;
/**
 * 判断登录
 * @returns {boolean}
 */
function hasLogin() {
  if (sessionStorage.getItem('login') == 'y') {
    return true;
  } else {
    if (localStorage.getItem('access-token') !== null) {
      // fetch(config.apiHost + '/v1/user/get-mobile-verification?');
      var apiCall = apiGet('/v1/user/login', {'access-token': localStorage.getItem('access-token')});
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
          return false;
        }
      });
    } else {
      return false;
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
  u.append('api_key', '<insert api key here>');
  u.append('format', 'json');
  u.append('nojsoncallback', '1');

  for (let key of Object.keys(params)) {
    u.append(key, params[key]);
  }
  return fetch(config.apiHost + url + '?' + u);
}

function apiPost(url, params) {

  return fetch(config.apiHost + url,{
    method: "POST",
    body: params
  });
}
exports.hasLogin = hasLogin;
exports.requireAuth = requireAuth;
exports.noAuth = noAuth;
exports.apiGet = apiGet;
exports.apiPost = apiPost;
