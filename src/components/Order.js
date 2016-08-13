/**
 * Created by david_fang on 2016/6/7.
 */
import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

import {green500,red500} from 'material-ui/styles/colors'
import {Number,apiPost} from './Auth';
import SelectInput from './SelectInput';
class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type:1,
      quantity:1,
      quantityErr:'',
      direction:this.props.direction
    }
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * 输入检查,绑定值，去除错误
   * @param event
   */
  onChange(event) {
    this.setState({
      //[event.target.name]: [event.target.value],
      [event.target.name + 'Err']: ''
    });
  }

  handleChange(event, index, value) {
    this.setState({type:value})
  }
  handleClose  ()  {
    this.props.handleClose('');
  };
  handleSubmit(){
    var form = new FormData(document.getElementById('order'));
    var apiCall = apiPost('/v1/transaction/add', form);
    apiCall.then(function (response) {
      return response.json();
    }).then(function (json) {
      console.log(json);
      if (json.status) {
        console.log('成功');
        //replace('/ucenter' );
        this.props.handleClose(json.msg);
      } else {
        console.log('失败');
        for (let key of Object.keys(json.error)) {
          this.setState({[key + 'Err']: json.error[key]});
        }
      }
    }.bind(this));

  }
  render() {
    let style = {
      lable:{
        marginRight:'10px'
      },
      formGroup:{
        margin:'10px'
      }
    }
    return <form id="order">
      <div style={style.formGroup}>
      <lable style={style.lable}>类型</lable>
        <input type="hidden" value={this.props.goods_item} name="goods_item" id="goods_item"/>
        <input type="hidden" value={this.state.direction} name="direction" id="direction"/>
        <input type="hidden" value={this.state.type} name="type" id="type"/>
      <SelectField value={this.state.type}  onChange={this.handleChange}>
        <MenuItem value={1} primaryText="市价单" />
        <MenuItem value={2} primaryText="限价单" />
      </SelectField>
        </div>
      <div style={style.formGroup}>
      <lable style={style.lable}>商品</lable>
      {this.props.name + this.props.size + this.props.unit}
      </div>
      <div style={style.formGroup}>
      <lable style={style.lable}>价格</lable>
      {Number(this.props.stockOpen).mul(this.props.size)}/{Number(this.props.stockClose).mul(this.props.size)}元
      </div>
      <div style={style.formGroup}>
      <lable style={style.lable}>数量</lable>
      <TextField
        hintText="请输入数量"
        errorText={this.state.quantityErr}
        id="quantity"
        name="quantity"
        onChange={this.onChange}
      />
      </div>
      <div style={style.formGroup}>
      <lable style={style.lable}>止损</lable>
      <SelectInput color={green500} name="stop_loss" />
      </div>
      <div style={style.formGroup}>
      <lable style={style.lable}>止盈</lable>
      <SelectInput color={red500} name="stop_profit" />
      </div>
      <div><FlatButton
        label="取消"
        primary={true}
        onTouchTap={this.handleClose}
      />
        <FlatButton
          label="提交"
          primary={true}
          keyboardFocused={true}
          onTouchTap={this.handleSubmit}
        /></div>
    </form>
  }
}
export default Order;
