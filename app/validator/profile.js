'use strict';

/**
 * 个人详情参数校验
 */
module.exports = (app) => {
  const { Joi } = app;
  return {
    profile: Joi.object().keys({
      userId: Joi.number().required(),
    }),
    vsprofile: Joi.object().keys({
      roomId: Joi.string().required(),
    })
  };
};