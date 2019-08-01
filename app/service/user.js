'use strict';
/**
 * 处理用户相关接口
 */
const { Service } = require('egg');
const _ = require('lodash');

class UserService extends Service {
  /**
   * 获取指定用户详情
   */
  async currentUser() {
    const { ctx } = this;
    try {
      ctx.logger.info('[user.currentUser]: ctx.state = ', ctx.state.userId);
      const TYPE = await ctx.helper.getType();
      const { userId } = ctx.state;
      const res = await Promise.all([
        ctx.model.Notice.count({
          where: {
            read: false,
            invitee: userId,
            status: TYPE.NOTICE_STATUS.INIT,
          },
          raw: true,
        }),
        ctx.service.third.getUser({ userId }),
        ctx.model.User.findOne({
          where: {
            userId,
          },
          raw: true,
        })
      ])
      ctx.logger.info('[service.user]: 获取用户', res);
      return {
        userId: res[1].userId,
        nickName: res[1].nickName,
        unreadCount: res[0]? res[0] : 0,
        roomId: res[2]? res[2].roomId : '',
        groupId: res[2]? res[2].groupId: -1,
        teamId: res[1].teamId,
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        status: res[2]? res[2].status : TYPE.USER_STATUS.INIT
      }
    } catch (e) {
      ctx.logger.error('[service.user]: 获取用户详情失败', JSON.stringify(e));
      throw new Error(e);
    }
  }
  /**
   * 更新用户数据(用户主动加入房间)
   */
  async updateUser(params) {
    const { ctx } = this;
    try {
      let { userId, status, type, groupId, roomId, teamId, nickName } = params;
      const TYPE = await ctx.helper.getType();
      // 校验用户
      const user = await ctx.model.User.findOne({
        where: { userId },
        raw: true,
      })
      if (user && user.status === TYPE.USER_STATUS.PKING) {
        throw new Error('当前用户已经在PK赛中');
      }
      if (!roomId && type === TYPE.USER_TYPE.ROOM_OWNER) {
        roomId = await ctx.helper.uuidv4();
      }
      await ctx.model.User.upsert(
        { userId, status, type, groupId, roomId, teamId, nickName },
        {
          where: {
            userId,
          }
        }
      );
      return {};
    } catch (e) {
      ctx.logger.error('[service.user]: 更新用户列表失败', JSON.stringify(e));
      throw new Error(e);
    }
  }
  /**
   * 获取用户列表(默认数据是本月)
   */
  async getUserList() {
    const { ctx, app } = this;
    try {
      const params = Object.assign({ userId: ctx.state.userId }, ctx.query);
      ctx.logger.info('1. [service.getUserList]: params = ', params);
      const t = await ctx.helper.monthDate();
      const { userId } = params;
      // 获取本月第一天0点和本月最后一天23:59:59
      const dateSTime = new Date(`${t.startDate} 00:00:00`).getTime();
      const dateETime = new Date(`${t.endDate} 23:59:59`).getTime();
      const pageSize = parseInt(params.pageSize, 10) || 10;
      const pageIndex = parseInt(params.pageIndex, 10) || 1;
      let list = [];
      // 获取当前用户所在团队
      const user = await ctx.service.third.getUser({ userId });
      ctx.logger.info('2. [service.getUserist]: user = ', user);
      if (!user) {
        throw new Error('系统错误，请检查');
      }
      // 获取用户和PK数据
      const res = await Promise.all([
        ctx.service.third.getUserList(Object.assign(params, { userId: undefined, teamId: user.teamId })),
        ctx.service.third.getUserSales({ teamId: user.teamId, all: 1, dateSTime, dateETime }),
        ctx.model.User.findAll({
          where: {
            teamId: user.teamId
          },
          raw: true,
        }),
        ctx.model.Pk.findAll({
          where: {
            createTime: {
              [app.Sequelize.gt]: new Date(dateSTime),
              [app.Sequelize.lte]: new Date(dateETime),
            }
          },
          attributes: [
            'userId',
            [app.Sequelize.fn('GROUP_CONCAT', app.Sequelize.col('win')), 'winList']
          ],
          group: ['userId'],
          raw: true,
        }),
        ctx.service.third.getUserCount(Object.assign(params, { pageIndex: undefined, pageSize: undefined, userId: undefined, teamId: user.teamId }))
      ])
      ctx.logger.info('3. [service.getUserList]: res = ', res);
      // 遍历用户数据
      res[0].data.map(item => {
        const sales = _ .find(res[1], {userId: item.userId });
        const user = _.find(res[2], { userId: item.userId });
        const pkInfo = _.find(res[3], { userId: item.userId });
        const winCount = 0, winTotal = pkInfo? pkInfo.winList.length : 0;
        const wList = pkInfo? pkInfo.winList.splite(',') : [];
        wList.map(v => v?  winCount += 1 : winCount);
        list.push({
          userId: item.userId,
          nickName: item.nickName,
          performance: sales? sales.amountgmv : 0,
          rank: user? user.rank : 0,
          winRate: winCount/winTotal || 0,
          fans: user? user.fans : 0,
          integral: winCount * item.amountgmv || 0,
          status: user? user.status : 0,
        })
      })
      return {
        list,
        pagination: {
          total: res[4].data,
          pageSize,
          pageIndex,
        }
      }
    } catch(e) {
      ctx.logger.error('[service.user]:获取用户列表失败：', e);
      throw new Error(e);
    }
  }
  /**
   * 获取PK列表
   */
  async getCardList(params) {
    const { ctx, app } = this;
    try {
      const { userId } = params;
      const pageIndex =  parseInt(params.pageIndex, 10) || 1;
      const pageSize =  parseInt(params.pageSize, 10) || 10;
      const data = {
        list: [],
        pagination: {
          total: 0,
          pageSize,
          pageIndex,
        }
      }
      const TYPE = ctx.helper.getType();
      const user = await ctx.service.third.getUser({ userId });
      const res = await Promise.all([
        ctx.model.User.findAll({
          where: { 
            status: TYPE.USER_STATUS.PKING,   // 获取正在PK中的用户
            teamId: user.teamId,
          },
          attributes: [
            'roomId', 
            [app.Sequelize.fn('GROUP_CONCAT', app.Sequelize.col('user_id')), 'idList']
          ],
          offset: pageSize * (pageIndex - 1),
          limit: pageSize,
          order: [['updateTime', 'DESC']],
          group: ['roomId'],
          raw: true,
        }),
        ctx.model.User.findAll({
          where: {
            status: TYPE.USER_STATUS.PKING, 
            teamId: user.teamId,
          },
          attributes: [
            'roomId',
          ],
          group: ['room_id'],
          raw: true,
        })
      ]);
      const pkList = res[0];
      data.pagination.total = res[1].length;
      if (pkList.length === 0) {
        return data;
      }
      for(let i = 0; i < pkList.length; i += 1) {
        const idList = pkList[i].idList.split(',');
        const obj = {};
        obj[pkList[i].roomId] = {};
        const groupRes = await Promise.all([
          ctx.model.User.findAll({
            where: {
              userId: { [app.Sequelize.Op.in]: idList },
              groupId: TYPE.USER_GROUP.LEFT,
              roomId: pkList[i].roomId,
            },
            raw: true,
          }),
          ctx.model.User.findAll({
            where: {
              userId: { [app.Sequelize.Op.in]: idList },
              groupId: TYPE.USER_GROUP.RIGHT,
              roomId: pkList[i].roomId,
            },
            raw: true,
          }),
        ]);
        const userList0 = groupRes[0].map(item => Object.assign({ id: item.userId, nickName: item.nickName }));
        const userList1 = groupRes[1].map(item => Object.assign({ id: item.userId, nickName: item.nickName }));
        obj[pkList[i].roomId][0] = userList0;
        obj[pkList[i].roomId][1] = userList1;
        data.list.push(obj);
      }
      return data;
    } catch (e) {
      ctx.logger.error('[service.user]: 获取PK用户列表失败', JSON.stringify(e));
      throw new Error(e);
    }
  }
}

module.exports = UserService;