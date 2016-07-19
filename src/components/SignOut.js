/**
 * Created by david_fang on 2016/6/24.
 */
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Tabs, Tab} from 'material-ui/Tabs';

import SignIn from './SignIn';
import SignUp from './SignUp';
import Slider from 'material-ui/Slider';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  }
};
class SignOut extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    localStorage.removeItem('access_token');
    sessionStorage.setItem('login', 'n');
    this.context.router.push('/user/SignIn');
  }

  render() {
    return (
      <div />
    );
  }
}
SignOut.contextTypes = {
  router: React.PropTypes.object.isRequired
}
export default SignOut;
