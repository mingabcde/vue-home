
const express = require('express')
const ejs = require('ejs')
// 引入express-session中间件
const expressSession = require('express-session')
// 接收json格式的body数据
const bodyParser = require('body-parser')

let { STATICS } = require('./index.js')
module.exports = app => {
    // ejs设置支持HTML文件
    app.engine('.html', ejs.__express)
    // 使用中间件
    app.use(expressSession({
        secret: 'cjmqianduanxuexi',
        resave: true,
        saveUninitialized: false
    }))
    // 配置json数据接收
    app.use(bodyParser.json())
    
    // // 静态化配置
    // app.use('/static/', express.static('./static/'))
    // // app.use('/', express.static('./'))
    // app.use('/favicon.ico', express.static('./static/favicon.ico'))

    // key 是配置的，STATICS[key]是静态化的目录
    for(key in STATICS) {
        app.use(key, express.static(STATICS[key]))
    }
}