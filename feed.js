var interval,
    onChangeHandler;

var stocks = [
    /*{symbol: "GM", open: 38.87},
    {symbol: "GE", open: 25.40},
    {symbol: "MCD", open: 97.05},
    {symbol: "UAL", open: 69.45},
    {symbol: "WMT", open: 83.24},
    {symbol: "AAL", open: 55.76},
    {symbol: "LLY", open: 76.12},
    {symbol: "JPM", open: 61.75},*/
    {symbol: "白银", open: 47.84},
    {symbol: "原油", open: 46.50}
];

stocks.forEach(function(stock) {
    stock.close = stock.open;
    stock.high = stock.open;
    stock.low = stock.open;
});

function simulateChange() {

    var index = Math.floor(Math.random() * stocks.length),
        stock = stocks[index],

        maxChange = stock.open * 0.005,
        change = maxChange - Math.random() * maxChange * 2,
        close;

    change = Math.round(change * 100) / 100;
    change = change === 0 ? 0.01 : change;

    close = stock.close + change;

    if (close > stock.open * 1.15 || close < stock.open * 0.85)
    {
        change = -change;
        close = stock.close + change;
    }

    stock.change = change;
    stock.close = Math.round(close * 100) / 100;
    if (stock.close > stock.high) {
        stock.high = stock.close;
    }
    if (stock.close < stock.low) {
        stock.low = stock.close;
    }
  stock.date = '2015-07-01'
    onChangeHandler(stock.symbol, 'stock', stock);
}

function start(onChange) {
    onChangeHandler = onChange;
    interval = setInterval(simulateChange, 20000);
}

function stop() {
    clearInterval(interval);
}

exports.start = start;
exports.stop = stop;
