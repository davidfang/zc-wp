###使用注意

 1.安装依赖react react-dom，ui需要15.xxx版本，先装；
 2.安装stockcharts时会提示版本冲突，不用管它，这样在package.json里没有配置项，需要手工加上去才能在IDE开发中显示正常；
 3.安装stockcharts完，需要修改它的package.json，将它的react react-dom项依赖去掉，同时删除其node_modules中react react-dom，防止多个react造成访问冲突。

###配置
 1. /devConfig.js
 2. /src/config*


###问题
 1. 获取手机验证码的时候异步操作，错误时仍然显示倒计时；
 
