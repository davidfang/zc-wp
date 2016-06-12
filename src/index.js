import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './components/Main';
injectTapEventPlugin();


var d3 = require('d3');
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
});
