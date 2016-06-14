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
    var openChange = stock.open *( Math.random()/10);
    openChange = openChange *  (1 - Math.random()  * 2);
    stock.open = stock.open + openChange;
    stock.close = stock.open;
    stock.high = stock.open;
    stock.low = stock.open;
});
var Idate =1;
function simulateChange() {
    var index = Math.floor(Math.random() * stocks.length),
        stock = stocks[index],

        maxChange = stock.open * 0.005,
        change = maxChange - Math.random() * maxChange * 2,
        close;

    //change = Math.round(change * 100) / 100;
    change = change === 0 ? 0.01 : change;

    close = stock.close + change;

    if (close > stock.open * 1.10 || close < stock.open * 0.90)
    {
        change = -change;
        close = stock.close + change;
      console.log('cccc');
    }

    stock.change = change;


    stock.high = stock.close + Math.random() * maxChange;
    stock.low = stock.close + Math.random() * maxChange;
    stock.close = Math.round(close * 100) / 100;
    if (stock.open > stock.high) {
        stock.high = stock.open;
    }
    if (stock.open < stock.low) {
        stock.low = stock.open;
    }
    if (stock.close > stock.high) {
          stock.high = stock.close;
      }
    if (stock.close < stock.low) {
        stock.low = stock.close;
    }
  stock.open = Math.floor(stock.open * 100)/100;//格式化为只保留两位小数
  stock.close = Math.floor(stock.close * 100)/100;//格式化为只保留两位小数
  stock.change = Math.floor(stock.change * 100)/100;//格式化为只保留两位小数
  stock.high = Math.floor(stock.high * 100)/100;//格式化为只保留两位小数
  stock.low = Math.floor(stock.low * 100)/100;//格式化为只保留两位小数

  Idate++;
  stock.date = addDate('2015-06-08',Idate);
  stock.adjclose = null;
  stock.volume = Math.floor(Math.random() * 5000000 + 24600000);
  onChangeHandler(stock.symbol, 'stock', stock);
}
function addDate(date,days){
  var d=new Date(date);
  d.setDate(d.getDate()+days);
  var month=d.getMonth()+1;
  var day = d.getDate();
  if(month<10){
    month = "0"+month;
  }
  if(day<10){
    day = "0"+day;
  }
  var val = d.getFullYear()+"-"+month+"-"+day;
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
