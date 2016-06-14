/**
 * Created by david_fang on 2016/6/7.
 */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import CandleStickChartWithEdge from '../lib/charts/CandleStickChartWithEdge';
import TimeType from './TimeType';
class StockCharts extends React.Component{
  constructor(props) {
    super(props);
    this.changeTimeType = this.changeTimeType.bind(this);
  }
  /**
   * 变更时间类型
   */
  changeTimeType() {
    this.props.timeType();
  }
  render(){
    console.log('StockCharts执行一次');
    let timeTypes = ['F1','M1'].map(timeType=>{
      return <TimeType key={timeType} name={timeType} n timeType={this.props.timeType} changeTimeType={this.props.changeTimeType} />
    });

    return <div>
      <div>{this.props.name}</div>
      <div>{timeTypes}</div>
      <CandleStickChartWithEdge data={this.props.data} type="hybrid"/>
    </div>
  }
}
export default StockCharts;
