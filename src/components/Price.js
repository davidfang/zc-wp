/**
 * Created by david_fang on 2016/6/9.
 */
import React from 'react';
import { red500, lightGreen500} from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
import { TableRowColumn} from 'material-ui/Table';

class Price extends React.Component{
  render(){
    let styles = {
      up:{
        color:'white',
        background:red500,
        border: 'solid 1px #607D8B'
      },
      down:{
        color: 'white',
        background:lightGreen500,
        border: 'solid 1px #607D8B'
      }
    };
    return <TableRowColumn style={styles.up}>
      <span>白银  <big>3100</big></span>
      <FontIcon className="material-icons" style={styles.up} >trending_up</FontIcon>
      0.3
    </TableRowColumn>
  }
}
export default Price;
