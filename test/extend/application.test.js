'use strict';

describe('get lru', () => {
  it('should get a lru and it work', () => {
    // 设置缓存
    app.lru.set('foo', 'bar');
    // 读取缓存
    assert(app.lru.get('foo') === 'bar');
  });
});
