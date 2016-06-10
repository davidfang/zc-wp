/**
 * Created by david_fang on 2016/6/7.
 */
import React from 'react';

import GoodsBox from './GoodsBox';
import StockCharts from './StockCharts';

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {k: '546'}
  }

  render() {
    //let style = {};
    return <div>
      <GoodsBox  stocks={this.props.stocks} last={this.props.last}/>
      <StockCharts k={this.state.k}/>
    </div>

  }
}
// porps 的默认值
Body.defaultProps = {
  stocks: {
    'BAC': {symbol: 'BAC', open: 15.84,last:15.84,high:15.84,low:15.84},
    'BA': {symbol: 'BA', open: 154.50,last:154.50,high:154.50,low:154.50}
  },
  last: {symbol: 'BA', open: 154.50,last:154.50,high:154.50,low:154.50,change:0.5}
}
export default Body;
