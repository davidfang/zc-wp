/**
 * Created by david_fang on 2016/6/7.
 */
import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import CandleStickChartWithEdge from '../lib/charts/CandleStickChartWithEdge';
import LineAndScatterChart from '../lib/charts/LineAndScatterChart';

import TimeType from './TimeType';
//import TimeTypeGroup from './TimeTypeGroup';
import StockChecked from './StockChecked';
var config = require('config').default;
var d3 = require('d3');
var parseDate = d3.time.format('%Y-%m-%d %H:%M:%S').parse ;
class StockCharts extends React.Component{
  constructor(props) {
    super(props);
    let checkedStock = this.props.products[0];//这里还是做个区别，这里是选择产品K线图
    var data = {};
    let timeTypes = ['F1','M1']
    this.state = {data:[],checkedStock:checkedStock, timeType:'F1',timeTypes:timeTypes};

    this.changeState = this.changeState.bind(this);
    this.changeStock = this.changeStock.bind(this);
    this.changeTimeType = this.changeTimeType.bind(this);
    this.setData = this.setData.bind(this);
  }

  /**
   * 变更选择股票
   * @param stock
     */
  changeStock(stock){
    this.changeState('checkedStock',stock);
    this.setData();
  }

  /**
   * 变更选择时间类型（周期）
   * @param timeType
     */
  changeTimeType(timeType){
    this.changeState('timeType',timeType);
    this.setData();
  }

  shouldComponentUpdate(nextProps, nextState){
    return nextState !== this.state;
  }
  componentWillReceiveProps(nextProps) {
    //当前选择的股票实时变更数据 更新K线图
    if(this.state.checkedStock == nextProps.last.symbol){
      this.state.timeTypes.map(function(timeType){
        if(timeType == 'F1'  && timeType == this.state.timeType){
          let state = this.state;
          let stock = nextProps.last;
          let d = {};
          d.date = new Date(stock.date);//new Date(parseDate(stock.date).getTime());
          d.open = +stock.open;
          d.high = +stock.high;
          d.low = +stock.low;
          d.close = +stock.close;
          d.volume = +stock.volume;
          state.data.push(d);
          this.setState(state);
          console.log('F1    执行了一次   改变数据');
        }
        if(timeType == 'M5'  && timeType == this.state.timeType){
          console.log('M5    执行了一次没改变数据');
        }
      }.bind(this));
    }
  }

  /**
   * 异步操作获取数据
   */
  setData(){
    let  stock;
    if(this.state.checkedStock == '白银') {
      stock = 'sliver';
    }if(this.state.checkedStock == '原油') {
      stock = 'crude';
    }

    let time = this.state.timeType == 'F1'?'now':this.state.timeType;
    //let url = '//a-zc-wp.php/v1/data/index?access-token=yVZzJtQPOMk_CrNe5KIk699XDVJYxwm__1466149559&stock='+stock + '&time='+time;
    //let url = '//api.dev/v1/data/index?access-token=yVZzJtQPOMk_CrNe5KIk699XDVJYxwm__1466149559&stock='+stock + '&time='+time;
    let url = config.apiHost + '/v1/data/index?access-token=yVZzJtQPOMk_CrNe5KIk699XDVJYxwm__1466149559&stock='+stock + '&time='+time;
    if(time == 'now') {
      var parseDate = d3.time.format('%Y-%m-%d %H:%M:%S').parse;
      //var parseDate = d3.time.format('%Y-%m-%d').parse;
    }else if(time == 'M1') {
      var parseDate = d3.time.format('%Y-%m-%d %H:%M:%S').parse;
    }/*else if(time == 'M5') {
      var parseDate = d3.time.format('%Y-%m-%d %H:%M').parse;
    }else if(time == 'M15') {
      var parseDate = d3.time.format('%Y-%m-%d %H:%M').parse;
    }*/
    // 设置数据
     //let url = './data/'+this.state.checkedStock + '-'+this.state.timeType + '.tsv';
    //var parseDate = d3.time.format('%Y-%m-%d').parse;
    //d3.tsv('./data/MSFT.tsv', function(err, data) {
    d3.tsv(url, function(err, data) {
      data.forEach((d, i) => {
        d.date = new Date(parseDate(d.date).getTime());
        d.open = +d.open;
        d.high = +d.high;
        d.low = +d.low;
        d.close = +d.close;
        d.volume = +d.volume;
        // console.log(d);
      });
      //console.log('异步加载data');
      //console.log(data);
      //console.log('异步加载data');
      this.setState({data:data});
    }.bind(this));
  }
  /*componentWillMount(){
    this.setData();
  }*/
  componentDidMount(){
    this.setData();
  }

  /**
   * 修改state值
   * @param key
   * @param value
   */
  changeState(key,value){
    let state = this.state;
    eval('state.'+ key +' = "'+value+'";');
    this.setState(state);
  }

  /**
   * 获得K线主体部分
   * 主要处理不同的K线显示问题
   */
  getContent(){
    if(this.state.data.length ==0){
      const refresh = {
          display: 'inline-block',
          position: 'relative'
        };
      return <RefreshIndicator
        size={50}
        left={70}
        top={0}
        loadingColor={"#FF9800"}
        status="loading"
        style={refresh}
      />
    }else{
      if(this.state.timeType == 'F1'){//分时点状线
        return  <LineAndScatterChart data={this.state.data} type="hybrid"/>
      }else{
        return  <CandleStickChartWithEdge data={this.state.data} type="hybrid"/>
      }

    }
  }
  render(){
    //console.log('StockCharts执行一次');
    let timeTypes = ['F1','M1'].map(timeType=>{
      return <TimeType key={timeType} name={timeType}  timeType={this.state.timeType} changeTimeType={this.changeTimeType} />
    });
    let products = this.props.products.map(x=> {
      return <StockChecked key={x} stock={x} checkedStock={this.state.checkedStock}
                           changeStock={this.changeStock}/>
    });
    let content = this.getContent();

    let style = {navTab: {margin:0, padding:0, 'listStyle':'none'}}

    return <div>
      <div>{products}</div>
      <div>{this.state.checkedStock}</div>
      <div style={{height:30}}><ul style={style.navTab}>{timeTypes}</ul></div>
      <div>{content}</div>
    </div>
  }
}
export default StockCharts;
