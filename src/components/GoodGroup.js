/**
 * Created by david_fang on 2016/6/7.
 */
import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import Good from './Good';
class GoodGroup extends React.Component{
  render(){
    let style = {
        height: 140,
        width: '30%',
        margin: 5,
        textAlign: 'center',
        display: 'inline-block'
    };
    return   <Paper style={style}>
      <RaisedButton style={{width: '100%'}} label="买涨" secondary={true} fullWidth={true}  />
      <Good />
      <RaisedButton style={{width: '100%'}} label="买跌" primary={true} fullWidth={true} />
    </Paper>
  }
}
export default GoodGroup;
