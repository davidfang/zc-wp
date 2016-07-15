/**
 * Created by david_fang on 2016/6/24.
 */
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import Countdown from './Countdown';
var config = require('config').default;
var d3 = require('d3');
//var API_HOST = 'http://api.dev'
class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {mobile: '', verification: '', password: '',checkMobile:false,countDown:config.countDown};
    this.mobileChange = this.mobileChange.bind(this);
    this.getMobileVerification = this.getMobileVerification.bind(this);
  }

  /**
   * 发送验证码
     */
  getMobileVerification() {
    let mobile = this.state.mobile;
    console.log(mobile);
    let url = config.apiHost + '/v1/user/get-mobile-verification?mobile=' + mobile;
    d3.json(url, function (result) {
      if (result.status) {//成功

      } else {//失败

      }
      console.log(result);
    });
    this.setState({countDown:this.state.countDown-1});
    console.log(url);
  }

  /**
   * 手机号码输入检查
   * @param event
     */
  mobileChange(event) {
    let mobile = event.target.value;
    this.setState({
      mobile: mobile,
      countDown:config.countDown
    });

    var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
    if (reg.test(mobile)) {//获取手机验证码
      this.setState({checkMobile:true});
    } else {
      this.setState({checkMobile:false});
      console.log('手机号码不正确');
    }
  }

  /**
   * 倒计时
   */
  countDown(){console.log('zzzzzz');
    if(this.state.checkMobile) {
      if (this.state.countDown < config.countDown) {
        let lable = '' + this.state.countDown + '秒后可重新获取';
        return <RaisedButton label={lable} disabled={true}/>
      } else {
        return <RaisedButton label="获取验证码" primary={true} onTouchTap={this.getMobileVerification()}/>
      }
    }else{
      return <RaisedButton label="获取验证码" disabled={true}/>
    }
  }
  render() {
    console.log('bbbbbbccc  countDown:');
    console.log(this.state.countDown);
    return <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div>
        <TextField
          id="mobile"
          name="mobile"
          onChange={this.mobileChange}
          hintText="请填手机号码"
        />
        <Countdown maxTime={config.countDown} check={this.state.checkMobile} countDown={this.state.countDown} getMobileVerification={this.getMobileVerification}/>
        <br />
        <TextField
          hintText="Hint Text"
          floatingLabelText="Floating Label Text"
        /><br />
        <TextField
          hintText="Hint Text"
          floatingLabelText="Fixed Floating Label Text"
          floatingLabelFixed={true}
        /><br />
        <TextField
          hintText="Password Field"
          floatingLabelText="Password"
          type="password"
        /><br />
        <TextField
          hintText="MultiLine with rows: 2 and rowsMax: 4"
          multiLine={true}
          rows={2}
          rowsMax={4}
        /><br />
        <TextField
          hintText="Message Field"
          floatingLabelText="MultiLine and FloatingLabel"
          multiLine={true}
          rows={2}
        /><br />
        <TextField
          hintText="Full width"
          fullWidth={true}
        />
      </div>
    </MuiThemeProvider>
  }
}
export default SignIn;
