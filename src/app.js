import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
//import Main from './components/Main'; // Our custom react component


//import User from './components/User';
// import SignIn from './components/SignIn';
// import SignUp from './components/SignUp';
// import SignOut from './components/SignOut';
// import Body from './components/Body';
// import Ucenter from './components/Ucenter';
// import UcenterIndex from './components/Ucenter/Index';
// import ChangePassWord from './components/Ucenter/ChangePassWord';
// import UcenterPositions from './components/Ucenter/Positions';
// import News from './components/News';
// import NewsDetail from './components/NewsDetail';
// import Help from './components/Help';
// import HelpDetail from './components/HelpDetail';

import {hasLogin, noLogin, requireAuth, noAuth} from './components/Auth';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
//ReactDOM.render(<Main />, document.getElementById('app'));
ReactDOM.render((
  <Router history={browserHistory}>
    <Route onEnter={hasLogin}
           path="/"
      //component={Main}
           getComponent={(location, callback) => {
 require.ensure([], function (require) {
 callback(null, require('./components/Main').default);
 });
 }}

    >
      <IndexRoute
        getComponent={(location, callback) => {
       require.ensure([], function (require) {
       callback(null, require('./components/Body').default);
       });
       }}
      />
      <Route path="ucenter"
        //component={Ucenter}
             getComponent={(location, callback) => {
 require.ensure([], function (require) {
 callback(null, require('./components/Ucenter').default);
 });
 }}
      >
        <IndexRoute
          //component={UcenterIndex}
          getComponent={(location, callback) => {
 require.ensure([], function (require) {
 callback(null, require('./components/Ucenter/Index').default);
 });
 }}
        />
        <Route
          path="Positions"
          //component={UcenterPositions}
          getComponent={(location, callback) => {
 require.ensure([], function (require) {
 callback(null, require('./components/Ucenter/Positions').default);
 });
 }}
        />
        <Route
          path="ChangePassWord"
          //component={ChangePassWord}
          getComponent={(location, callback) => {
 require.ensure([], function (require) {
 callback(null, require('./components/Ucenter/ChangePassWord').default);
 });
 }}
        />
      </Route>
      <Route
        path="news"
        //component={News}
        getComponent={(location, callback) => {
 require.ensure([], function (require) {
 callback(null, require('./components/News').default);
 });
 }}
      />
      <Route
        path="news/:id"
        //component={NewsDetail}
        getComponent={(location, callback) => {
 require.ensure([], function (require) {
 callback(null, require('./components/NewsDetail').default);
 });
 }}
      />
      <Route
        path="help"
        //component={Help}
        getComponent={(location, callback) => {
 require.ensure([], function (require) {
 callback(null, require('./components/Help').default);
 });
 }}
      />
      <Route
        path="help/:id"
        //component={HelpDetail}
        getComponent={(location, callback) => {
 require.ensure([], function (require) {
 callback(null, require('./components/HelpDetail').default);
 });
 }}
      />
    </Route>
    <Route
      path="/user/"
      //component={User}
      getComponent={(location, callback) => {
 require.ensure([], function (require) {
 callback(null, require('./components/User').default);
 });
 }}
    >
      <IndexRoute
        onEnter={noLogin}
        //component={SignUp}
        getComponent={(location, callback) => {
 require.ensure([], function (require) {
 callback(null, require('./components/SignUp').default);
 });
 }}
      />
      <Route
        onEnter={noLogin}
        path="SignUp"
        //component={SignUp}
        getComponent={(location, callback) => {
 require.ensure([], function (require) {
 callback(null, require('./components/SignUp').default);
 });
 }}
      />
      <Route
        onEnter={noLogin}
        path="SignIn"
        //component={SignIn}
        getComponent={(location, callback) => {
 require.ensure([], function (require) {
 callback(null, require('./components/SignIn').default);
 });
 }}
      />
      <Route
        onEnter={hasLogin}
        path="SignOut"
        //component={SignOut}
        getComponent={(location, callback) => {
 require.ensure([], function (require) {
 callback(null, require('./components/SignOut').default);
 });
 }}
      />
    </Route>
  </Router>
), document.getElementById('app'))
