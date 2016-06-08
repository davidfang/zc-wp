/**
 * Created by david_fang on 2016/6/7.
 */
import React from 'react';
import Divider from 'material-ui/Divider';
import {Table, TableBody,  TableRow, TableRowColumn} from 'material-ui/Table';
import { red500, lightGreen500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import ActionTrendingUp from 'material-ui/svg-icons/action/trending-up';
import ActionTrendingDown from 'material-ui/svg-icons/action/trending-down';
import Home from 'material-ui/svg-icons/action/home';

import GoodGroup from './GoodGroup';

class GoodsBox extends React.Component{
  render(){
    let styles = {
      up:{
        color:'white',
        background:red500
      },
      down:{
        color:'white',
        background:lightGreen500
      }
    }
    return   <div>
      <Table>
        <TableBody  displayRowCheckbox={false}>
          <TableRow selectable={false}>
            <TableRowColumn style={styles.up}><span>白银  <big>3100</big></span>
              <IconButton ><ActionTrendingUp color={red500}/>
              <Home></Home>
              </IconButton>
            </TableRowColumn>
            <TableRowColumn style={styles.down}><span>原油  <big>2800</big></span>
              <span ><ActionTrendingDown color={lightGreen500}/><i class="material-icons">trending_down</i></span>
            </TableRowColumn>
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
