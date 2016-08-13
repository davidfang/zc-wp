/**
 * Created by david_fang on 2016/6/24.
 */
import React from 'react';
import {List, ListItem,MakeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

const SelectableList = MakeSelectable(List);
class Help extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleRequestChange = this.handleRequestChange.bind(this);
  }

  /**
   * 请求处理
   * @param event
   * @param index
     */
  handleRequestChange  (event, index)  {
    this.setState({
      selectedIndex: index,
    });
    console.log(index);

    this.context.router.push('/help/'+index);
  };

  render() {
    const {
      location,
      onRequestChangeList
    } = this.props;
    return <SelectableList
      value={0}
      onChange={this.handleRequestChange}
    >
        <Subheader>帮助中心</Subheader>
        <Divider />
        <ListItem
          primaryText="入金"
          secondaryText="入金流程"
          value={11}
        />
        <Divider />
        <ListItem
          primaryText="提现"
          secondaryText="提现流程"
          value={21}
        />

        <Divider />
        <ListItem
          primaryText="操作"
          secondaryText="操作教程"
          value={21}
        />

        <Divider />
        <ListItem
          primaryText="使用指南"
          secondaryText="操作教程"
          value={21}
        />
        <Divider />
      </SelectableList>
  }
}
Help.contextTypes = {
  router: React.PropTypes.object.isRequired
}
export default Help;
