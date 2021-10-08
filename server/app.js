const express = require('express')

let app = express();

// 引入中间件
let middleware = require('./conf/middleware.js')
// 引入路由
let router = require('./router')

middleware(app);
router(app)

// 引入mock数据
// let mock = require('./router/mock.js')
// mock(app)

let server = require('./server')
// 安装服务器
server(app)