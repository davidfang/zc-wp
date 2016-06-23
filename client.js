var db = require('./database');

db.redis(function (err, client) {
  if (err) {
    console.error(err.toString());
    return process.exit(1);
  }

  //console.log('open , high , low , close  ,change ,volume ,date');
  setInterval(function(){
    generateData (client,'sliver-last','sliver-realTime');
    generateData (client,'crude-last','crude-realTime')
  }, 800);


});
/**
 * 生成数据
 * @param client   Redis客户端实例化对象
 * @param lastHash  当前数据存放的hash
 * @param realTimeHash  分时数据存放的hash
 */
function generateData (client,lastHash,realTimeHash) {
  client.hgetall(lastHash, function (err, res) {
    if (err) {
      console.log('没取到初始数据');
      console.log(err.toString());
      return process.exit(1);
    }
    var now = new Date();
    if (res == null) {//初始化数据
      var startLast = {'open': 25, 'close': 24, 'high': 25.5, 'low': 23.5, 'volume': 243090, date: currentTime(now)};
      client.hmset('sliver-last', startLast, client.print);
      var startLast = {'open': 55, 'close': 54, 'high': 55.5, 'low': 53.5, 'volume': 243090, date: currentTime(now)};
      client.hmset('crude-last', startLast, client.print);
      console.log('startLast:');
	return ;
      //console.log(startLast);
      //return process.exit(2);
    }
    //console.log(res);
    //console.log(res.close);
    var stock = {};//股票当前价格信息
    var maxChange = res.close * 0.001;//每次波动最多万分之五
    stock.open = +res.close + maxChange * (1 - Math.random() * 2);//生成正负的随机波动值
    stock.close = +res.close + maxChange * (1 - Math.random() * 2);//生成正负的随机波动值
    stock.high = +res.close + maxChange * (1 - Math.random() * 2);//生成正负的随机波动值
    stock.low = +res.close + maxChange * (1 - Math.random() * 2);//生成正负的随机波动值


    if (stock.open > stock.high) {
      stock.open = stock.high;
    }
    if (stock.open < stock.low) {
      stock.open = stock.low;
    }
    if (stock.close > stock.high) {
      stock.close = stock.high;
    }
    if (stock.close < stock.low) {
      stock.close = stock.low;
    }
    stock.open = Math.floor(stock.open * 100) / 100;//格式化为只保留两位小数
    stock.close = Math.floor(stock.close * 100) / 100;//格式化为只保留两位小数
    stock.high = Math.floor(stock.high * 100) / 100;//格式化为只保留两位小数
    stock.low = Math.floor(stock.low * 100) / 100;//格式化为只保留两位小数
    stock.change = stock.close - res.close;
    stock.change = Math.floor(stock.change * 100) / 100;//格式化为只保留两位小数
    stock.date = currentTime(now);
    stock.adjclose = null;
    stock.volume = Math.floor(Math.random() * 90000 + 246000);
    //console.log(stock);

    last = ["open",
      stock.open, "close",
      stock.close, "high",
      stock.high, "low",
      stock.low, "change",
      stock.change, "date",
      stock.date, "volume",
      stock.volume
    ];
    //将股票当前信息定入
    client.hmset(lastHash, last, function (err, res) {
      if (err) {
        console.log('插入股票最后信息里错误');
        console.log(err.toString());
        return process.exit(3);
      }
    });//写入股票当前价格信息

    //写入分时K线所需要的数据
    var realTimeName = realTimeHash + '-now';//1秒数据集
    var time = currentTime(now);
    insertRealTime(client, realTimeName, stock, time);//插入数据
    //写入分时K线所需要的数据
    var realTimeName = realTimeHash + '-M1';//1分钟数据集
    var time = currentTime(now,1);
    insertRealTime(client, realTimeName, stock, time);//插入数据
  //写入分时K线所需要的数据
    var realTimeName = realTimeHash + '-M5';//5分钟数据集
    var time = currentTime(now,5);
    insertRealTime(client, realTimeName, stock, time);//插入数据
  //写入分时K线所需要的数据
    var realTimeName = realTimeHash + '-M15';//15分钟数据集
    var time = currentTime(now,15);
    insertRealTime(client, realTimeName, stock, time);//插入数据
  //写入分时K线所需要的数据
    var realTimeName = realTimeHash + '-H1';//1分钟数据集
    var time = currentTime(now,null,1);
    insertRealTime(client, realTimeName, stock, time);//插入数据

    //console.log(stock.open + ' ,' + stock.high + '  ,' + stock.low + ' ,' + stock.close + ' ,' + stock.change + ' ,' + stock.volume + ' ,' + stock.date);
    //return process.exit(2);
  })
}
/**
 * 写入股票当前价格信息
 * @param client  Redis客户端实例化对象
 * @param realTimeName 数据集名称 例：realTime-5m
 * @param stock 新的股票数据信息
 * @param time 时间 用来做KEY存放数据的，比方说5分钟线会存 2016-06-16 17:40   2016-06-16 17:45
 * 注意 不同time的要存放到对应的realTimeName 数据集里面
 */
