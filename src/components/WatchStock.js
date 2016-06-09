/**
 * Created by david_fang on 2016/6/9.
 */
import React from 'react';


class WatchStock extends React.Component {
  constructor(props) {
    super(props);
    this.watchStock = this.watchStock.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {symbol: ''};
  }

  watchStock() {
    this.props.watchStockHandler(this.state.symbol);
    this.setState ({symbol: ''});
  }

  handleChange(event) {
    this.setState({symbol: event.target.value})  ;
  }

  render() {
    return (
      <div className="row">
        <p>Available stocks for demo: MCD, BA, BAC, LLY, GM, GE, UAL, WMT, AAL, JPM</p>
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Comma separated list of stocks to watch..."
                 value={this.state.symbol} onChange={this.handleChange}/>
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="button" onClick={this.watchStock}>
                          <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Watch
                        </button>
                    </span>
        </div>
      </div>
    );
  }
}
export default WatchStock;
