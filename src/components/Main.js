import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


import Head from './Head';
import Body from './Body';
import Foot from './Foot';
import WatchStock from './WatchStock';
import StockTable from './StockTable';
var socket = require('socket.io-client')('http://localhost:8080');

var feed = {
  onChange: function (callback) {
    socket.on('stock', callback);
  },
  watch: function (symbols) {
    socket.emit('join', symbols);
  },
  unwatch: function (symbol) {
    socket.emit('leave', symbol);
  }
};


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.watchStock = this.watchStock.bind(this);
    this.unwatchStock = this.unwatchStock.bind(this);


    feed.watch(['MCD', 'BA', 'BAC', 'LLY', 'GM', 'GE', 'UAL', 'WMT', 'AAL', 'JPM']);

    this.state = {};
  }

  componentDidMount() {
    var stocks = {};
    feed.onChange(function (stock) {
      stocks[stock.symbol] = stock;
      this.setState ( {stocks: stocks, last: stock});
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
    var stocks = this.state.stocks;
    delete stocks[symbol];
    this.setState({stocks: stocks});
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <Head />
          <Body />
          <WatchStock watchStockHandler={this.watchStock}/>
          <StockTable stocks={this.state.stocks} last={this.state.last} unwatchStockHandler={this.unwatchStock}/>
          <div className="row">
            <div className="alert alert-warning" role="alert">All stock values are fake and changes are simulated. Do
              not trade based on the above data.
            </div>
          </div>
          <Foot />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
