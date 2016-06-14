/**
 * Created by david_fang on 2016/6/7.
 */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import CandleStickChartWithEdge from '../lib/charts/CandleStickChartWithEdge';
import TimeType from './TimeType';
var d3 = require('d3');
var parseDate = d3.time.format('%Y-%m-%d').parse ;
class StockCharts extends React.Component{
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState){
    /*console.log('shouldComponentUpdate');
    console.log('nextProps');
    console.log(nextProps);
    console.log('thisProps');
    console.log(this.props);
    return false;*/
    if(nextProps.timeType !== this.props.timeType){//K线时间周期发生变化
      this.setData();
    }
    if(nextProps.checkedStock !== this.props.checkedStock){//选择股票名称发生变化
      this.setData();
    }
    return nextProps.data !== this.props.data;
  }
  setData(){
    var setData = this.props.setData;
    //* 设置数据
    d3.tsv('./data/MSFT.tsv', function(err, data) {
      data.forEach((d, i) => {
        d.date = new Date(parseDate(d.date).getTime());
        d.open = +d.open;
        d.high = +d.high;
        d.low = +d.low;
        d.close = +d.close;
        d.volume = +d.volume;
        // console.log(d);
      });
      console.log('异步加载data');
      console.log(data);
      console.log('异步加载data');
      setData(data);
    });
  }
  componentDidMount(){
    this.setData();
  }


  render(){
    console.log('StockCharts执行一次');
    let timeTypes = ['F1','M1'].map(timeType=>{
      return <TimeType key={timeType} name={timeType}  timeType={this.props.timeType} changeState={this.props.changeState} />
    });

    return <div>
      <div>{this.props.checkedStock}</div>
      <div>{timeTypes}</div>
      <CandleStickChartWithEdge data={this.props.data} type="hybrid"/>
    </div>
  }
}
export default StockCharts;
