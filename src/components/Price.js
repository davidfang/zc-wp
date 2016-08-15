/**
 * Created by david_fang on 2016/6/9.
 */
import React from 'react';
import {red500, lightGreen500} from 'material-ui/styles/colors';
import {TableRowColumn} from 'material-ui/Table';
import TrendingUp from 'material-ui/svg-icons/action/trending-up';
import TrendingDown from 'material-ui/svg-icons/action/trending-down';

class Price extends React.Component {
  render() {
    let styles = {
      up: {
        color: 'white',
        background: red500
      },
      down: {
        color: 'white',
        background: lightGreen500
      },
      iconUp: {
        color: red500,
        background: 'white',
        marginLeft: 15,
        marginRight: 15
      },
      iconDown: {
        color: lightGreen500,
        background: 'white',
        marginLeft: 15,
        marginRight: 15
      }
    };
    var trending ,
      lastStyle = {},
      icon = '',
      iconStyle = {};

    if (this.props.stock.change < 0) {
      lastStyle = styles.down;
      trending = <TrendingDown style={styles.iconDown} />
    } else if (this.props.stock.change >= 0) {
      lastStyle = styles.up;
      trending = <TrendingUp style={styles.iconUp}/>
    }


    return <TableRowColumn style={lastStyle}>
      <span>{this.props.stock.name} <big>{this.props.stock.close}</big></span>
      {trending}
      <i>{this.props.stock.change}</i>
    </TableRowColumn>
  }
}
export default Price;
