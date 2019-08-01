'use strict';

const axios = require('axios');

module.exports = () => async (ctx, next) => {
  if (process.env.NODE_ENV !== 'prod') {
    // 开发环境先写死userId
    ctx.state.userId = 10175;
  } else {
    const sessionId = ctx.cookies.get('WD_SID');
    console.log('sessionId = ', sessionId);
    if (!sessionId) {
      ctx.status = 403;
      // cookie过期
      ctx.body = {
        success: false,
        message: 'no cookie WD_SID',
        data: 'https://login.weidiango.com',
      };
      return;
    }

    try {
      const { data } = await axios.post('https://index.weidiango.com/login/checkStatus', {
        headers: { 
          Cookie: `WID_SID=${sessionId}`
        }
      });

      // 服务器session过期
      if (!data || !data.data) {
        ctx.status = 403
        ctx.body = {
          success: false,
          message: 'no session',
          data: 'https://login.weidiango.com',
        };
        return;
      }

      ctx.state.userId = data.data.cms.id;
    } catch (e) {
      // ctx.status = 500
      ctx.body = {
        success: false,
        message: `request auth data fail ${e.message}`,
        data: null,
      };
      return;
     }
  }
  await next();
};
