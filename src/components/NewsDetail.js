/**
 * Created by david_fang on 2016/6/24.
 */
import React from 'react';
import Paper from 'material-ui/Paper';
class NewsDetail extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    const style = {
      paper: {
        display: 'inline-block',
        float: 'left',
        width:'100%',
        hight:'100%',
        margin: '16px 32px 16px 0'
      },
      time: {
        textAlign:'center'
      }
    };
    return <Paper style={style.paper}>
      <h2 style={style.time}>新闻数据标题</h2>
      <div style={style.time}>时间：2016-8-12  15：30 周五</div>
      <div>新闻数据详情详情详情新闻数据详情详情详情新闻数据详情详情详情新闻数据详情详情详情新闻数据详情详情详情新闻数据详情详情详情新闻数据详情详情详情新闻数据详情详情详情新闻数据详情详情详情</div>
    </Paper>
  }
}
NewsDetail.contextTypes = {
  router: React.PropTypes.object.isRequired
}
export default NewsDetail;
