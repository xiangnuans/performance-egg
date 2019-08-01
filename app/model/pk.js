'use strict';

const sequelizeTime = require('sequelize-mysql-timestamp');

module.exports = (app) => {
  const TIMESTAMP = sequelizeTime(app.sequelize);
  const { INTEGER, literal, BOOLEAN } = app.Sequelize;

  const PK = app.model.define('r_user_pk', {
    id: {
      type: INTEGER(11).UNSIGNED, primaryKey: true, allowNull: false, autoIncrement: true,
    },
    userId: {
      type: INTEGER(11), allowNull: false, defaultValue: 0, field: 'user_id',
    },
    win: {
      type: BOOLEAN, allowNull: false, defaultValue: false, field: 'win',
    },
    createTime: {
      type: TIMESTAMP, allowNull: false, field: 'create_time', defaultValue: literal('CURRENT_TIMESTAMP'),
    },
    updateTime: {
      type: TIMESTAMP, allowNull: false, field: 'update_time', defaultValue: literal('CURRENT_TIMESTAMP'),
    },
  }, {
    timestamps: false,
  });
  return PK;
};
