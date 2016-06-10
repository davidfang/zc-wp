/**
 * 股票列表
 * 功能：添加股票，去除股票，股票列表
 * Created by david_fang on 2016/6/10.
 * 使用：
 * Main.js下面：
 * 1 、建立相应方法和初始数据：watchStock unwatchStock  stocks  state;
 * 2、<StockList watchStock={this.watchStock} stocks={this.state.stocks} last={this.state.last}
 unwatchStock={this.unwatchStock}/>
 注意：
 */
import React from 'react';
import WatchStock from './WatchStock';
import StockTable from './StockTable';

class StockList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>
      <WatchStock watchStockHandler={this.props.watchStock}/>
      <StockTable stocks={this.props.stocks} last={this.props.last} unwatchStockHandler={this.props.unwatchStock}/>
      <div className="row">
        <div className="alert alert-warning" role="alert">All stock values are fake and changes are simulated. Do
          not trade based on the above data.
        </div>
      </div>
    </div>

  }
}
// porps 的默认值
StockList.defaultProps = {
  stocks: {},
  last: {},
  watchStock: '',
  unwatchStock: ''
}
export default StockList;