function insertRealTime(client, realTimeName, stock, time) { //
  client.hget(realTimeName, time, function (err, res) {//先获取最新的数据比对
    if (err) {
      console.log('查询股票分时信息里时错误');
      console.log(err.toString());
      return process.exit(5);
    }
    if (res == null) {//第一次查不到数据的时候先将这个数据插进去
      //最新价格格式为：date	open	high	low	close	volume	adjclose
      var newStock = [
        stock.date,stock.open,stock.high	,stock.low	,stock.close	,stock.volume	//,stock.adjclose
      ];

      //client.hmset(realTimeName, time, JSON.stringify(stock), function (err, res) {
      client.hmset(realTimeName, time, newStock.join('\t'), function (err, res) {
        if (err) {
          console.log('插入股票分时信息里时错误');
          console.log(err.toString());
          return process.exit(4);
        }
      });
      client.zadd(realTimeName+'-zset', (new Date()).valueOf(),time);
    } else {//查到数据的情况下，要跟老数据比对，处理完再插进去
      /*var oldStock = JSON.parse(res);

      //最高价
      oldStock.high = stock.high > oldStock.high ? stock.high : oldStock.high;
      //最低价
      oldStock.low = stock.low < oldStock.low ? stock.low : oldStock.low;
      oldStock.close = stock.close;//收盘价
      oldStock.change = Math.floor((oldStock.close - oldStock.open)*100)/100;//变动值
      oldStock.volume = 0 + oldStock.volume + stock.volume;//成交量
      //插入最新的数据
      client.hmset(realTimeName, time, JSON.stringify(oldStock), function (err, res) {
      */
      //console.log(res);
      var oldStock = res.split('\t');
      //最新价格格式为：date	open	high	low	close	volume	adjclose

      //最高价
      oldStock[2] = stock.high > oldStock[2] ? stock.high : oldStock[2];
      //最低价
      oldStock[3] = stock.low < oldStock[3] ? stock.low : oldStock[3];
      oldStock[4] = stock.close;//收盘价
      //oldStock.change = Math.floor((oldStock.close - oldStock.open)*100)/100;//变动值
      oldStock[5] = parseInt(oldStock[5]) + stock.volume;//成交量
      //插入最新的数据
      client.hmset(realTimeName, time, oldStock.join('\t'), function (err, res) {
        if (err) {
          console.log('插入股票分时信息里时错误');
          console.log(err.toString());
          return process.exit(5);
        }
        client.zadd(realTimeName+'-zset',(new Date()).valueOf(), time);
      });
    }
  });
}

/**
 * 初始化生成时间 例如：分钟线只到分钟，5分钟线会生成5分钟为单位的分，小时线会只有小时
 * 若要显示秒:当前日期加时间(如:2009-06-12 12:00:00)，只需要输入now，其它都不输入
 * @param now 当前时间 为保证时间一致，只初始化一次Date var now = new Date();
 * @param m 分钟线（保证能除尽）如5分钟线输5即可
 * @param h 小时线（保证能除尽） 如1小时线输1即可
 * @param d 日线（保证能除尽） 如10日线输10即可
 * @param mh 月线（保证能除尽）如3月线输3即可
 * @param y 年线（保证能除尽）如年线输1即可
 * @returns {*}
 */
function currentTime(now , m, h, d , mh, y) {
  //var now = new Date();
  var year = now.getFullYear();       //年
  var month = now.getMonth() + 1;     //月
  var day = now.getDate();            //日
  var hh = now.getHours();            //时
  var mm = now.getMinutes();          //分
  var ss = now.getSeconds();          //秒

  var year = (y == null) ? year : Math.floor(year / y);       //年
  var month = (mh == null) ? month : Math.floor(month / mh);      //月
  var day = (d == null) ? day : Math.floor(day / d);            //日
  var hh = (h == null) ? hh : Math.floor(hh / h);            //时
  var mm = (m == null) ? mm : Math.floor(mm / m);          //分

  if (y != null) {
    return year;
  }
  var clock = year + "-";

  if (month < 10)
    clock += "0";
  clock += month;

  if (mh != null) {
    return clock;
  }
  clock += "-";
  if (day < 10)
    clock += "0";

  clock += day;
  if (d != null) {
    return clock;
  }
  clock += " ";
  if (hh < 10)
    clock += "0";

  clock += hh;
  if (h != null) {
    return clock;
  }
  clock += ":";
  if (mm < 10) clock += '0';
  clock += mm;
  if (m != null) {
    return clock;
  }
  clock += ":";
  if (ss < 10) clock += '0';
  clock += ss;
  return (clock);
}


//var express = require('express'),
//  app = express(),
//  path = require('path'),
//  http = require('http').Server(app),
var io = require('socket.io')(8080),
  feed = require('./feed');

//app.use(express.static(path.join(__dirname, './src')));

io.on('connection', function (socket) {
  console.log('用户连接成功 Socket id %s', socket.id);
  socket.on('join', function (rooms) {
    console.log('Socket %s 用户加入 to %s', socket.id, rooms);
    if (Array.isArray(rooms)) {
      rooms.forEach(function(room) {
        socket.join(room);
      });
    } else {
      socket.join(rooms);
    }
  });

  socket.on('leave', function (rooms) {
    console.log('Socket %s 用户离开 from %s', socket.id, rooms);
    if (Array.isArray(rooms)) {
      rooms.forEach(function(room) {
        socket.leave(room);
      });
    } else {
      socket.leave(rooms);
    }
  });

  socket.on('disconnect', function () {
    //console.log('User disconnected. %s. Socket id %s', socket.id);
    console.log('用户失去连接. %s. Socket id %s', socket.id);
  });
});

feed.start(function(room, type, message) {
  io.to(room).emit(type, message);
  //console.log(room, type);
});


/*http.listen(3000, function () {
 console.log('listening on: 3000');
 });*/
