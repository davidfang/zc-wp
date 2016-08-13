/**
 * Created by david_fang on 2016/6/24.
 */
import React from 'react';
import Paper from 'material-ui/Paper';
class HelpDetail extends React.Component{
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
      <h2 style={style.time}>帮助中心标题</h2>
      <div>帮助中心详情详情详情帮助中心详情详情详情帮助中心详情详情详情帮助中心详情详情详情帮助中心详情详情详情帮助中心详情详情详情帮助中心详情详情详情帮助中心详情详情详情帮助中心详情详情详情</div>
    </Paper>
  }
}
HelpDetail.contextTypes = {
  router: React.PropTypes.object.isRequired
}
export default HelpDetail;
