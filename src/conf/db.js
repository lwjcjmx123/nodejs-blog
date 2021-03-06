const env = process.env.NODE_ENV

let MYSQL_CONF

if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'long',
        port: '3306',
        database: 'blog'
    }
}

// 正式环境的配置可以放在gitignore里
if (env === 'production') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'long',
        port: '3306',
        database: 'blog'
    }
}

module.exports = {
    MYSQL_CONF
}