import { parse } from 'url';

const avatars = [
  'https://upload-images.jianshu.io/upload_images/9403248-44f22b71237521e1.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
  'https://upload-images.jianshu.io/upload_images/9403248-92835843d5dca136.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
  'https://upload-images.jianshu.io/upload_images/9403248-87be2f8afe20e89b.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
  'https://upload-images.jianshu.io/upload_images/9403248-dbd6d83a5aa418b5.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
  'https://upload-images.jianshu.io/upload_images/9403248-2eb19d6d18343664.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
  'https://upload-images.jianshu.io/upload_images/9403248-2acc36dd9f37a351.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
  'https://upload-images.jianshu.io/upload_images/9403248-d5cc2ab253d7f999.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
  'https://upload-images.jianshu.io/upload_images/9403248-a6d9cc5690c9a271.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
  'https://upload-images.jianshu.io/upload_images/9403248-cae24c2e759b467f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
];

const titles = ['小丽小丽', '小明', '小张', '小里', '顾晓', '哈哈', '时尚', '广告', '单粉'];

const descs = ['王者', '王者', '青铜', '青铜', '青铜'];

let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    key: i,
    userId: i,
    disabled: i % 6 === 0,
    href: 'https://ant.design',
    avatar: avatars[i % 9],
    nickName: `小 ${i}`,
    title: `一个任务名称 ${i}`,
    owner: '曲丽丽',
    desc: '这是一段描述',
    callNo: Math.floor(Math.random() * 1000),
    status: Math.floor(Math.random() * 10) % 3,
    updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    progress: Math.ceil(Math.random() * 100),
    rank: [0, 1, 2, 3][i % 4],
    winRate: (Math.random() * 100).toFixed(2),
    fans: Math.floor(Math.random() * 1000),
    performance: Math.floor(Math.random() * 10000),
    integral: Math.floor(Math.random() * 100),
  });
}

function getList(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = tableListDataSource;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.rank) {
    const rank = params.rank.split(',');
    let filterDataSource = [];
    rank.forEach(s => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter(data => parseInt(data.rank, 10) === parseInt(s[0], 10)),
      );
    });
    dataSource = filterDataSource;
  }

  if (params.nickName) {
    dataSource = dataSource.filter(data => data.nickName.indexOf(params.nickName) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      pageIndex: parseInt(params.pageIndex, 10) || 1,
    },
  };
  return res.json({ result });
}

function postList(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => key.indexOf(item.key) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        key: i,
        href: 'https://ant.design',
        avatar: [
          'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
          'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
        ][i % 2],
        name: `TradeCode ${i}`,
        title: `一个任务名称 ${i}`,
        owner: '曲丽丽',
        callNo: Math.floor(Math.random() * 1000),
        status: Math.floor(Math.random() * 10) % 2,
        updatedAt: new Date(),
        createdAt: new Date(),
        progress: Math.ceil(Math.random() * 100),
      });
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(item => {
        if (item.key === key) {
          // eslint-disable-next-line
          Object.assign(item, { desc, name });
          return item;
        }
        return item;
      });
      break;
    default:
      break;
  }

  return getList(req, res, u);
}

function PKList(params) {
  const pageSize = parseInt(params.pageSize, 10) || 10;
  const list = [];
  for (let i = 0; i < pageSize; i += 1) {
    const obj = {};
    obj[i] = {};
    const userList0 = [];
    const userList1 = [];
    for (let j = 0; j < Math.random() * 5; j += 1) {
      if (j % 2 === 0) {
        userList0.push({
          id: j,
          owner: true,
          nickName: titles[i % 8],
          avatar: avatars[parseInt(Math.random() * 9, 10)],
          status: ['active', 'exception', 'normal'][i % 3],
          logo: avatars[i % 8],
          subDescription: descs[i % 5],
          description:
            '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
          performance: Math.floor(Math.random() * 1000) + 100,
          fans: Math.floor(Math.random() * 100) + 1030,
          integral: Math.floor(Math.random() * 100) + 1030,
          winRate: `${Math.floor(Math.random() * 100)}%`,
          rank: i + 1,
          roomId: `room$_${i}`,
        });
      } else {
        userList1.push({
          id: j,
          owner: true,
          nickName: titles[i % 8],
          avatar: avatars[parseInt(Math.random() * 9, 10)],
          status: ['active', 'exception', 'normal'][i % 3],
          logo: avatars[i % 9],
          subDescription: descs[i % 5],
          description:
            '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
          performance: Math.floor(Math.random() * 1000) + 100,
          fans: Math.floor(Math.random() * 100) + 1030,
          integral: Math.floor(Math.random() * 100) + 1030,
          winRate: `${Math.floor(Math.random() * 100)}%`,
          rank: i + 1,
          roomId: `room$_${i}`,
        });
      }
    }

    obj[i][0] = userList0;

    obj[i][1] = userList1;

    list.push(obj);
  }
  const result = {
    list,
    pagination: {
      total: 16,
      pageSize,
      pageIndex: parseInt(params.pageIndex, 10) || 1,
    },
  };
  return result;
}

function getPKList(req, res) {
  const params = req.query;
  const result = PKList(params)

  return res.json(result);
}

export default {
  'GET /api/userList': getList,
  'POST /api/list': postList,
  'GET /api/cardList': getPKList,
};
