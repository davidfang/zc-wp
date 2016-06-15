import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Head from './Head';
import Body from './Body';
import Foot from './Foot';
import CandleStickChartWithEdge from '../lib/charts/CandleStickChartWithEdge';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <Head />
          <Body/>

          <Foot />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
