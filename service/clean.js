var db = require('./database');
var config = require('./devConfig');
db.redis(function (err, client) {
  if (err) {
    console.error(err.toString());
    return process.exit(1);
  }
  //增加清理数据操作
   config.stocks.map(function(stock){
    cleanData (client,stock.symbol + ':last',stock.symbol + ':realTime');
     console.log(stock.symbol);
  });

});

/**
 * 清除数据
 * @param client   Redis客户端实例化对象
 * @param lastHash  当前数据存放的hash
 * @param realTimeHash  分时数据存放的hash
 */
function cleanData (client,lastHash,realTimeHash) {
  client.del(lastHash);
  client.del(realTimeHash+':now',realTimeHash+':now:zset');
  client.del(realTimeHash+':M1',realTimeHash+':M1:zset');
  client.del(realTimeHash+':M5',realTimeHash+':M5:zset');
  client.del(realTimeHash+':M15',realTimeHash+':M15:zset');
  client.del(realTimeHash+':H1',realTimeHash+':H1:zset');
}
