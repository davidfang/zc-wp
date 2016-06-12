/**
 * Created by david_fang on 2016/6/9.
 */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class StockChecked extends React.Component {
  constructor(props) {
    super(props);
    this.changeStockCharts = this.changeStockCharts.bind(this)
  }
  changeStockCharts() {
    this.props.changeStockCharts(this.props.stock);
  }
  render() {
    const style = {
      margin: 12,
    };
    if (this.props.stock != this.props.checkedStock) {
      return <RaisedButton onClick={this.changeStockCharts} label={this.props.stock} primary={true} style={style}/>
    }else{
      return <RaisedButton label={this.props.stock} disabled={true} style={style}/>
    }
  }
}

export default StockChecked;
