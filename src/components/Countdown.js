/**
 * Created by david_fang on 2016/6/24.
 */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
class Countdown extends React.Component {
  constructor(props) {
    super(props);
    //console.log('countdown.props.countDown:',this.props.countDown)
    //console.log('countdown.props.check:',this.props.check)
    this.state = {check: this.props.check, countDown: this.props.countDown};
    //this._bind('autoChange');
    //console.log('Countdown.props:',this.props);
    this.getMobileVerification = this.getMobileVerification.bind(this);
  }

  /**
   * 倒计时，自动变数字
   */
  autoChange() {
    var _self = this;
    let tt = _self.state.countDown - 1;
    if (tt <= 0) {
      this.setState({check: true, countDown: this.props.maxTime});
      clearInterval(tm);
      return;
    }
    _self.setState({countDown: tt});
    // 自动更改
    var tm = setTimeout(function () {
      _self.autoChange();
    }, 1000);

  }


  /**
   * 获取手机验证码
   */
  getMobileVerification() {
    //this.setState({countDown: 50});
    this.props.getMobileVerification();//获取手机验证码成功才倒计时
        this.autoChange();
  }


  /*componentDidUpdate() {
    //console.log('componentDidUpdate:',this.props,this.state);
  }

  shouldComponentUpdate(nextProps, nextState) {
    //console.log('A shouldComponentUpdate');
    //console.log(nextProps, nextState);
    return true;
  }*/

  render() {
    if (this.props.check) {
      //if (this.props.countDown < config.countDown) {
      if (this.state.countDown < this.props.maxTime) {
        let lable = '' + this.state.countDown + '秒后重新获取';
        return <RaisedButton label={lable} disabled={true}/>
      } else {
        return <RaisedButton label="获取验证码" primary={true} onClick={this.getMobileVerification}/>
      }
    } else {
      return <RaisedButton label="获取验证码" disabled={true}/>
    }
  }
}
export default Countdown;
