/**
 * Created by david_fang on 2016/6/24.
 */
import React from 'react';
class SelectInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name:this.props.name,value:0,valueStr:'无'}
    this.handleUp = this.handleUp.bind(this);
    this.handleDown = this.handleDown.bind(this);
  }

  /**
   * 增加
   */
  handleUp(){
    if(this.state.value !=50) {
      let value = this.state.value + 10;
      this.setState({value: value,valueStr:value+'%'});
    }
  }
  /**
   * 减少
   */
  handleDown(){
    if(this.state.value !=0) {
      let value = this.state.value - 10;
      if(value == 0){
        this.setState({value: value, valueStr: '无'});
      }else {
        this.setState({value: value, valueStr: value + '%'});
      }
    }
  }
  render() {
    let style = {
      left:{
        width:'10px',
        borderColor:this.props.color,
        border:'solid 1px',
        padding:'5px'
      },
      center:{
        width:'20px',
        borderColor:this.props.color,
        padding:'5px 20px',
        borderBottom:'solid 1px',
        borderTop:'solid 1px'
      },
      right:{
        width:'10px',
        borderColor:this.props.color,
        border:'solid 1px',
        padding:'5px'
      }
    }
    return <div>
      <input type="hidden" name={this.state.name} id={this.state.name} value={this.state.value}/>
      <span style={style.left} onClick={this.handleDown}>-</span><span style={style.center}>{this.state.valueStr}</span><span style={style.right} onClick={this.handleUp}>+</span>(范围0-50%)
    </div>
  }
}
export default SelectInput;
