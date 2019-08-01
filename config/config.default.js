'use strict';

const path = require('path');

module.exports = (appInfo) => {
  const config = {
    env: appInfo.env,
    name: 'performance-node',
    keys: 'my-cookie-secret-key',
    debug: true,
  };
  config.logger = {
    outputJSON: true,
    level: 'DEBUG',
    consoleLevel: 'DEBUG',
  };
  config.sequelize = {
    host: 'rm-bp171b759ha99x5wfso.mysql.rds.aliyuncs.com',
    port: 3306,
    user: 'root',
    password: 'HPGQEhutFBUCi8ZE8JYgWDwZVhAHXWJx',
    database: 'performance',
    dialect: 'mysql',
    operatorsAliases: false,
    timezone: '+08:00',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 1000,
      connectionLimit: 10,
      dateStrings: true,
    },
  };
  config.middleware = [ 'auth' ];
  config.bodyParser = {
    enableTypes: ['json', 'form'],
    formLimit: '2mb',
    jsonLimit: '3mb',
  };
  config.joi = {
    options: {},
    locale: {
      'zh-cn': {},
    },
    // 校验出错时是否自动抛出错误
    throw: true,
    // throw为true时对抛出的错误做格式化处理
    throwHandle: (error) => error,
    // throw为false时错误会作为结果返回， 默认{error, value}，此函数可以对错误做格式化
    errorHandle: (error) => error,
    // 对返回结果做处理的函数，默认返回结果{ error, value }
    resultHandle: (result) => result,
  };
  config.security = {
    csrf: false,
  };
  config.thirdUrl = {
    host: 'http://api.test.weidiango.com',
  };
  config.view = {
    root: path.join(appInfo.baseDir, 'app/view'),
    mapping: {
      '.html': 'nunjucks',
    },
  };
  config.assets = {
    publicPath: '/public',
    url: 'http://127.0.0.1',
    devServer: {
      autoPort: true,
      command: 'cross-env MOCK=none umi dev --port={port}',
      env: {
        APP_ROOT: path.join(__dirname, '../app/web'),
        BROWSER: 'none',
        SOCKET_SERVER: 'http://127.0.0.1:{port}',
      },
      debug: true,
    },
  };
  return config;
};
