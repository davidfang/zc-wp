/**
 * Created by david_fang on 2016/6/24.
 */
import React from 'react';
import {List, ListItem,MakeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

const SelectableList = MakeSelectable(List);
class News extends React.Component{
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

    this.context.router.push('/news/'+index);
  };
  render(){
    return <SelectableList
      value={0}
      onChange={this.handleRequestChange}
    >
        <Subheader>新闻数据中心</Subheader>
      <Divider />
        <ListItem
          primaryText="美国降息"
          secondaryText="美国发布降息通知"
          onNestedListToggle={this.nestedListToggle}
        />
      <Divider />
        <ListItem
          primaryText="美国发布失业率"
          secondaryText="美国发布最新的失业率信息，对大宗产品价格造成影响"
          onNestedListToggle={this.nestedListToggle}
        />
      <Divider />
      </SelectableList>
  }
}
News.contextTypes = {
  router: React.PropTypes.object.isRequired
}
export default News;
