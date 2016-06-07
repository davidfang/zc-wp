/**
 * Created by david_fang on 2016/6/7.
 */
import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

import Avatar from 'material-ui/Avatar';

import RaisedButton from 'material-ui/RaisedButton';

class Head extends React.Component{
  render(){
    let style = {
      margin: 12
    };
    return <AppBar
      title="资金：9000元"
      iconElementLeft={<IconButton><Avatar src="images/yeoman.png" /></IconButton>}
      iconElementRight={
        <RaisedButton label="充值" fullWidth={true} linkButton={true} style={style} />
      }
    />
  }
}
export default Head;
