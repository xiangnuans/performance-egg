'use strict';

/**
 * 调用第三方服务接口
 */
const { Service } = require('egg');
const _ = require('lodash');

class ThirdService extends Service {
  /**
   * 获取所有团队列表
   * @param {*} data 
   */
  async getGroupList() {
    const { ctx, config } = this;
    try {
      const res = await ctx.curl(`${config.thirdUrl.host}/teamUserNetflow/selectByDepartmentId`, { 
        dataType: 'json'
      });
      ctx.logger.info('[service.third]: 获取团队列表');
      if (res.data.responseCode !== 200) {
        throw new Error(res);
      }
      return res.data;
    } catch (e) {
      ctx.logger.error('[service.third]: 获取团队列表失败', JSON.stringify(e));
      throw new Error("调用第三方接口失败");
    }
  }
  /**
  * GMV - 团队--(今日/昨日销售额) 或 (本月/上月销售额)
  * @body {}
  * @return value
  */
  async postTeamSale(data) {
    const { ctx, config } = this;
    try {
      const res = await ctx.curl(`${config.thirdUrl.host}/hourlyGMV/selectTeamSaleEveryDayOrMonth`, {
        method: 'POST', 
        dataType: 'json',
        contentType: 'json',
        data: data,
      });
      ctx.logger.info('[service.third]: 获取团队今日');
      if (res.data.responseCode !== 200) {
        throw new Error(res);
      }
      let value = 0;
      const list = res.data.data;
      if (!data.teamId) {
        list.map(item => value += item.amountgmv);
      }
      if (data.teamId && list.length === 1) {
        const obj = _.find(list, { teamId: data.teamId });
        value = obj? obj.amountgmv : 0;
      }
      return value;
    } catch(e) {
      ctx.logger.error('[service.third]: 获取团队销售额失败', JSON.stringify(e));
      throw new Error("调用第三方接口失败");
    }
  }
  /**
   * GMV - 团队成员--(今日/昨日总销售额) 或 （月总销售额）
   * @body {}
   * @return {}
   */
  async getUserSales(data) {
    const { ctx, config } = this;
    try {
      const res = await ctx.curl(`${config.thirdUrl.host}/hourlyGMV/selectUserSaleEveryDayOrMonth`, {
        method: 'POST',
        dataType: 'json',
        contentType: 'json',
        data: data,
      });
      if (res.data.responseCode !== 200) {
        throw new Error(res);
      }
      ctx.logger.info('[service.third]: 获取成员销售额');
      return res.data;
    } catch(e) {
      ctx.logger.error('[service.third]: 获取成员销售额失败', JSON.stringify(e));
      throw new Error("调用第三方接口失败");
    }
  } 
  /**
   * 获取个人日单笔最高销售额
   */
  async getDayHighSale(data) {
    const { ctx, config } = this;
    try {
      const res = await ctx.curl(`${config.thirdUrl.host}/hourlyGMV/selectUserMaxSaleEveryHour`, {
        method: 'POST',
        dataType: 'json',
        contentType: 'json',
        data: data,
      });
      if (res.data.responseCode !== 200) {
        throw new Error(res);
      }
      ctx.logger.info('[service.third]: 获取个人日单笔销售额最高');
      return (res.data.data.length > 0)? res.data.data[0].amountgmv : 0;
    } catch(e) {
      ctx.logger.error('[service.third]: 获取个人日单笔销售额最高失败', e);
      throw new Error("调用第三方接口失败");
    }
  }
  /**
  * 获取个人月单笔最高销售额
  */
  async getMonthHighSale(data) {
    const { ctx, config } = this;
    try {
      const res = await ctx.curl(`${config.thirdUrl.host}/hourlyGMV/selectUserMaxSaleEveryDay`, {
        method: 'POST',
        dataType: 'json',
        contentType: 'json',
        data: data,
      });
      if (res.data.responseCode !== 200) {
        throw new Error(res);
      }
      ctx.logger.info('[service.third]: 获取个人月单笔销售额最高');
      return (res.data.data.length > 0)? res.data.data[0].amountgmv : 0;
    } catch(e) {
      ctx.logger.error('[service.third]: 获取个人月单笔销售额最高失败', JSON.stringify(e));
      throw new Error("调用第三方接口失败");
    }
  }
  /**
   * 获取指定用户详情
   */
  async getUser(params) {
    const { ctx, config } = this;
    try {
      const res = await ctx.curl(`${config.thirdUrl.host}/teamUserNetflow/selectTeamUserList`, {
        method: 'post',
        dataType: 'json',
        contentType: 'json',
        data: params,
      });
      if (res.data.responseCode !== 200) {
        throw new Error(res);
      }
      return res.data.data[0];
    } catch (e) {
      ctx.logger.error('[service.third]: 获取用户详情失败', JSON.stringify(e));
      throw new Error(e);
    }
  }
  /**
   * 获取团队成员--（昨日/今日销售额（按小时））
   */
  async getDayHour(data) {
    const { ctx, config } = this;
    try {
      const res = await ctx.curl(`${config.thirdUrl.host}/hourlyGMV/selectUserSaleEveryHour`, {
        method: 'POST',
        dataType: 'json',
        contentType: 'json',
        data: data,
      });
      if (res.data.responseCode !== 200) {
        throw new Error(res);
      }
      ctx.logger.info('[service.third]: 获取用户日每小时销售额 ');
      return res.data;
    } catch (e) {
      ctx.logger.error('[service.third]: 获取用户日每小时销售额失败', JSON.stringify(e));
      throw new Error(e);
    }
  }
  /**
   * 获取团队成员--（昨日/今日销售额（按天））
   */
  async getMonthDay(data) {
    const { ctx, config } = this;
    try {
      const res = await ctx.curl(`${config.thirdUrl.host}/hourlyGMV/selectUserSaleEveryDay`, {
        method: 'POST',
        dataType: 'json',
        contentType: 'json',
        data: data,
      });
      if (res.data.responseCode !== 200) {
        throw new Error(res);
      }
      ctx.logger.info('[service.third]: 获取用户月每天销售额 ');
      return res.data;
    } catch (e) {
      ctx.logger.error('[service.third]: 获取用户月每天销售额失败', JSON.stringify(e));
      throw new Error(e);
    }
  }
  /**
   * 获取成员数量
   */
  async getUserCount(data) {
    const { ctx, config } = this; 
    try {
      const res = await ctx.curl(`${config.thirdUrl.host}/teamUserNetflow/selectCountByTeamId`, {
        method: 'POST',
        dataType: 'json',
        contentType: 'json',
        data: data,
      });
      if (res.data.responseCode !== 200) {
        throw new Error(res);
      }
      ctx.logger.info('[service.third]: 获取成员数量 ');
      return res.data;
    } catch (e) {
      ctx.logger.error('[service.third]: 获取成员数量', JSON.stringify(e));
      throw new Error(e);
    }
  }
  /**
   * 获取成员列表
   */
  async getUserList(data) {
    const { ctx, config } = this;
    try {
      const res = await ctx.curl(`${config.thirdUrl.host}/teamUserNetflow/selectByTeamId`, {
        method: 'POST',
        dataType: 'json',
        contentType: 'json',
        data: data,
      });
      if (res.data.responseCode !== 200) {
        throw new Error(res);
      }
      ctx.logger.info('[service.third]: 获取成员列表 ');
      return res.data;
    } catch (e) {
      ctx.logger.error('[service.third]: 获取成员列表', JSON.stringify(e));
      throw new Error(e);
    }
  }
  
}

module.exports = ThirdService;