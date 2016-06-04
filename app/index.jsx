/**
 * Created by david_fang on 2016/6/5.
 */
import '../node_modules/bootstrap/scss/bootstrap.scss';
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component{
    constructor() {
        super();
    }
    render() {
        //JSX here!
        return (
            <div className="container">
            <section className="jumbotron">
            <h3 className="jumbotron-heading">Search Github Users</h3>
        </section>
        </div>
    )
    }
};

ReactDOM.render(<App />, document.getElementById('app'));