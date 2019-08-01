'use strict';

/**
 * 通过 egg-mock，结合 Mocha 的 before 钩子就可以便捷地创建出一个 app 实例。
 * 每一个测试文件都需要这样创建一个 app 实例非常冗余，因此 egg-mock 提供了一个 bootstrap 文件，可以直接从它上面拿到我们所常用的实例：
 */
const { app, assert } = require('egg-mock/bootstrap');

describe('test/controller/home.test.js', () => {
  /**
   * 结合 egg-mock 提供的 app.mockContext(options) 方法来快速创建一个 ctx 实例。
   */
  it('should get a ctx', () => {
    const ctx = app.mockContext();
    assert(ctx.method === 'GET');
    assert(ctx.url === '/');
  });

  /**
   * 如果我们想模拟 ctx.user 这个数据，也可以通过给 mockContext 传递 data 参数实现：
   */
  it('should mock ctx.user', () => {
    const ctx = app.mockContext({
      user: {
        name: 'fengmk2',
      },
    });
    assert(ctx.user);
    assert(ctx.user.name === 'fengmk2');
  });
  /**
   * Controller 测试
   */
  it('should status 200 and get the request body', () => {
    // 模拟 CSRF token，下文会详细说明
    app.mockCsrf();
    return app.httpRequest()
      .post('/post')
      .type('form')
      .send({
        foo: 'bar',
      })
      .expect(200)
      .expect({
        foo: 'bar',
      });
  });
  /**
   * mock CSRF
   */
  app.mockCsrf();
  return app.httpRequest()
    .post('/post')
    .type('form')
    .send({
      foo: 'bar',
    })
    .expect(200)
    .expect({
      foo: 'bar',
    });
});
