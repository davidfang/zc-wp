/**
 * Created by david_fang on 2016/6/7.
 */
import React from 'react';

import GoodsBox from './GoodsBox';
import StockCharts from './StockCharts';

class Body extends React.Component{
  render(){
    //let style = {};
    return <div>
        <GoodsBox />
        <StockCharts />
    </div>

  }
}
export default Body;
