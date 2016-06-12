import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Head from './Head';
import Body from './Body';
import Foot from './Foot';
import CandleStickChart from '../lib/charts/CandleStickChart';

class Main extends React.Component {
  constructor(props) {
    super(props);
    console.log('this.props.data');
    console.log(this.props.data);
    console.log('this.props.data');
  }


  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <Head />
          <Body />
          <CandleStickChart data={this.props.data} type="hybrid" width={300}/>
          <Foot />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
