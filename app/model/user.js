'use strict';

const sequelizeTime = require('sequelize-mysql-timestamp');

module.exports = (app) => {
  const TIMESTAMP = sequelizeTime(app.sequelize);
  const { STRING, INTEGER, literal } = app.Sequelize;

  const User = app.model.define('t_bas_user', {
    id: {
      type: INTEGER(11).UNSIGNED, primaryKey: true, allowNull: false, autoIncrement: true,
    },
    userId: {
      type: INTEGER(11), allowNull: false, unique: true, defaultValue: 0, field: 'user_id',
    },
    nickName: {
      type: STRING(255), allowNull: false, defaultValue: '', field: 'nick_name',
    },
    teamId: {
      type: INTEGER(11), allowNull: false, defaultValue: 0, field: 'team_id',
    },
    status: {
      type: INTEGER(3), allowNull: false, defaultValue: 0, field: 'status',
    },
    type: {
      type: INTEGER(3), allowNull: false, defaultValue: 0, field: 'type',
    },
    roomId: {
      type: STRING(255), allowNull: false, defaultValue: '', field: 'room_id',
    },
    groupId: {
      type: INTEGER(3), allowNull: false, defaultValue: -1, field: 'group_id',
    },
    rank: {
      type: INTEGER(3), allowNull: false, defaultValue: -1, field: 'rank',
    },
    fans: {
      type: INTEGER(11), allowNull: false, defaultValue: 0, field: 'fans',
    },
    createTime: {
      type: TIMESTAMP, allowNull: false, field: 'create_time', defaultValue: literal('CURRENT_TIMESTAMP'),
    },
    updateTime: {
      type: TIMESTAMP, allowNull: false, field: 'update_time', defaultValue: literal('CURRENT_TIMESTAMP'), order: 'DESC',
    },
  }, {
    timestamps: false
  });
  return User;
};
