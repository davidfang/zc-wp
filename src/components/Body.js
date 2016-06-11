/**
 * Created by david_fang on 2016/6/7.
 */
import React from 'react';

import GoodsBox from './GoodsBox';
import StockCharts from './StockCharts';
import feed from './Feed';
class Body extends React.Component {
  constructor(props) {
    super(props);
    this.watchStock = this.watchStock.bind(this);
    this.unwatchStock = this.unwatchStock.bind(this);

    //feed.watch(['MCD', 'BA',  'LLY', 'GM', 'GE', 'UAL', 'WMT', 'AAL', 'JPM']);
    feed.watch(['BAC', 'BA']);
    var stocks = {};
    feed.onChange(function (stock) {
      stocks[stock.symbol] = stock;
      this.setState({stocks: stocks, last: stock});
      //console.log(stock);
    }.bind(this));
    this.state = {stocks: stocks};
  }

  watchStock(symbols) {
    symbols = symbols.replace(/ /g, '');
    var arr = symbols.split(',');
    feed.watch(arr);
  }

  unwatchStock(symbol) {
    feed.unwatch(symbol);
    var stocks = this.state.stocks;
    delete stocks[symbol];
    this.setState({stocks: stocks});
  }

  render() {
    //let style = {};
    return <div>
      <GoodsBox  stocks={this.state.stocks} last={this.state.last}/>
      <StockCharts />
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
