'use strict';

const TIMESTAMP = require('sequelize-mysql-timestamp')(this.app.sequelize);

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('t_bas_notices', {
    id: {
      type: Sequelize.INTEGER(11).UNSIGNED, primaryKey: true, allowNull: false, autoIncrement: true,
    },
    inviter: {
      type: Sequelize.INTEGER(11), allowNull: false, defaultValue: 0, field: 'inviter',
    },
    invitee: {
      type: Sequelize.INTEGER(11), allowNull: false, defaultValue: 0, field: 'invitee',
    },
    title: {
      type: Sequelize.STRING(255), allowNull: false, defaultValue: '', field: 'title',
    },
    type: {
      type: Sequelize.STRING(50), allowNull: false, defaultValue: 'notification', field: 'type',
    },
    status: {
      type: Sequelize.INTEGER(3), allowNull: false, defaultValue: 0, field: 'status',
    },
    read: {
      type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'read',
    },
    createTime: {
      type: TIMESTAMP, allowNull: false, field: 'create_time', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updateTime: {
      type: TIMESTAMP, allowNull: false, field: 'update_time', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('t_bas_notices'),
};
