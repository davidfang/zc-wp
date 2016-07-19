/**
 * Created by david_fang on 2016/6/24.
 */
import React from 'react';
import {Link,browserHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {apiPost} from './Auth';
var config = require('config').default;
class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      password: '',

      mobileErr: '',
      passwordErr: ''
    };
    this.onChange = this.onChange.bind(this);
    this.singIn = this.singIn.bind(this);

  }

  /**
   * 输入检查,绑定值，去除错误
   * @param event
   */
  onChange(event) {
    this.setState({
      [event.target.name]: [event.target.value],
      [event.target.name +'Err']: ''
    });
  }
  /**
   * 登录
   */
  singIn(){
    var form = new FormData(document.getElementById('signIn'));
    var apiCall = apiPost('/v1/user/sign-in', form);
    return apiCall.then(function (response) {
      return response.json();
    }).then(function (json) {
      console.log(json);
      if (json.status) {
        console.log('成功');
        localStorage.setItem('access_token', json.data.access_token);//注册成功顺便登录
        // 这里使用 replaceState 方法做了跳转，但在浏览器历史中不会多一条记录，因为是替换了当前的记录
        sessionStorage.setItem('login','y');
        this.context.router.push('/ucenter');
        return true;
      } else {
        console.log('失败');
        for (let key of Object.keys(json.error)) {
          this.setState({[key + 'Err']: json.error[key]});
        }
      }
    }.bind(this));
  }
  render() {
    const style = {
      margin: 12,
      width:'80%'
    };
    return <form id="signIn">
          <TextField
            id="mobile"
            name="mobile"
            onChange={this.mobileChange}
            floatingLabelText="请填手机号码"
            hintText="请填手机号码"
            errorText={this.state.mobileErr}
            onChange={this.onChange}
          />
          <br />
          <TextField
            hintText="密码"
            floatingLabelText="密码"
            type="password"
            id="password"
            name="password"
            onChange={this.onChange}
          /><br />
          <RaisedButton label="登录" primary={true} fullWidth={false} onClick={this.singIn} style={style}/>
          <div>没有账号，请<Link to="/user/SignUp">注册</Link></div>
        </form>
  }
}
SignIn.contextTypes = {
  router: React.PropTypes.object.isRequired
}
export default SignIn;
