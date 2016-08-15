/**
 * Created by david_fang on 2016/6/24.
 */
import React from 'react';

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import Divider from 'material-ui/Divider';
import MonetizationOn from 'material-ui/svg-icons/editor/monetization-on';
import List from 'material-ui/svg-icons/action/list';
import ViewList from 'material-ui/svg-icons/action/view-list';
import Payment from 'material-ui/svg-icons/action/payment';
import Lock from 'material-ui/svg-icons/action/lock';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';


class Index extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleTouch = this.handleTouch.bind(this);
  }

  handleTouch(event:object, menuItem:object, index:number) {
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

    return <Menu style={{width:'96%'}} onItemTouchTap={this.handleTouch}>
      <MenuItem primaryText="交易记录" leftIcon={<ViewList />} rightIcon={<ArrowDropRight />}/>
      <MenuItem primaryText="持仓产品" value="/ucenter/positions" leftIcon={<RemoveRedEye />} rightIcon={<ArrowDropRight />}/>
      <Divider />
      <MenuItem primaryText="充值" leftIcon={<MonetizationOn />} rightIcon={<ArrowDropRight />}/>
      <MenuItem primaryText="提现" leftIcon={<Payment />} rightIcon={<ArrowDropRight />}/>
      <MenuItem primaryText="资金流水" leftIcon={<List />} rightIcon={<ArrowDropRight />}/>
      <Divider />
      <MenuItem primaryText="修改密码" value="/ucenter/changePassWord" leftIcon={<Lock />}
                rightIcon={<ArrowDropRight />}/>
      <MenuItem primaryText="退出账户" value="SignOut" leftIcon={<ExitToApp />} rightIcon={<ArrowDropRight />}/>

    </Menu>
  }
}
Index.contextTypes = {
  router: React.PropTypes.object.isRequired
}
export default Index;
