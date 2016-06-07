/**
 * Created by david_fang on 2016/6/7.
 */
import React from 'react';
import Divider from 'material-ui/Divider';

import GoodGroup from './GoodGroup';

class GoodsBox extends React.Component{
  render(){
    return   <div>
      <GoodGroup />
      <GoodGroup />
      <GoodGroup />
      <Divider />
      <GoodGroup />
      <GoodGroup />
      <GoodGroup />
    </div>
  }
}
export default GoodsBox;
