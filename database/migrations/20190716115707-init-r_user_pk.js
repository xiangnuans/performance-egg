'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('r_user_pks', {
    id: {
      type: Sequelize.INTEGER(11).UNSIGNED, primaryKey: true, allowNull: false, autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER(11), allowNull: false, defaultValue: 0, field: 'inviter',
    },
    win: {
      type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'win',
    },
    createTime: {
      type: TIMESTAMP, allowNull: false, field: 'create_time', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updateTime: {
      type: TIMESTAMP, allowNull: false, field: 'update_time', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('r_user_pks'),
};
