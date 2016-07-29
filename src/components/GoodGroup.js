/**
 * Created by david_fang on 2016/6/7.
 */
import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import Order from './Order';
import {Number,apiPost} from './Auth';
class GoodGroup extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      direction:1,//方向：1买涨 2买跌
      directionStr:'买涨'
    };
    this.handleOpenUp = this.handleOpenUp.bind(this);
    this.handleOpenDown = this.handleOpenDown.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleOpenUp(){
    this.setState({direction:1, open: true,directionStr:'买涨'});
  }
  handleOpenDown(){
    this.setState({direction:2 ,open: true,directionStr:'买跌'});
  }
  
  handleClose  ()  {
    this.setState({open: false});
  };

  render(){
    const style = {
          pager:{
        height: 140,
        width: '30%',
        margin: 5,
        textAlign: 'center',
        display: 'inline-block'
    },
      radioButton: {
        marginTop: 16,
      },
      div:{height: 70},
      dialogContent:{
        width: '100%',
        maxWidth: 'none'
      },
      actionsStyle:{
        textAlign:'center'
      }
    };

    return   <Paper style={style.pager}>
      <RaisedButton style={{width: '100%'}} label="买涨" secondary={true} fullWidth={true}   onTouchTap={this.handleOpenUp} />
      <div style={style.div}>
        <small>{this.props.name} {this.props.size}{this.props.unit}</small>
        <div><strong>{Number(this.props.stockOpen).mul(this.props.size)}元/手</strong></div>
        <small>波浮：{Number(this.props.change).mul(this.props.size)}元</small>
      </div>
      <RaisedButton style={{width: '100%'}} label="买跌" primary={true} fullWidth={true}   onTouchTap={this.handleOpenDown} />
      <Dialog contentStyle={style.dialogContent}
        title={this.state.directionStr+this.props.name }

        actionsContainerStyle={style.actionsStyle}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
        autoScrollBodyContent={true}
      >
        <Order handleClose={this.handleClose} direction={this.state.direction}  {...this.props} />
      </Dialog>
    </Paper>
  }
}
export default GoodGroup;
