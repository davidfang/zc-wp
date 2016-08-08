/**
 * Created by david_fang on 2016/8/6.
 */
import React from 'react';
import {Link} from 'react-router'

import Dialog from 'material-ui/Dialog';

import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import {apiGet, goodsItems, Number,timeToDate} from './../Auth';
var config = require('config').default;
class Index extends React.Component {
  constructor(props) {
    super(props);
    let goodsItemsObj = goodsItems();
    let goodsItem = goodsItemsObj[this.props.goods_item];

    this.state = {goodsItem: goodsItem, open: false};
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * 查看持仓详情
   */
  handleChange() {
    this.setState({open: !this.state.open});
  }

  /**
   * 平仓
   * @returns {Promise.<TResult>}
     */
  handleClose() {
    //平仓
    var apiCall = apiGet('/v1/transaction/close', {id:this.props.id});

     apiCall.then(function (response) {
      return response.json();
    }).then(function (json) {
      console.log(json);
      if (json.status) {
        console.log('成功');
        //this.setState({positions:json.data.positions});
        //删除key对应的持仓
        this.props.handleRemove(this.props.positionKey);
      } else {
        console.log('失败');
      }
    }.bind(this));
    this.setState({open: false});
  }


  render() {
    const style = {
      dialogContent: {
        width: '100%',
        maxWidth: 'none'
      },
      actionsStyle: {
        textAlign: 'center'
      }
    };


    const actions = [
      <FlatButton
        label="关闭"
        primary={true}
        onTouchTap={this.handleChange}
      />,
      <FlatButton
        label="平仓"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];


    var {name, size, unit, change} = this.state.goodsItem;
    let directions = {1: '买涨', 2: '买跌'};
    let quantity = this.props.quantity;
    let price = this.props.price;
    let currentPrice = Number(this.props.stockOpen).mul(config.goodsPriceCoefficient);
    let points = (currentPrice - price) * quantity;//总波动点数 = （当前价格 - 交易价格） * 数量
    let profitLoss = Number(points).mul(change);
    if (this.props.direction != 1) {
      profitLoss = Number(0).sub(profitLoss);
    }


    return <li style={{margin:'0px 15px'}}>
      <span>{name}{size}{unit}<i>{directions[this.props.direction]}</i>订单号：{this.props.id}</span><span>{quantity}</span><span>{profitLoss}</span><span
      onTouchTap={this.handleChange}>查看详情</span>
      <Dialog contentStyle={style.dialogContent}
              title="持仓详情"
              actions={actions}
              actionsContainerStyle={style.actionsStyle}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleChange}
              autoScrollBodyContent={true}
      >
        <ul>
          <li><lable>订单号：</lable><span>{this.props.id}</span></li>
          <li><lable>类型：</lable><span>{directions[this.props.direction]}</span></li>
          <li><lable>产品：</lable><span>{name}{size}{unit}</span></li>
          <li><lable>数量：</lable><span>{quantity}</span></li>
          <li><lable>止损：</lable><span>{this.props.stop_loss}</span></li>
          <li><lable>止盈：</lable><span>{this.props.stop_profit}</span></li>
          <li><lable>创建时间：</lable><span>{timeToDate(1000 * this.props.created_at)}</span></li>
        </ul>
      </Dialog>
    </li>
  }
}
export default Index;
