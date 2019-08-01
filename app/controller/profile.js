'use strict';
/**
 * 个人详情
 */
const { Controller } = require("egg");

class ProfileController extends Controller {
  /**
   * 获取单个用户图
   */
  async getProfile() {
    const { ctx, service, app } = this;
    try {
      const { validator } = app;
      const params = ctx.query;
      ctx.validate(validator.profile.profile, params);
      const res = await service.profile.getProfile(params);
      ctx.logger.info('[controller.user]: 获取单个用户chart数据');
      ctx.body = res;
    } catch(e) {
      ctx.logger.error('[controller.profile]: 获取单个用户chart失败', JSON.stringify(e));
      throw new Error(e);
    }
  }
  /**
   * 获取PK用户图
   */
  async getVSProfile() {
    const { ctx, service, app } = this;
    try {
      const { validator } = app;
      const params = ctx.query;
      ctx.validate(validator.profile.vsprofile, params);
      const res = await service.profile.getVSProfile(params);
      ctx.logger.info('[controller.user]: 获取多个用户chart数据');
      ctx.body = res;
    } catch(e) {
      ctx.logger.error('[controller.profile]: 获取单多个用户chart数据失败', JSON.stringify(e));
      throw new Error(e);
    }
  }
  /**
   * 获取单个用户基本信息
   */
  async getBasic() {
    const { ctx, service, app } = this;
    try {
      const { validator } = app;
      const params = ctx.query;
      ctx.validate(validator.profile.profile, params);
      const res = await service.profile.getBasic(params);
      ctx.logger.info('[controller.profile]: 获取单个用户基本数据');
      ctx.body = res;
    } catch(e) {
      ctx.logger.error('[controller.profile]: 获取单个用户基本数据失败', JSON.stringify(e));
      throw new Error(e);
    }
  }
  /**
   * 获取一个房间用户的基本信息
   */
  async getBasicList() {
    const { ctx, service, app } = this;
    try {
      const { validator } = app;
      const params = ctx.query;
      ctx.validate(validator.profile.vsprofile, params);
      const res = await service.profile.getBasicList(params);
      ctx.logger.info('[controller.user]: 获取多个用户基本数据');
      ctx.body = res;
    } catch(e) {
      ctx.logger.error('[controller.profile]: 获取多个用户基本数据失败', JSON.stringify(e));
      throw new Error(e);
    }
  }
}

module.exports = ProfileController;