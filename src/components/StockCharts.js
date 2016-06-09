/**
 * Created by david_fang on 2016/6/7.
 */
import React from 'react';

class StockCharts extends React.Component{
  render(){
    //console.log(this.props.data);
    return <div>
      K线图
      {this.props.k}
    </div>
  }
}
export default StockCharts;
