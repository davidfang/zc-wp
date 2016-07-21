/**
 * Created by david_fang on 2016/6/7.
 */
import React from 'react';
import AppBar from 'material-ui/AppBar';

import Avatar from 'material-ui/Avatar';

import RaisedButton from 'material-ui/RaisedButton';
var config = require('config').default;
class Head extends React.Component{
  render(){
    return <AppBar
      title={config.appName}
      iconElementLeft={<Avatar src="images/yeoman.png" />}
      iconElementRight={
        <RaisedButton label="充值" fullWidth={true} linkButton={true}  />
      }
    />
  }
}
export default Head;
