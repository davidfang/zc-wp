import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Head from './Head';
import Body from './Body';
import Foot from './Foot';
class Main extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <Head />
          <Body />
          <Foot />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
