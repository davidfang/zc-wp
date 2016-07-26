/**
 * Created by david_fang on 2016/6/7.
 */
import React from 'react';

class Good extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    let style = {
      height: 70
    }
    return <div style={style}>
      <small>白银 20g</small>
      <div><strong>100元/手</strong></div>
      <small>波动盈浮：5元</small>
    </div>
  }
}
export default Good;
