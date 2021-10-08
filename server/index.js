module.exports = {
    // http和https端口号
    HTTP_PORT: 3000,
    HTTPS_PORT: 3001,
    // 指令执行路径
    ROOT: process.cwd(),
    // 静态化配置
    STATICS: {
        '/static/': './static/',
        '/favicon.ico': './static/favicon.ico'
    },
    // 数据库地址
    DBADRESS: 'mongodb://localhost:27017/',
    // 库名
    DBNAME: 'data-vue',
    // 错误消息
    MESSAGE: {
        // 成功
        success: {errno: 0, msg: 'success'},
        // 数据库
        databaseError: {errno: 1, msg: '数据库连接错误'},
        //插入
        collectionInsertError: {errno: 2, msg: '数据插入错误'},
        collectionInsertNoData: {errno: 3, msg: '没有插入数据'},
        // 删除
        collectionDeletError: {errno: 4, msg: '数据删除错误'},
        collectionDeletNoData: {errno: 5, msg: '没有删除数据'},
        // 改
        collectionUpdateError: {errno: 6, msg: '更新数据错误'},
        collectionUpdateNoData: {errno: 7, msg: '没有更新数据'},
        // 查询
        collectionFindError: {errno: 8, msg: '查询数据错误'},
        collectionFindNoData: {errno: 9, msg: '没有数据了，请上翻页码'},

        // 用户登录错误
        loginError: {errno: 10, msg: '用户名或密码错误'},
        // 没有登录
        notLogin: {errno: 11, msg: '用户没有登录'},
        // 文件缓存错误
        fileCacheError: {errno: 12, msg: '上传失败'},
        // 文件存储错误
        fileSaveError: {errno: 12, msg: '上传失败'}
    },
    // 上传图片缓存地址
    UPLOAD_CACHE_DIR: '/cache/upload/',
    // 上传图片存储地址
    UPLOAD_SAVE_DIR: '/static/upload/'
    

}