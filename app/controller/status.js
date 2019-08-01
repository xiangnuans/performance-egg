'use strict';

/*
 * 包括：此接口用于线上服务的健康检查
 */

const { Controller } = require('egg');

class StatusController extends Controller {
  /**
   * 服务健康检查
   */
  async check() {
    const { ctx } = this;
    try {
      ctx.logger.info('[service is checked, it\'s ok.]');
      ctx.body = '[service is checked, it\'s ok.]';
    } catch (e) {
      ctx.logger.warn('[service is checked with err]', JSON.stringify(e));
      throw new Error(`[service is checked with err]: ${e}`);
    }
  }

  /**
   * 数据库健康检查
   */
  async checkMysql() {
    const { ctx, service } = this;
    try {
      await service.status.checkMysql();
      ctx.logger.info('[db is checked, it\'s ok.]');
      ctx.body = '[db is checked, it\'s ok.]';
    } catch (e) {
      ctx.logger.error('[db is checked, it\'s disconnect]');
      throw new Error(`[db is checked, it disconnect]: ${e}`);
    }
  }
}

module.exports = StatusController;
