/**
 * Created by david_fang on 2016/6/24.
 */
import React from 'react';

class SignOut extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    localStorage.removeItem('access-token');
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
