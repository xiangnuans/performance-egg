'use strict';

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async willReady() {
    // 初始化数据库
    await this.app.model.sync({ force: false });
    // 执行定时任务
    // await this.app.runSchedule('pk');
  }

  async serverDidReady() {
    this.app.logger.debug('debug info');
    this.app.logger.info(`============= env: ${this.app.config.env} =============`);

    // 错误捕获
    this.app.on('error', (err) => {
      this.app.logger.error('catch sys with err', JSON.stringify(err));
    });
  }
}

module.exports = AppBootHook;
