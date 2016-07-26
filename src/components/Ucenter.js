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
import {apiGet} from './Auth';
class Ucenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '/images/defaultAvatar.png',
      username: '',
      amount: 0,
      principal: 0,
      income: 0
    };
  }

  componentDidMount() {
    var apiCall = apiGet('/v1/user/get-amount', {});

    return apiCall.then(function (response) {
      return response.json();
    }).then(function (json) {
      console.log(json);
      if (json.status) {
        console.log('成功');
        this.setState(json.data);
        return true;
      } else {
        console.log('失败');
        return false;
      }
    }.bind(this));
  }

  render() {
    const style = {
      cardTitle: {
        width: '48%',
        padding: '16px 2px',
        float: 'left'
      },
      over: {width: '49%', background: 'rgba(0, 0, 0, 0.541176)', float: 'left', margin: '1px'},
      overLable: {'font-size': '18px', color: 'rgba(255, 255, 255, 0.541176)', display: 'block', 'line-height': '36px'},
      overContent: {'font-size': '20px', color: 'rgba(255, 255, 255, 0.870588)', display: 'block'}
    };
    return <div>
      <div style={{position: 'relative'}}>
        <div>
          <img src="/images/b.jpg"
               style={{'vertical-align': 'top', 'max-width': '100%', 'min-width': '100%', 'width': '100%'}}/>
        </div>
        <div style={{position: 'absolute', top: '0px',  bottom: '0px', right: '0px', left: '0px'}}>
          <div style={{height: '50%',position: 'relative','text-align':'center'}}>
            <div style={{position: 'absolute',bottom: '0px',width:'100%'}}>
              <div style={{position: 'relative',bottom: '0px',width:'40%',float:'left','text-align':'right'}}>
                <Avatar src={this.state.avatar} size={80}/>
              </div>
              <div style={{position: 'relative',bottom: '0px',width:'60%',float:'left','text-align':'left'}}>
                <span style={style.overLable}>{this.state.username}</span>
                <span style={style.overContent}>余额：{this.state.amount}元</span>
              </div>
            </div>
          </div>

          <div style={{height: '50%',position: 'relative','text-align':'center'}}>
            <div style={{position: 'absolute',bottom: '0px',width:'100%'}}>
              <div style={style.over}>
                <span style={style.overLable}>本金</span>
                <span style={style.overContent}>{this.state.principal}元</span>
              </div>
              <div style={style.over}>
                <span style={style.overLable}>收益</span>
                <span style={style.overContent}>{this.state.income}元</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul style={{margin:'0px 15px'}}>
        <Link to="/news"><ListItem linkUrl="" primaryText="交易记录" leftIcon={<ContentSend />}/></Link>
        <Link to="/help"><ListItem linkUrl="/user/SignOut" primaryText="持仓产品" leftIcon={<ContentDrafts />}/></Link>
        <Link to="/ucenter"><ListItem linkUrl="/user/SignOut" primaryText="修改密码" leftIcon={<ContentSend />}/></Link>
        <Link to="/user/SignOut"><ListItem linkUrl="/user/SignOut" primaryText="退出账户"
                                           leftIcon={<ContentDrafts />}/></Link>
      </ul>
    </div>
  }
}
export default Ucenter;
