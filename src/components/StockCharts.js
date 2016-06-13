/**
 * Created by david_fang on 2016/6/7.
 */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import CandleStickChartWithEdge from '../lib/charts/CandleStickChartWithEdge';

class StockCharts extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    console.log('StockCharts执行一次');
    return <div>
      <div>{this.props.name}</div>
      <CandleStickChartWithEdge data={this.props.data} type="hybrid"/>
    </div>
  }
}
export default StockCharts;
