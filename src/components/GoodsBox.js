/**
 * Created by david_fang on 2016/6/7.
 */
import React from 'react';
import {Table, TableBody,  TableRow} from 'material-ui/Table';

import Price from './Price';
class GoodsBox extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){//console.log('GoodsBox执行一次');
    //console.log(this.props.stocks);
    //console.log(this.props.last);
    var items = [];
    for (var symbol in this.props.stocks) {
      //console.log('股票股票symbol');
      //console.log(symbol);
      var stock = this.props.stocks[symbol];
      //console.log('items.push'+stock.symbol);
      items.push(<Price key={stock.symbol} stock={stock} last={this.props.last} />);
    }
    return   <Table>
        <TableBody  displayRowCheckbox={false}>
          <TableRow selectable={false}>
            {items}
          </TableRow>
        </TableBody>
      </Table>
  }
}
export default GoodsBox;
