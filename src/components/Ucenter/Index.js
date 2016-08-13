/**
 * Created by david_fang on 2016/6/24.
 */
import React from 'react';

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';


class Index extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleTouch = this.handleTouch.bind(this);
  }

  handleTouch(event: object, menuItem: object, index: number) {
    console.log(menuItem);
    if (menuItem.props.value == 'SignOut') {
      localStorage.removeItem('access-token');
      sessionStorage.removeItem('login');
      this.context.router.push('/user/SignIn');
    } else {
      this.context.router.push(menuItem.props.value);
    }

  }

  render() {

    return <Menu onItemTouchTap={this.handleTouch}>
          <MenuItem primaryText="交易记录" leftIcon={<RemoveRedEye />}  rightIcon={<ArrowDropRight />}/>
          <MenuItem primaryText="持仓产品" value="/ucenter/positions"  leftIcon={<PersonAdd />}  rightIcon={<ArrowDropRight />}/>
          <MenuItem primaryText="修改密码" leftIcon={<ContentLink />}  rightIcon={<ArrowDropRight />} />
          <Divider />
          <MenuItem primaryText="退出账户" value="SignOut" leftIcon={<ContentCopy />}  rightIcon={<ArrowDropRight />} />
          <MenuItem primaryText="Download" leftIcon={<Download />}  rightIcon={<ArrowDropRight />} />
          <Divider />
          <MenuItem primaryText="Remove" leftIcon={<Delete />}  rightIcon={<ArrowDropRight />} />
        </Menu>
  }
}
Index.contextTypes = {
  router: React.PropTypes.object.isRequired
}
export default Index;
