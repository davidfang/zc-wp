/**
 * Created by david_fang on 2016/8/14.
 */
import React from 'react';
import {Link } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {apiPost} from './../Auth';
class ChangePassWord extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      oldpassword: '',
      password: '',
      passwordRepeat: '',

      oldpasswordErr: '',
      passwordErr: '',
      passwordRepeatErr: ''
    };
    this.onChange = this.onChange.bind(this);
    this.changePassWord = this.changePassWord.bind(this);

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
   * 修改密码
   */
  changePassWord(){
    var form = new FormData(document.getElementById('changePassWord'));
    var apiCall = apiPost('/v1/ucenter/change-pass-word', form);
    return apiCall.then(function (response) {
      return response.json();
    }).then(function (json) {
      //console.log(json);
      if (json.status) {
        //console.log('成功');
        localStorage.removeItem('access-token');//注册成功顺便登录
        // 这里使用 replaceState 方法做了跳转，但在浏览器历史中不会多一条记录，因为是替换了当前的记录
        sessionStorage.removeItem('login');
        this.context.router.push('/user/signIn');
        return true;
      } else {
        //console.log('失败');
        for (let key of Object.keys(json.error)) {
          console.log({[key + 'Err']: json.error[key]});
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
    return <form id="changePassWord" style={{textAlign:'center'}}>
          <TextField
            id="oldpassword"
            name="oldpassword"
            type="password"
            floatingLabelText="原密码"
            hintText="原密码"
            errorText={this.state.oldpasswordErr}
            onChange={this.onChange}
          />
          <br />
          <TextField
            hintText="新密码"
            floatingLabelText="新密码"
            type="password"
            id="password"
            name="password"
            errorText={this.state.passwordErr}
            onChange={this.onChange}
          /><br />
          <TextField
            hintText="重复密码"
            floatingLabelText="重复密码"
            type="password"
            id="passwordRepeat"
            name="passwordRepeat"
            errorText={this.state.passwordRepeatErr}
            onChange={this.onChange}
          /><br />
          <RaisedButton label="修改密码" primary={true} fullWidth={false} onClick={this.changePassWord} style={style}/>
        </form>
  }
}
ChangePassWord.contextTypes = {
  router: React.PropTypes.object.isRequired
}
export default ChangePassWord;
