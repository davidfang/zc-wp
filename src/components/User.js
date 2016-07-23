/**
 * Created by david_fang on 2016/6/24.
 */
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


class User extends React.Component {

  constructor(props) {
    super(props);
  }
  render() {
    return <MuiThemeProvider muiTheme={getMuiTheme()}>
      {this.props.children}
    </MuiThemeProvider>
  }
}
export default User;
