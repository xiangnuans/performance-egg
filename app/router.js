'use strict';

module.exports = (app) => {
  const { router, controller } = app;
  // 健康检查
  router.get('/api/status', controller.status.check);
  router.get('/api/check_mysql', controller.status.checkMysql);

  // view
  router.get('/api/groupList', controller.view.getGroupList);
  router.get('/api/base', controller.view.getBase);
  router.get('/api/chartData', controller.view.getChartData);

  // profile
  router.get('/api/profile', controller.profile.getProfile);
  router.get('/api/vsProfile', controller.profile.getVSProfile);
  router.get('/api/basicList', controller.profile.getBasicList);
  router.get('/api/basic', controller.profile.getBasic);

  // 通知
  router.post('/api/notices', controller.notice.addNotice);
  router.put('/api/notices/:id', controller.notice.updateNotice);
  router.get('/api/notices', controller.notice.getNoticeList);

  // 用户
  router.get('/api/currentUser', controller.user.currentUser);
  router.post('/api/updateUser', controller.user.updateUser);
  router.get('/api/userList', controller.user.getUserList);
  router.get('/api/cardList', controller.user.getCardList);

    // 前端页面跳转
    router.get('*', controller.home.index);
    // router.all('/*', controller.home.proxy);
};
