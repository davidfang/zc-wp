/**
 * Created by david_fang on 2016/6/9.
 */
import React from 'react';

import StockRow from './StockRow';

class StockTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var items = [];
    for (var symbol in this.props.stocks) {
      var stock = this.props.stocks[symbol];
      items.push(<StockRow key={stock.symbol} stock={stock} last={this.props.last}
                           unwatchStockHandler={this.props.unwatchStockHandler}/>);
    }
    return (
      <div className="row">
        <table className="table-hover">
          <thead>
          <tr>
            <th>Symbol</th>
            <th>Open</th>
            <th>Last</th>
            <th>Change</th>
            <th>High</th>
            <th>Low</th>
            <th>Unwatch</th>
          </tr>
          </thead>
          <tbody>
          {items}
          </tbody>
        </table>
      </div>
    );
  }
}
export default StockTable;
