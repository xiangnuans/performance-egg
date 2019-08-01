'use strict';

const sequelizeTime = require('sequelize-mysql-timestamp');

module.exports = (app) => {
  const TIMESTAMP = sequelizeTime(app.sequelize);
  const { STRING, INTEGER, literal, BOOLEAN } = app.Sequelize;

  const Notice = app.model.define('t_bas_notice', {
    id: {
      type: INTEGER(11).UNSIGNED, primaryKey: true, allowNull: false, autoIncrement: true,
    },
    inviter: {
      type: INTEGER(11), allowNull: false, defaultValue: 0, field: 'inviter',
    },
    invitee: {
      type: INTEGER(11), allowNull: false, defaultValue: 0, field: 'invitee',
    },
    title: {
      type: STRING(255), allowNull: false, defaultValue: '', field: 'title',
    },
    type: {
      type: STRING(50), allowNull: false, defaultValue: 'notification', field: 'type',
    },
    status: {
      type: INTEGER(3), allowNull: false, defaultValue: 0, field: 'status',
    },
    read: {
      type: BOOLEAN, allowNull: false, defaultValue: false, field: 'read',
    },
    createTime: {
      type: TIMESTAMP, allowNull: false, field: 'create_time', defaultValue: literal('CURRENT_TIMESTAMP'),
    },
    updateTime: {
      type: TIMESTAMP, allowNull: false, field: 'update_time', defaultValue: literal('CURRENT_TIMESTAMP'),
    },
  },{
    timestamps: false,
  });
  return Notice;
};
