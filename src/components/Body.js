/**
 * Created by david_fang on 2016/6/7.
 */
import React from 'react';
import Divider from 'material-ui/Divider';

import GoodsBox from './GoodsBox';

import StockCharts from './StockCharts';
import feed from './Feed';
import GoodGroup from './GoodGroup';
import {apiGet} from './Auth';

var d3 = require('d3');
var parseDate = d3.time.format('%Y-%m-%d %H:%M:%S').parse;
var config = require('config').default;
class Body extends React.Component {
  constructor(props) {
    super(props);
    let goodsNames = config.goodsNames;
    var stocks = [];
    Object.keys(goodsNames).map(x=> {
      stocks[x] = {symbol: goodsNames[x], open: 0, close: 0, high: 0, low: 0, change: 0}
    });

    var last = {};

    this.state = {goodsNames: goodsNames, stocks: stocks, last: last};

    this.watchStock = this.watchStock.bind(this);
    this.unwatchStock = this.unwatchStock.bind(this);
    this.changeState = this.changeState.bind(this);



  }

  componentWillMount() {
    //feed.watch(['MCD', 'BA',  'LLY', 'GM', 'GE', 'UAL', 'WMT', 'AAL', 'JPM']);
    feed.watch(Object.keys(this.state.goodsNames));

    if (localStorage.getItem('goodsItems') == null) {//没有产品信息时
      var apiCall = apiGet('/v1/transaction/get-goods-items', {});

      apiCall.then(function (response) {
        return response.json();
      }).then(function (json) {
        console.log(json);
        if (json.status) {
          console.log('成功');
          this.setState({goodsItems: json.data.goods_items});
          localStorage.setItem('goodsItems', JSON.stringify(json.data.goods_items));
          return true;
        } else {
          console.log('get goodsItem失败');
          this.setState({goodsItems: config.goodsItem});
          return false;
        }
      }.bind(this));
    } else {
      this.setState({goodsItems: JSON.parse(localStorage.getItem('goodsItems'))});
    }
  }

  componentDidMount() {

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

  }


  componentWillUnmount() {
    // 上面步骤四，在组件移除前忽略正在进行中的请求
    this.ignoreLastFetch = true
  }

  /**
   * 修改state值
   * @param key
   * @param value
   */
  changeState(key, value) {
    let state = this.state;
    eval('state.' + key + ' = "' + value + '";');
    this.setState(state);
  }

  watchStock(symbols) {
    symbols = symbols.replace(/ /g, '');
    var arr = symbols.split(',');
    feed.watch(arr);
  }

  unwatchStock(symbol) {
    feed.unwatch(symbol);
    let state = this.state;
    var stocks = this.state.stocks;
    delete stocks[symbol];
    state.stocks = stocks;
    this.setState(state);
  }

  /**
   * 更新数据
   */
  changeData() {

  }

  render() {
    //console.log('body  中this.state');
    //console.log(this.state);
    //var goodsItems = config.goodsItem;
    var goodsItems = this.state.goodsItems;


    var items = [];
    for (let item in goodsItems) {
      let v = goodsItems[item];
      // var stockOpen = this.state.stocks[item].open; //下一步修改成ID式的，不再直接用名称
      //     var stockClose = this.state.stocks[item].close;
      var stockOpen = this.state.stocks[v.symbol].open;
      var stockClose = this.state.stocks[v.symbol].close;

      items.push(<GoodGroup key={item} {...v} stockOpen={stockOpen} stockClose={stockClose}/>);

    }


    return <div>
      <GoodsBox stocks={this.state.stocks} last={this.state.last}/>
      <div>
        {items}
      </div>
      <StockCharts
        stocks={this.state.stocks}
        last={this.state.last}
        goodsNames={this.state.goodsNames}
      />
    </div>

  }
}
// porps 的默认值
/*Body.defaultProps = {
 stocks: {
 'BAC': {symbol: 'BAC', open: 15.84,last:15.84,high:15.84,low:15.84},
 'BA': {symbol: 'BA', open: 154.50,last:154.50,high:154.50,low:154.50}
 },
 last: {symbol: 'BA', open: 154.50,last:154.50,high:154.50,low:154.50,change:0.5}
 }*/
export default Body;
