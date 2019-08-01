'use strict';

module.exports = (app) => {
  const { Joi } = app;
  return {
    payload: Joi.object().keys({
      teamId: Joi.number().required(),
      date: Joi.date().required(),
    }),
  };
};
