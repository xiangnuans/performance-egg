'use strict';
/**
 * 通知相关接口
 */
const { Controller } = require("egg");

class NoticeController extends Controller {
  /**
   * 新增通知
   */
  async addNotice() {
    const { ctx, service, app } = this;
    try {
      const { validator } = app;
      const body = ctx.request.body;
      ctx.validate(validator.notice.add, body);
      const res = await service.notice.addNotice(body);
      ctx.logger.info('[controller.notice]: 添加通知', body);
      ctx.body = res;
    } catch(e) {
      ctx.logger.error('[controller.notice]: 添加通知失败', JSON.stringify(e));
      throw new Error(e);
    }
  }
  /**
   * 更新通知
   */
  async updateNotice() {
    const { ctx, service, app } = this;
    try {
      const { validator } = app;
      const params = Object.assign(ctx.params, ctx.request.body);
      ctx.validate(validator.notice.update, params);
      const res = await service.notice.updateNotice(params);
      ctx.logger.info('[controller.notice]: 更新通知：', params);
      ctx.body = res;
    } catch (e) {
      ctx.logger.error('[controller.notice]: 更新通知失败', JSON.stringify(e));
      throw new Error(e);
    }
  }
  /**
   * 获取通知
   */
  async getNoticeList() {
    const { ctx, service, app } = this;
    try {
      // const params = ctx.query;
      const params = { userId: ctx.state.userId };
      const { validator } = app;
      ctx.validate(validator.notice.get, params);
      const res = await service.notice.getNoticeList(params);
      ctx.logger.info('[controller.notice]: 获取通知：', params);
      ctx.body = res;
    } catch (e) {
      ctx.logger.error('[controller.notice]: 获取通知失败', JSON.stringify(e));
      throw new Error(e);
    }
  }
}

module.exports = NoticeController;