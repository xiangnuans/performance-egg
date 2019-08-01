'use strict';

const TIMESTAMP = require('sequelize-mysql-timestamp')(this.app.sequelize);

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('t_bas_users', {
    id: {
      type: Sequelize.INTEGER(11).UNSIGNED, primaryKey: true, allowNull: false, autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER(11), allowNull: false, unique: true, defaultValue: 0, field: 'user_id',
    },
    nickName: {
      type: Sequelize.STRING(255), allowNull: false, defaultValue: '', field: 'nick_name',
    },
    teamId: {
      type: INTEGER(11), allowNull: false, defaultValue: 0, field: 'team_id',
    },
    status: {
      type: Sequelize.INTEGER(3), allowNull: false, defaultValue: 0, field: 'status',
    },
    type: {
      type: Sequelize.INTEGER(3), allowNull: false, defaultValue: 0, field: 'type',
    },
    roomId: {
      type: Sequelize.STRING(255), allowNull: false, defaultValue: '', field: 'room_id',
    },
    groupId: {
      type: Sequelize.INTEGER(3), allowNull: false, defaultValue: -1, field: 'group_id',
    },
    rank: {
      type: Sequelize.INTEGER(3), allowNull: false, defaultValue: -1, field: 'rank',
    },
    fans: {
      type: Sequelize.INTEGER(11), allowNull: false, defaultValue: 0, field: 'fans',
    },
    createTime: {
      type: TIMESTAMP, allowNull: false, field: 'create_time', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updateTime: {
      type: TIMESTAMP, allowNull: false, field: 'update_time', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  }).then(() => queryInterface.addConstraint('Item', ['user_id', 'room_id'], {
    type: 'unique',
    name: 'unique_room_user',
  })),

  down: (queryInterface) => queryInterface.dropTable('t_bas_users'),
};
