'use strict';

const { Subscription } = require("egg");
const _ = require('lodash');

/**
 * 每天晚上23:59:00计算用户P结果并初始化用户
 */
class PK extends Subscription {
  static get schedule() {
    return {
      cron: '59 59 23 */1 * *',
      type: 'all',
    };
  }
  async subscribe() {
    const { ctx, app } = this;
    // 获取当日0点和23:59:59时间戳
    const t = ctx.helper.getFullDate(new Date());
    const dateSTime = new Date(`${t} 00:00:00`).getTime();
    const dateETime = new Date(`${t} 23:59:59`).getTime();
    try {
      const TYPE = await ctx.helper.getType();
      // 获取每个用户今日销售总额
      const res = await Promise.all([
        ctx.service.third.getUserSales({ dateSTime, dateETime, all: 1 }),
        ctx.model.User.findAll({
          where: {
            status: TYPE.USER_STATUS.PKING,
          },
          attributes: [
            'roomId',
            'groupId',
            [app.Sequelize.fn('GROUP_CONCAT', app.Sequelize.col('user_id')), 'userIdList']
          ],
          group: ['roomId', 'groupId'],
          raw: true,
        })
      ]);
      const len = res[1].length;
      if(len !== 0) {
        for (let i = 0; i < len; i += 1) {
          const idList = res[1][i].userIdList.split(',');
          // 获取同一房间不同组用户信息
          const list = await Promise.all([
            ctx.model.User.findAll({
              where: {
                userId: { [app.Sequelize.Op.in]: idList },
                status: TYPE.USER_STATUS.PKING,
                groupId: 0,
              }
            }),
            ctx.model.User.findAll({
              where: {
                userId: { [app.Sequelize.Op.in]: idList },
                status: TYPE.USER_STATUS.PKING,
                groupId: 1,
              }
            }),
          ]);
          // 计算同一房间不同组的胜负
          let totalPerformance0 = 0, totalPerformance1 = 0;
          list[0].map(id => {
            const user = _.find(res[0].data, { userId: id });
            totalPerformance0 += user? user.amountgmv : 0;
          }) 
          list[1].map(id => {
            const user = _.find(res[0].data, { userId: id });
            totalPerformance1 += user? user.amountgmv : 0;
          });
          if (totalPerformance0 > totalPerformance1) {
            list[0].map(item => Object.assign({ userId: item.userId, win: true }));
          }
          if (totalPerformance0 < totalPerformance1) {
            list[1].map(item => Object.assign({userId: item.userId, win: true }));
          }
          if (totalPerformance0 === totalPerformance1) {
            list[0].map(item => Object.assign({ userId: item.userId, win: true }));
            list[1].map(item => Object.assign({ userId: item.userId, win: true }));
          }
          const con = _.concat(list[0], list[1]);
          await ctx.model.Pk.bulkCreate(con);

        }
      }
      // 初始化用户状态
      await ctx.model.User.update({
        status: TYPE.USER_STATUS.INIT,
      }, {
        where: {
          status: TYPE.USER_STATUS.PKING,
        },
      });
    } catch (e) {
      ctx.logger.error('[schedule.pk]: 定时间计算用户的指标失败', e);
      throw new Error(e);
    }
  }
}

module.exports = PK;