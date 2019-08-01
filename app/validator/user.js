'use strict';

module.exports = (app) => {
  const { Joi } = app;
  return {
    payload: Joi.object().keys({
      userId: Joi.number().required(),
    }),
    update: Joi.object().keys({
      userId: Joi.number().required(),
      status: Joi.number().required(),
      roomId: Joi.string(),
      groupId: Joi.number().required(),
      type: Joi.number().required(),
      teamId: Joi.number().required(),
      nickName: Joi.string().required(),
    }),
  };
};
