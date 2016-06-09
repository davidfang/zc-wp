/**
 * Created by david_fang on 2016/6/7.
 */
import React from 'react';

import GoodsBox from './GoodsBox';
import StockCharts from './StockCharts';

class Body extends React.Component{
  constructor(props) {
    super(props);
    this.state = {k:'546'}
  }
  render(){
    //let style = {};
    return <div>
        <GoodsBox />
        <StockCharts k={this.state.k}   />
    </div>

  }
}
export default Body;
