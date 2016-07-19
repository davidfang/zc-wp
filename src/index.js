import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link,IndexRoute ,browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import User from './components/User';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SignOut from './components/SignOut';
import Login from './components/Login';
import Main from './components/Main';
import Body from './components/Body';
import Ucenter from './components/Ucenter';
import News from './components/News';
import Help from './components/Help';
import {hasLogin,requireAuth,noAuth} from './components/Auth';
injectTapEventPlugin();



/*var d3 = require('d3');
var parseDate = d3.time.format('%Y-%m-%d').parse ;
d3.tsv('./data/MSFT.tsv', function(err, data) {
  data.forEach((d, i) => {
    d.date = new Date(parseDate(d.date).getTime());
    d.open = +d.open;
    d.high = +d.high;
    d.low = +d.low;
    d.close = +d.close;
    d.volume = +d.volume;
    // console.log(d);
  });
  ReactDOM.render(<Main data={data} />, document.getElementById('app'));
});*/
//ReactDOM.render(<Main  />, document.getElementById('app'));
ReactDOM.render((
  <Router history={browserHistory}>
    <Route onEnter={requireAuth} path="/" component={Main}>
      <IndexRoute component={Body} />
      <Route path="ucenter" component={Ucenter} />
      <Route path="news" component={News} />
      <Route path="help" component={Help} />
    </Route>
    <Route  path="/user/" component={User} >
      <IndexRoute onEnter={noAuth} component={SignUp} />
    <Route onEnter={noAuth}  path="SignUp" component={SignUp} />
    <Route onEnter={noAuth} path="SignIn" component={SignIn} />
    <Route onEnter={requireAuth} path="SignOut" component={SignOut} />
    </Route>
  </Router>
), document.getElementById('app'))
