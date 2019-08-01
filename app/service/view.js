const { Service } = require("egg");
const _ = require('lodash');

class ViewService extends Service {
  /**
   * 获取所有团队列表
   */
  async getGroupList() {
    const { ctx } = this;
    try {
      const res = await ctx.service.third.getGroupList();
      const data = {
        groupList: [],
      };
      res.data.map(item => {
        data.groupList.push({
          id: item.id,
          name: item.teamName,
        })
      });
      return data;
    } catch (e) {
      ctx.logger.error('[service.view]:获取团队列表失败', JSON.stringify(e));
      throw new Error(e);
    }
  }
  /**
   * 获取销售总额
   */
  async getBase(params) {
     const { ctx } = this;
     try {
       ctx.logger.info('[view.getBase]: params......', params);
       // 计算指定时间
       const dateSTime = new Date(`${params.date} 00:00:00`).getTime();
       const dateETime = new Date(`${params.date} 23:59:59`).getTime();
       // 计算指定时间前一天时间
       const preDateSTime = dateSTime - 24 * 60 * 60 * 1000;
       const preDateETime = dateETime - 24 * 60 * 60 * 1000;
       const cMonthTime = await ctx.helper.calculateMonth(new Date(params.date));
       const LMETime = cMonthTime.startTime - 1;
       const LMSTime = await ctx.helper.calculateMonth(LMETime);
       let tParams = {}, yParams = {}, mParams = {}, lParams = {};
       Object.assign(params, { date: undefined });
       // 获取所有
       if (params.teamId == 0) {
         Object.assign(params, { all: 1, teamId: undefined });
       } 
       Object.assign(tParams, params, { dateSTime, dateETime });
       Object.assign(yParams, params, { dateSTime: preDateSTime, dateETime: preDateETime });
       Object.assign(mParams, params, { dateSTime: cMonthTime.startTime, dateETime: cMonthTime.endTime });
       Object.assign(lParams, params, { dateSTime: LMSTime.startTime, dateETime: LMETime });
       const res = await Promise.all([
         ctx.service.third.postTeamSale(tParams),
         ctx.service.third.postTeamSale(yParams),
         ctx.service.third.postTeamSale(mParams),
         ctx.service.third.postTeamSale(lParams)
       ])
      return {
        remainRate: 0,
        repeatRate: 0,
        dayTotal: res[0] || 0,
        yesTotal: res[1] || 0,
        month: res[2] || 0,
        lastMonth: res[3] || 0,
      }
     } catch(e) {
       ctx.logger.error('[service.view]: 获取销售总额失败', JSON.stringify(e));
       throw new Error(e);
     }
  }
  /**
   * 获取首页趋势图
   */
  async getChartData(params) {
    const { ctx } = this;
    try {
      ctx.logger.info('[viwe.getChartData]: start: params = ', params);
      const dateSTime = new Date(`${params.date} 00:00:00`).getTime();
      const dateETime = new Date(`${params.date} 23:59:59`).getTime();
      const preDateSTime = dateSTime - 24 * 60 * 60 * 1000;
      const preDateETime = dateETime - 24 * 60 * 60 * 1000;
      const cMonthTime = await ctx.helper.calculateMonth(new Date(params.date));
      const indicatorMap = {
        yesPerformance: '当日业绩',
        dayHigh: '个人日销售最高纪录',
        monthHigh: '个人月销售最高纪录',
        yesFans: '昨日单粉',
        remainRate: '留存率',
        repeatRate: '复购率'
      };
      let indicatorNames = [];
      let indicatorData = [];
      let yesterdayRank = [];
      let yParams = {}, mParams = {};
      Object.keys(indicatorMap).forEach(key => {
        indicatorNames.push(indicatorMap[key]);
      });
      Object.assign(params, { all: 1, date: undefined, dateSTime, dateETime });
      Object.assign(yParams, { teamId: params.teamId, all: 1, date: undefined, dateSTime: preDateSTime, dateETime: preDateETime });
      Object.assign(mParams, {  teamId: params.teamId, all: 1, date: undefined, dateSTime: cMonthTime.startTime, dateETime: cMonthTime.endTime });
      // 筛选全员
      if (params.teamId == 0) {
        Object.assign(params, { pageSize: 40, pageIndex: 1, all: 0, teamId: undefined });
        Object.assign(yParams, { pageSize: 40, pageIndex: 1, all: 0, teamId: undefined });
        Object.assign(mParams, { pageSize: 40, pageIndex: 1, all: 0,  teamId: undefined });
      }      
      // 获取所选日期的各项数据
      const res = await Promise.all([
        ctx.service.third.getUserList(params),
        ctx.service.third.getUserSales(params),
        ctx.service.third.getDayHighSale(params),
        ctx.service.third.getMonthHighSale(mParams),
        ctx.service.third.getUserSales(yParams),
      ])
      let sourceData = [];
      if (res[0].data.length > 0) {
        res[0].data.map(item => {   
          // 获取所选日期当日的各项数据
          const p = _.find(res[1], { userId: item.userId });
          const d = _.find(res[2], { userId: item.userId });
          const m = _.find(res[3], { userId: item.userId });
          const dayHigh = d? d.amountgmv : 0;
          const monthHigh = m? m.amountgmv : 0;
          sourceData.push({ 
            dayHigh,
            monthHigh,
            yesPerformance: p? p.amountgmv : 0, 
            yesFans: 0,
            remainRate: 0,
            repeatRate: 0,
            nickName: item.nickName
          });
          // 获取团队成员昨日业绩
          const yp = _.find(res[4], { userId: item.userId });
          yesterdayRank.push({
            x: item.nickName,
            y: yp? yp.amountgmv : 0,
          })
        });
      }
      

      sourceData.map(item => {
        let obj = {
          name: item.nickName,
        };
        Object.keys(item).forEach(key => {
          if (key !== 'nickName') {
            obj[indicatorMap[key]] = item[key];
          }
        });
        indicatorData.push(obj);
      });
      return {
        indicatorNames,
        indicatorData,
        yesterdayRank
      }
    } catch (e) {
      ctx.logger.error('[service.view]: 获取图数据失败', JSON.stringify(e));
      throw new Error(e);
    }
  }
}

module.exports = ViewService;