import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute ,browserHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './components/Main'; // Our custom react component



import User from './components/User';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SignOut from './components/SignOut';
import Body from './components/Body';
import Ucenter from './components/Ucenter';
import UcenterIndex from './components/Ucenter/Index';
import UcenterPositions from './components/Ucenter/Positions';
import News from './components/News';
import Help from './components/Help';

import {hasLogin,noLogin,requireAuth,noAuth} from './components/Auth';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
//ReactDOM.render(<Main />, document.getElementById('app'));
ReactDOM.render((
    <Router history={browserHistory}>
        <Route onEnter={hasLogin}   path="/" component={Main}>
            <IndexRoute component={Body} />
            <Route path="ucenter"  component={Ucenter} >
              <IndexRoute component={UcenterIndex} />
              <Route path="Positions" component={UcenterPositions} />
            </Route>
            <Route path="news" component={News} />
            <Route path="help" component={Help} />
        </Route>
        <Route  path="/user/" component={User} >
            <IndexRoute onEnter={noLogin} component={SignUp} />
            <Route onEnter={noLogin}  path="SignUp" component={SignUp} />
            <Route onEnter={noLogin} path="SignIn" component={SignIn} />
            <Route onEnter={hasLogin} path="SignOut" component={SignOut} />
        </Route>
    </Router>
), document.getElementById('app'))
