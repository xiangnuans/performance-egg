'use strict';
/**
 * 用户详情相关业务处理
 */
const { Service } = require("egg");
const moment = require('moment');
const _ = require('lodash');

class ProfileService extends Service {
  /**
   * 获取个人chart
   */
  async getProfile(params) {
    const { ctx } = this;
    const nowDate = new Date();
    const t = await ctx.helper.monthDate(nowDate);
    const d = await ctx.helper.getFullDate(nowDate);
    const dateSTime = new Date(`${d} 00:00:00`).getTime();
    const dateETime = new Date(`${d} 23:59:59`).getTime();
    // 获取本月第一天0点和本月最后天一天23:59:59
    const monthSTime = new Date(`${t.startDate} 00:00:00`).getTime()
    const monthETime = new Date(`${t.endDate} 23:59:59`).getTime();
    try {
      let fans = [];
      const startTime = t.STime;
      const dayLength = parseInt(t.dayLen, 10);
      const res = await Promise.all([
        ctx.service.third.getDayHour({ userId: params.userId, dateSTime, dateETime }),
        ctx.service.third.getMonthDay({ userId: params.userId, dateSTime: monthSTime, dateETime: monthETime }),
      ]);
      for (let i = 1; i <= dayLength; i += 1) {
        const df = await ctx.helper.getFullDate(nowDate.setDate(i));
        fans.push({
          x: df,
          y: Math.floor(Math.random() * 1000) + 200,
        });
      }
      const dayProduce = [];
      const monthProduce = [];
      for (let k = 1; k < 25; k += 1) {
        const timeStamp = startTime + 60 * 60 * 1000 * k;
        const v = _.find(res[0], { hourTimestamp:  timeStamp});
        dayProduce.push({
          x: moment(new Date(timeStamp)).format('HH:mm'),
          y: v? v.amountgmv : 0,
        })
      }
      for (let j = 1; j <= dayLength; j += 1) {
        const dp = await ctx.helper.getFullDate(nowDate.setDate(j));
        const ss = dp.replace(/-/g,"/");
        const obj = _.find(res[1], { hourTimestamp: new Date(ss).getTime()});
        monthProduce.push({
          x: dp,
          y: obj? obj.amountgmv : 0,
        })
      }
      return {
        dayProduce,
        fans,
        monthProduce,
      }     
    } catch (e) {
      ctx.logger.error('[service.profile]: 获取单个用户chart失败', JSON.stringify(e));
      throw new Error(e);
    }
  }
  /**
   * 获取个人基本信息
   */
  async getBasic(params) {
    const { ctx } = this;
    try {
      const { userId } = params;
      const nowDate = new Date();
      const t = await ctx.helper.monthDate(nowDate);
      // 获取本月第一天0点和本月最后一天23:59:59
      const dateSTime = new Date(`${t.startDate} 00:00:00`).getTime()
      const dateETime = new Date(`${t.endDate} 23:59:59`).getTime();
      // 获取数据
      const res = await Promise.all([
        ctx.service.third.getUser({ userId }),
        ctx.service.third.getUserSales({ userId, dateSTime, dateETime }),
        ctx.model.Pk.count({  where: { userId,  win: true }}),
        ctx.model.Pk.count({ where: { userId }}),
      ]);
      return {
        basic: {
          userId: res[0].userId,
          nickName: res[0].nickName || '',
          department: res[0].departmentName || '',
          teamName: res[0].teamName || '',
          performance: res[1].data[0]? res[1].data[0].amountgmv : 0,
          deviceCnt: 0,
          fans: 0,
          remainRate: 0,
          repeatRate: 0,
          winRate: res[2]/res[3] || 0
        }
      } 
    } catch(e) {
      ctx.logger.error('[service.profile]: 获取单个用户基本数据失败', JSON.stringify(e));
      throw new Error(e);
    }
  }
  /**
   * 获取VS多人chart数据
   */
  async getVSProfile(params) {
    const { ctx } = this;
    const { roomId } = params;
    // 获取今日0点和23:59:59
    const nowDate = new Date();
    const t = await ctx.helper.monthDate(nowDate);
    const d = await ctx.helper.getFullDate(nowDate);
    const dateSTime = new Date(`${d} 0d0:00:00`).getTime();
    const dateETime = new Date(`${d} 23:59:59`).getTime();
    // 获取本月第一天0点和本月最后一天23:59:59
    const monthSTime = new Date(`${t.startDate} 00:00:00`).getTime();
    const monthETime = new Date(`${t.endDate} 23:59:59`).getTime();
    // 获取指定当天开始时间点
    const starTime = t.STime;
    const dayLength = t.dayLen;
    const TYPE = await ctx.helper.getType();
    let list = {
      vsDay: [],
      vsFans: [],
      vsMonth: [],
      vsName: [],
    }
    try {
      const userList = await ctx.model.User.findAll({
        where: {
          roomId,
          status: TYPE.USER_STATUS.PKING,
        },
        raw: true,
      });
      if (userList.length === 0) {
        return list;
      }
      const len = userList.length;
      let res = [];
      let dayA = [];
      let monthA = [];
      for (let i = 0; i < len; i += 1) {
        list.vsName.push(userList[i].nickName);
        res = await Promise.all([
          ctx.service.third.getDayHour({ userId: userList[i].userId, dateSTime, dateETime, all: 1 }),
          ctx.service.third.getMonthDay({ userId: userList[i].userId, dateSTime: monthSTime, dateETime: monthETime, all: 1}),
        ]);
        for (let j = 0; j < res[0].length; j += 1) {
          dayA.push(res[0][j]);
        }
        for (let k = 0; k < res[1].length; k += 1) {
          monthA.push(res[1][k]);
        }
      }
      // 封装月每日单粉数据
      for (let u = 1; u <= dayLength; u += 1) {
        const td = await ctx.helper.getFullDate(nowDate.setDate(u));
        let yValue = {};
        for (let v = 1; v <= len; v += 1){
          yValue['y'+ v] = Math.floor(Math.random() * 1000) + 200;
        }
        list.vsFans.push(Object.assign({ x: td }, yValue));
      }
      // 封装日每小时数据
      for (let p = 1; p < 25; p +=1) {
        const x = moment(new Date(starTime + 60 * 60 * 1000 * p)).format('HH:mm');
        let y = {};
        for (let q = 1; q <= len; q += 1) {
          const obj =  _.find(dayA, { nickName: list.vsName[q-1], hourTimestamp:  t.starTime + 60 * 60 * 1000 * q});
          y['y'+ q] = obj ? (obj.amountgmv || 0) : 0;
        }
        list.vsDay.push(Object.assign({ x: x }, y));
      }
      // 封装月每日数据
      for (let m = 1; m < dayLength; m += 1) {
        const x = await ctx.helper.getFullDate(nowDate.setDate(m));
        let my = {};
        for (let n = 1; n <= len; n += 1) {
          const obj =  _.find(monthA, { nickName: list.vsName[n-1], timeStatistics:  x });
          my['y'+ n] = obj ? (obj.amountgmv || 0) : 0;
        }
        list.vsMonth.push(Object.assign({ x: x }, my));
      }
      return list;
    } catch(e) {
      ctx.logger.error('[controller.profile]: 获取单多个用户chart数据失败', JSON.stringify(e));
      throw new Error(e);
    }
  }
  /**
   * 获取多个用户基本详情
   */
  async getBasicList(params) {
    const { ctx, app } = this;
    try {
      const { roomId } = params;
      const nowDate = new Date();
      const t = await ctx.helper.monthDate(nowDate);
      // 获取本月第一天0点和本月最后一天23:59:59
      const dateSTime = new Date(`${t.startDate} 00:00:00`).getTime()
      const dateETime = new Date(`${t.endDate} 23:59:59`).getTime();
      const TYPE = await ctx.helper.getType();
      let data = {
        basicList: [],
      }
      const roomUser = await ctx.model.User.findOne({
        where: {
          roomId,
          status: TYPE.USER_STATUS.PKING,
        },
        attributes: [
          'roomId',
          [app.Sequelize.fn('GROUP_CONCAT', app.Sequelize.col('user_id')), 'userIdList']
        ],
        group: ['roomId'],
        raw: true,
      });
      const userList = roomUser? roomUser.userIdList.split(',') : [];
      if (userList.length === 0) {
        return data;
      }
      for (let i = 0; i < userList.length; i += 1){
        const userId = userList[i];
        const res = await Promise.all([
          ctx.service.third.getUser({ userId }),
          ctx.service.third.getUserSales({ userId, dateSTime, dateETime }),
          ctx.model.User.findOne({ where: { userId }, raw: true }),
          ctx.model.Pk.count({  where: { userId,  win: true }}),
          ctx.model.Pk.count({ where: { userId }}),
        ]);
        const obj = res[1].data[0];
        const winRate = res[3]/res[4] || 0;
        data.basicList.push({
          userId: res[0].userId,
          nickName: res[0].nickName || '',
          department: res[0].departmentName || '',
          teamName: res[0].teamName || '',
          performance: obj? obj.amountgmv : 0,
          deviceCnt: 0,
          fans: 0,
          remainRate: 0,
          repeatRate: 0,
          winRate,
        } )
      }
      return data;
    } catch(e) {
      ctx.logger.error('[service.profile]: 获取单个用户基本数据失败', JSON.stringify(e));
      throw new Error(e);
    }
  }
}

module.exports = ProfileService;

