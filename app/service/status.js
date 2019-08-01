'use strict';

const { Service } = require('egg');

class StatusService extends Service {
  async checkMysql() {
    const { ctx } = this;
    const SQL_CHECK = 'show tables;';
    const data = await ctx.model.query(SQL_CHECK);
    return data;
  }
}

module.exports = StatusService;
