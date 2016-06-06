import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import FootComponent from './FootComponent';

class Main extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
        <AppBar title="小微盘" />
        <FootComponent />
          </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
