import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './components/Main';
injectTapEventPlugin();

const App = () => (
  <Main />
);


// Render the main component into the dom
ReactDOM.render(<App />, document.getElementById('app'));
