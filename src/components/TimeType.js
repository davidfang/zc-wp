/**
 * Created by david_fang on 2016/6/9.
 */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class TimeType extends React.Component {
  constructor(props) {
    super(props);
    this.changeTimeType = this.changeTimeType.bind(this)
  }
  /**
   * 变更时间类型
   */
  changeTimeType() {
    this.props.changeTimeType(this.props.name);
  }
  render() {
    const style = {
      li:{
        width:'10.83%',
        background:'#919191',
        overflow:'hidden',
        height:30,
        float:'left',
        'line-height':30,
        border:'1 solid #6e6e6e',
        'border-left':'none',
        color:'#e5e5e5',
        'font-size':'10px',
        'text-align':'center'
      },
      'liActiv':{
        width:'10.83%',
        background:'#404040',
        overflow:'hidden',
        height:30,
        float:'left',
        'line-height':30,
        border:'1 solid #6e6e6e',
        'border-left':'none',
        color:'#e5e5e5',
        'font-size':'10px',
        'text-align':'center'
      }
    };


      if (this.props.timeType != this.props.name ) {
        return <li onClick={this.changeTimeType}  style={style.li}>{this.props.name}</li>
      }else{
        return <li   style={style.liActiv}>{this.props.name}</li>
      }

  }
}

export default TimeType;
