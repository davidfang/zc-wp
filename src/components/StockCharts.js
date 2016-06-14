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
  }
  shouldComponentUpdate(nextProps, nextState){
    console.log('shouldComponentUpdate');
    console.log('nextProps');
    console.log(nextProps);
    console.log('thisProps');
    console.log(this.props);
    return false;
    return nextProps.data == this.props.data;
  }

  render(){
    console.log('StockCharts执行一次');
    let timeTypes = ['F1','M1'].map(timeType=>{
      return <TimeType key={timeType} name={timeType}  timeType={this.props.timeType} changeState={this.props.changeState} />
    });

    return <div>
      <div>{this.props.name}</div>
      <div>{timeTypes}</div>
      <CandleStickChartWithEdge data={this.props.data} type="hybrid"/>
    </div>
  }
}
export default StockCharts;
