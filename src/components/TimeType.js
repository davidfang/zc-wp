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
    this.props.changeState('timeType',this.props.name);
  }
  render() {
    const style = {
      margin: 12
    };


      if (this.props.timeType != this.props.name ) {
        return <RaisedButton onClick={this.changeTimeType} label={this.props.name} primary={true} style={style}/>
      }else{
        return <RaisedButton  label={this.props.name} disabled={true} style={style}/>
      }

  }
}

export default TimeType;
