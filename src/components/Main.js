import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Head from './Head';
import Body from './Body';
import Foot from './Foot';

import feed from './Feed';
class Main extends React.Component {
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
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <Head />
          <Body stocks={this.state.stocks} last={this.state.last}/>
          <Foot />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
