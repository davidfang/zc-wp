/**
 * Created by david_fang on 2016/6/24.
 */
import React from 'react';
import {Link} from 'react-router'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';

import {List, ListItem} from 'material-ui/List';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import {apiGet} from './../Auth';
class Index extends React.Component {
  constructor(props) {
    super(props);
    
  }



  render() {

    return <ul style={{margin:'0px 15px'}}>
        <Link to="/news"><ListItem linkUrl="" primaryText="交易记录" leftIcon={<ContentSend />}/></Link>
        <Link to="/help"><ListItem linkUrl="/user/SignOut" primaryText="持仓产品" leftIcon={<ContentDrafts />}/></Link>
        <Link to="/ucenter"><ListItem linkUrl="/user/SignOut" primaryText="修改密码" leftIcon={<ContentSend />}/></Link>
        <Link to="/user/SignOut"><ListItem linkUrl="/user/SignOut" primaryText="退出账户"
                                           leftIcon={<ContentDrafts />}/></Link>
      </ul>
  }
}
export default Index;
