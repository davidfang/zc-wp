/**
 * Created by david_fang on 2016/6/7.
 */
import React from 'react';
import Divider from 'material-ui/Divider';
import {Table, TableBody,  TableRow} from 'material-ui/Table';

import GoodGroup from './GoodGroup';
import Price from './Price';
class GoodsBox extends React.Component{
  render(){
    return   <div>
      <Table>
        <TableBody  displayRowCheckbox={false}>
          <TableRow selectable={false}>
            <Price />
            <Price />
          </TableRow>
        </TableBody>
      </Table>
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
