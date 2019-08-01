'use strict';
/**
 * 用户相关接口
 */
const { Controller } = require("egg");

class UserController extends Controller {
  /**
   * 获取当前用户信息
   */
  async currentUser() {
    const { ctx, service } = this;
    try {
      const res = await service.user.currentUser();
      ctx.logger.info('[controller.user]: 获取用户详情成功');
      ctx.body = res;
    } catch(e) {
      ctx.logger.error('[controller.user]: 获取用户详情失败', JSON.stringify(e));
      throw new Error(e);
    }
  }
  /**
   * 更新当前用户
   */
  async updateUser() {
    const { ctx, service, app } = this;
    try {
      const { validator } = app;
      const params = Object.assign({ userId: ctx.state.userId }, ctx.request.body);
      ctx.logger.info('[controller.user]: params = ', params);
      ctx.validate(validator.user.update, params);
      const res = await service.user.updateUser(params);
      ctx.logger.info('[controller.user]: 更新用户列表成功');
      ctx.body = res;
    } catch(e) {
      ctx.logger.error('[controller.user]: 更新用户列表失败', JSON.stringify(e));
      throw new Error(e);
    }
  }
   /**
   * 获取用户列表
   */
  async getUserList() {
    const { ctx, service } = this;
    try {
      const res = await service.user.getUserList();
      ctx.logger.info('[controller.user]: 获取用户列表成功');
      ctx.body = res;
    } catch(e) {
      ctx.logger.error('[controller.user]: 获取用户列表失败', JSON.stringify(e));
      throw new Error(e);
    }
  }

  /**
   * 获取PK列表
   */
  async getCardList() {
    const { ctx, service, app } = this;
    try {
      const { validator } = app;
      const params = { userId: ctx.state.userId};
      ctx.validate(validator.user.payload, params);
      const res = await service.user.getCardList(params);
      ctx.logger.info('[controller.user]: 获取PK用户列表成功');
      ctx.body = res;
    } catch(e) {
      ctx.logger.error('[controller.user]: 获取PK用户列表失败', JSON.stringify(e));
      throw new Error(e);
    }
  }
}

module.exports = UserController;