var db = require('./database');
var interval,
  onChangeHandler;
var config = require('./devConfig');
var stocks = config.stocks;

/*var stocks = [
  {name: "白银", symbol: 'sliver'},
  {name: "原油", symbol: 'crude'}
];*/
function simulateChange() {
  stocks.map(function (stock) {
    db.redis(function (err, client) {
      if (err) {
        console.error(err.toString());
        return process.exit(1);
      }
      client.hgetall(stock.symbol + ':last',function (err,res)  {
        //console.log(res);
        var nowStock = {};
        nowStock.symbol = stock.symbol;
        nowStock.open = res.open;
        nowStock.close = res.close;
        nowStock.high = res.high;
        nowStock.low = res.low;
        nowStock.volume = res.volume;
        nowStock.date = res.date;
        nowStock.change = res.change;
        //console.log('redis取数据出来'+stock.symbol + stock.name);
        //console.log(res);
        //console.log(stock);
        onChangeHandler(stock.symbol, 'stock', nowStock);
      })
    })
  })
};
function addDate(date, days) {
  var d = new Date(date);
  d.setDate(d.getDate() + days);
  var month = d.getMonth() + 1;
  var day = d.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  var val = d.getFullYear() + "-" + month + "-" + day;
  return val;
}
function start(onChange) {
  onChangeHandler = onChange;
  interval = setInterval(simulateChange, 2000);
}

function stop() {
  clearInterval(interval);
}

exports.start = start;
exports.stop = stop;
