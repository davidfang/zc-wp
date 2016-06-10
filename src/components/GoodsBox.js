/**
 * Created by david_fang on 2016/6/7.
 */
import React from 'react';
import Divider from 'material-ui/Divider';
import {Table, TableBody,  TableRow} from 'material-ui/Table';

import GoodGroup from './GoodGroup';
import Price from './Price';
class GoodsBox extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    var items = [];
    for (var symbol in this.props.stocks) {
      var stock = this.props.stocks[symbol];
      items.push(<Price key={stock.symbol} stock={stock} last={this.props.last} />);
    }
    return   <div>
      <Table>
        <TableBody  displayRowCheckbox={false}>
          <TableRow selectable={false}>
            {items}
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
