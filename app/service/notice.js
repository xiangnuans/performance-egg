'use strict';

/**
 * 通知相关业务处理
 */
const { Service } = require("egg");
const moment = require('moment');

class NoticeService extends Service {
  /**
   * 新增通知
   */
  async addNotice(body) {
    const { ctx } = this;
    try {
      const { inviter, invitee, groupId, roomId } = body;
      const TYPE = await ctx.helper.getType();
      const res = await Promise.all([
        ctx.model.User.findOne({
          where: {
            userId: inviter,
          },
          raw: true
        }),
        ctx.service.third.getUser({ userId: invitee })
      ]);
      if (!res[0]) {
        throw new Error('未查询到邀请者的PK情况，暂无权限邀请其他人');
      }
      let groupMap = '作为伙伴';
      let g = groupId;
      if (!groupId || groupId == -1) {
        groupMap = '作为对手';
       if (res[0].groupId === 0) {
         g = 1;
       }
       if (res[0].groupId === 1) {
         g = 0;
       }
      }
      const title = `${res[0].nickName}邀请你${groupMap}参赛  ${moment(new Date()).format('HH:mm')}`;
      await Promise.all([
        ctx.model.User.upsert({
          userId: invitee,
          groupId: g,
          roomId,
          status: TYPE.USER_STATUS.INVITING,
          type: TYPE.USER_TYPE.ORDINARY,
          teamId: res[1].teamId,
        },
        { 
          where: {
            userId: invitee,
          },
        }),
        ctx.model.Notice.create({ invitee, inviter, title }),
      ]);
      return {};
    } catch (e) {
      ctx.logger.error('[service.notice]: 添加通知失败', e);
      throw new Error(e);
    }
  }
  /**
   * 更新通知
   */
  async updateNotice(body) {
    const { ctx } = this;
    try {
      const { id, status, userId, groupId, roomId } = body;
      const TYPE = await ctx.helper.getType();
      // 用户接受邀请
      if (status === TYPE.NOTICE_STATUS.ACCEPT) {
        // 获取加入放入房间组是否已满员
        const groupUser = await ctx.model.User.findAll({
          where: {
            groupId,
            roomId,
          },
          raw: true
        });
        if (groupUser.length === 4) {
          throw new Error('该房间组已满，加入失败');
        }
        Promise.all([
          ctx.model.User.update({ status: TYPE.USER_STATUS.PKING }, {
            where: { userId },
            raw: true,
          }),
          ctx.model.Notice.update({ read: true, status }, {
            where: {
              invitee: userId
            }
          }),
        ])
      }
      // 用户拒绝邀请，检查是否还有未读通知
      if (status === TYPE.NOTICE_STATUS.REJECT) {
        const notices = await ctx.model.Notice.findAll({
          where: {
            invitee: userId,
            read: false,
          }
        });
        await ctx.model.Notice.update({ status, read: true }, {
          where: { id },
          limit: 1,
          fields: ['status', 'updateTime'],
        });
        if (notices.length === 1) {
          await ctx.model.User.update({ status: TYPE.USER_STATUS.INIT }, {
            where: {
              userId,
            }
          })
        }
      }
      return {};
    } catch (e) {
      ctx.logger.error('[service.notice]: 更新通知失败', JSON.stringify(e));
      throw new Error(e);
    }
  }
  /**
   * 获取通知列表
   */
  async getNoticeList(params) {
    const { ctx } = this;
    try {
      const { userId } = params;
      const TYPE = await ctx.helper.getType();
      const res = await ctx.model.Notice.findAll({
        where: {
          read: false,
          invitee: userId,
          status: TYPE.NOTICE_STATUS.INIT,
        },
        raw: true,
      });
      ctx.logger.info('返回的通知列表 ', res);
      if (res.length === 0) {
        return [];
      }
      res.map(item => Object.assign(item, { dateTime: item.createTime }));
      return res;
    } catch (e) {
      ctx.logger.error('[service.notice]: 获取通知失败', JSON.stringify(e));
      throw new Error(e);
    }
  }

}

module.exports = NoticeService;