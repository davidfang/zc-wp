/**
 * Created by david_fang on 2016/6/7.
 */
import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Number} from './Auth';
class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {type:1,quantity:1,direction:this.props.direction}
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * 输入检查,绑定值，去除错误
   * @param event
   */
  onChange(event) {
    this.setState({
      [event.target.name]: [event.target.value],
      [event.target.name + 'Err']: ''
    });
  }

  handleChange(event, index, value) {
    this.setState({type:value})
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
        id="quantity"
        name="quantity"
        onChange={this.onChange}
      />
      </div>
    </form>
  }
}
export default Order;
