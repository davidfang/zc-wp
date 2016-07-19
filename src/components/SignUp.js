/**
 * Created by david_fang on 2016/6/24.
 */
import React from 'react';
import { Link } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import Countdown from './Countdown';
import {apiGet,apiPost} from './Auth';
var config = require('config').default;
class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      verification: '',
      password: '',
      checkMobile: false,
      countDown: config.countDown,

      mobileErr: '',
      codeErr: '',
      passwordErr: ''
    };
    this.mobileChange = this.mobileChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getMobileVerification = this.getMobileVerification.bind(this);
    this.register = this.register.bind(this);
  }

  /**
   * 发送验证码
   */
  getMobileVerification() {

    var mobile = this.state.mobile;


    var apiCall = apiGet('/v1/user/get-mobile-verification',{mobile: this.state.mobile});

    return apiCall.then(function (response) {
      return response.json();
    }).then(function (json) {
      console.log(json);
      if (json.status) {
        console.log('成功');
        this.setState({countDown: this.state.countDown - 1});
        return true;
      } else {
        console.log('失败');
        this.setState({mobileErr: json.msg});
        return false;
      }
    }.bind(this));
  }

  /**
   * 注册
   */
  register() {
    var form = new FormData(document.getElementById('signUp'));
    var apiCall = apiPost('/v1/user/sign-up', form);
    return apiCall.then(function (response) {
      return response.json();
    }).then(function (json) {
      console.log(json);
      if (json.status) {
        console.log('成功');
        localStorage.setItem('registed','y');
        sessionStorage.setItem('login','y');
        localStorage.setItem('access_token', json.data.access_token);//注册成功顺便登录
        // 这里使用 replaceState 方法做了跳转，但在浏览器历史中不会多一条记录，因为是替换了当前的记录
        //this.props.history.replaceState(null, '/ucenter');
        this.context.router.push('/ucenter');
        //replace('/ucenter' );
        return true;
      } else {
        console.log('失败');
        for (let key of Object.keys(json.error)) {
          this.setState({[key + 'Err']: json.error[key]});
        }
      }
    }.bind(this));
  }

  /**
   * 手机号码输入检查
   * @param event
   */
  mobileChange(event) {
    let mobile = event.target.value;
    this.setState({
      mobile: mobile,
      countDown: config.countDown,
      mobileErr: ''
    });

    var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
    if (reg.test(mobile)) {//获取手机验证码
      this.setState({checkMobile: true});
    } else {
      this.setState({checkMobile: false});
      console.log('手机号码不正确');
    }
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
   * 倒计时
   */
  countDown() {
    if (this.state.checkMobile) {
      if (this.state.countDown < config.countDown) {
        let lable = '' + this.state.countDown + '秒后可重新获取';
        return <RaisedButton label={lable} disabled={true}/>
      } else {
        return <RaisedButton label="获取验证码" primary={true} onTouchTap={this.getMobileVerification()}/>
      }
    } else {
      return <RaisedButton label="获取验证码" disabled={true}/>
    }
  }

  render() {
    const style = {
      margin: 12,
      width:'80%'
    };
    return <form id="signUp">
          <input type="hidden" id="username" name="username" value={this.state.mobile}/>
          <TextField
            id="mobile"
            name="mobile"
            onChange={this.mobileChange}
            floatingLabelText="请填手机号码"
            hintText="请填手机号码"
            errorText={this.state.mobileErr}
            style={{width:'40%'}}
          />

          <Countdown maxTime={config.countDown} check={this.state.checkMobile} countDown={this.state.countDown}
                     getMobileVerification={this.getMobileVerification}/>
          <br />
          <TextField
            hintText="请输入验证码"
            floatingLabelText="请输入验证码"
            errorText={this.state.codeErr}
            id="code"
            name="code"
            onChange={this.onChange}
          /><br />
          <TextField
            hintText="密码"
            floatingLabelText="密码"
            errorText={this.state.passowordErr}
            type="password"
            id="password"
            name="password"
            onChange={this.onChange}
          /><br />
          <RaisedButton label="注册" primary={true} fullWidth={true} onClick={this.register} style={style} />
          <div>已注册用户，请<Link to="/user/SignIn">登录</Link>
            </div>
        </form>
  }
}
SignUp.contextTypes = {
  router: React.PropTypes.object.isRequired
}
export default SignUp;
