/**
 * Created by david_fang on 2016/6/7.
 */
import React from 'react';
import Divider from 'material-ui/Divider';

import GoodsBox from './GoodsBox';
import StockChecked from './StockChecked';
import StockCharts from './StockCharts';
import feed from './Feed';
import GoodGroup from './GoodGroup';

var d3 = require('d3');
var parseDate = d3.time.format('%Y-%m-%d').parse ;
class Body extends React.Component {
  constructor(props) {
    super(props);
    this.watchStock = this.watchStock.bind(this);
    this.unwatchStock = this.unwatchStock.bind(this);
    this.changeStockCharts = this.changeStockCharts.bind(this);
    this.changeTimeType = this.changeTimeType.bind(this);






  }
  componentWillMount () {
    //feed.watch(['MCD', 'BA',  'LLY', 'GM', 'GE', 'UAL', 'WMT', 'AAL', 'JPM']);
    feed.watch(this.props.products);
    var stocks = {};
    let checkedStock = this.props.products[0];//这里还是做个区别，这里是选择产品K线图
    var data = this.props.data;
    this.setState({stocks: stocks, checkedStock: checkedStock,timeType:'F1', data: data });
  }
  componentDidMount() {

    feed.onChange(function (stock) {
      let state = this.state;
      state.stocks[stock.symbol] = stock;
      let d = {};
      d.date = new Date(parseDate(stock.date).getTime());
      d.open = +stock.open;
      d.high = +stock.high;
      d.low = +stock.low;
      d.close = +stock.close;
      d.volume = +stock.volume;
      //state.data.push(d);
      state.last = stock;
      //data =>{}
      this.setState(state);
      //console.log(stock);
    }.bind(this));

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
   * 选择股票K线图
   * @param stock
   */
  changeStockCharts(stock) {
    let state = this.state;
    state.checkedStock = stock;
    this.setState(state);
  }
  /**
   * 变更时间类型
   */
  changeTimeType(timeType) {
    let state = this.state;
    state.timeType = timeType;
    this.setState(state);
  }

  render() {
    console.log('body  中this.state');
    console.log(this.state);
    let products = this.props.products.map(x=> {
      return <StockChecked key={x} stock={x} checkedStock={this.state.checkedStock}
                           changeStockCharts={this.changeStockCharts}/>
    });

    return <div>
      <GoodsBox stocks={this.state.stocks} last={this.state.last}/>
      <div>
        <GoodGroup />
        <GoodGroup />
        <GoodGroup />
        <Divider />
        <GoodGroup />
        <GoodGroup />
        <GoodGroup />
      </div>
      <div>
        {products}
      </div>
      <StockCharts
        stocks={this.state.stocks}
        last={this.state.last}
        name={this.state.checkedStock}
        data={this.props.data}
        timeType={this.state.timeType}
        changeTimeType={this.changeTimeType}
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
