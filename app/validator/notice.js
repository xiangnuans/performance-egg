'use strict';
/**
 * 通知相关接口校验
 */
module.exports = (app) => {
  const { Joi } = app;
  return {
    add: Joi.object().keys({
      inviter: Joi.number().required(),
      invitee: Joi.number().required(),
      groupId: Joi.number(),
      roomId: Joi.string().required(),
    }),
    update: Joi.object().keys({
      userId: Joi.number().required(),
      roomId: Joi.string().required(),
      groupId: Joi.number(),
      status: Joi.number().required(),
      id: Joi.number().required(),
    }),
    get: Joi.object().keys({
      userId: Joi.number().required(),
    })
  };
};