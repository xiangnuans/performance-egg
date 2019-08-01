'use strict';

const {
  KEYS,
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  URL,
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
  url: URL,
}
