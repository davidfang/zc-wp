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
    console.log('this.props.data');
    console.log(this.props.data);
    console.log('this.props.data');
  }


  render() {
    let products = ['白银', '原油'];
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <Head />
          <Body  data={this.props.data} products={products}  />

          <Foot />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
