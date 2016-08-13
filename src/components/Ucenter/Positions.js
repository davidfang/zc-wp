/**
 * Created by david_fang on 2016/6/24.
 */
import React from 'react';
import {Link} from 'react-router'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';

import {List, ListItem} from 'material-ui/List';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Snackbar from 'material-ui/Snackbar';

import feed from './../Feed';
import {apiGet,goodsItems} from './../Auth';
import PositionsList from './PositionsList';
var d3 = require('d3');
var parseDate = d3.time.format('%Y-%m-%d %H:%M:%S').parse;
var config = require('config').default;

class Positions extends React.Component {
  constructor(props) {
    super(props);
    let goodsNames = config.goodsNames;
    var stocks = [];
    Object.keys(goodsNames).map(x=> {
      stocks[x] = {symbol: goodsNames[x], open: 0, close: 0, high: 0, low: 0, change: 0}
    });

    var last = {};

    this.state = {
      goodsNames: goodsNames,
      stocks: stocks,
      last: last,
      snackbarOpen:false,
      snackbarMessage:'平仓提示'
    };

    feed.watch(Object.keys(this.state.goodsNames));

    feed.onChange(function (stock) {
      let state = this.state;
      //let state = {stocks:{}};
      stock.name = this.state.goodsNames[stock.symbol];
      state.stocks[stock.symbol] = stock;
      let d = {};
      d.date = new Date(parseDate(stock.date).getTime());//stock.date;//
      d.open = +stock.open;
      d.high = +stock.high;
      d.low = +stock.low;
      d.close = +stock.close;
      d.volume = +stock.volume;
      //state.data.push(d);
      state.last = stock;
      //data =>{}
      if (!this.ignoreLastFetch) {
        this.setState(state);
      }
      //console.log('feedfeedfeedfeedfeedfeed');
      //console.log(stock);
    }.bind(this));

    this.handleRemove = this.handleRemove.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  componentDidMount() {


    //获取持仓头寸
    var apiCall = apiGet('/v1/ucenter/positions', {});

    return apiCall.then(function (response) {
      return response.json();
    }).then(function (json) {
      console.log(json);
      if (json.status) {
        console.log('成功');
        this.setState({positions:json.data.positions});
        return true;
      } else {
        console.log('失败');
        return false;
      }
    }.bind(this));
  }

  /**
   * 删除已平仓单子
   * @param i 删除单子的value
   * @param msg 提示
     */
  handleRemove(i,msg){
    this.state.positions.splice(i,1);
    this.setState({snackbarOpen:true,snackbarMessage:msg});
  }

  /**
   * 关闭平仓请求提示
   */
  handleRequestClose ()  {
    this.setState({
      snackbarOpen: false
    });
  };
  render() {
    var goodsItemsObj = goodsItems();

    var   positions = this.state.positions;


    var items = [];
    for (let item in positions) {
      let v = positions[item];
      var stockOpen = this.state.stocks[goodsItemsObj[v.goods_item].symbol].open;
      items.push(<PositionsList key={item} positionKey={item} {...v} stockOpen={stockOpen} handleRemove={this.handleRemove}/>);

    }


    return <div><ul style={{margin:'0px 15px'}}>
      {items}

      </ul>
      <Snackbar
        open={this.state.snackbarOpen}
        message={this.state.snackbarMessage}
        autoHideDuration={1500}
        onRequestClose={this.handleRequestClose}
      />
    </div>
  }
}
export default Positions;
