/**
 * Created by david_fang on 2016/6/7.
 */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import CandleStickChartWithEdge from '../lib/charts/CandleStickChartWithEdge';

class StockCharts extends React.Component{
  render(){


    return <div>
      <div>{this.props.name}</div>
      <CandleStickChartWithEdge data={this.props.data} type="hybrid"/>
    </div>
  }
}
CandleStickChartWithEdge.propTypes = {
  data: React.PropTypes.array.isRequired
};
export default StockCharts;
