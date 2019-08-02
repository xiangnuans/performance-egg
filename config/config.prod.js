'use strict';

const {
  KEYS,
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env;

exports.logger = {
  dir: '/usr/local/app/logs',
};

exports.keys = KEYS || 'fjdklfjeiofndasaf-fdkJk';

exports.sequelize = {
  host: MYSQL_HOST,
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
};

exports.assets = {
  isLocalOrUnittest: false,
  devServer: {
    env: {
      SOCKET_SERVER: 'http://:{port}',
    },
    debug: false,
  },
};

