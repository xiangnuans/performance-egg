const { Controller } = require("egg");

/**
 * 首页相关接口
 */
 class ViewController extends Controller {
   /**
    * 获取所有团队列表
    */
   async getGroupList() {
     const { ctx, service } = this;
     try {
      const res = await service.view.getGroupList();
      ctx.logger.info('[controller.view]: 获取团队列表成功');
      ctx.body = res;
     } catch(e) {
      ctx.logger.error('[controller.view]:获取团队列表失败', JSON.stringify(e));
      throw new Error(e);
     }
   }
   /**
    * 获取总销售额
    */
   async getBase() {
     const { ctx, service, app } = this;
     try {
       const { validator } = app;
       const params = ctx.query;
       ctx.validate(validator.view.payload, params);
       const res = await service.view.getBase(params);
       ctx.logger.info('[controller.view]: 获取总销售额成功');
       ctx.body = { baseInfo: res };
     } catch(e) {
       ctx.logger.error('[controller.view]: 获取销售额失败', JSON.stringify(e));
       throw new Error(e);
     }
   }
   /**
    * 获取首页趋势图
    */
   async getChartData() {
    const { ctx, service, app } = this;
    try {
      const { validator } = app;
      const params = ctx.query;
      ctx.validate(validator.view.payload, params);
      const res = await service.view.getChartData(params);
      ctx.logger.info('[controller.view]: 获取趋势图成功');
      ctx.body = res;
    } catch(e) {
      ctx.logger.error('[controller.view]: 获取趋势图失败', JSON.stringify(e));
      throw new Error(e);
    }
  }
 }

 module.exports = ViewController;