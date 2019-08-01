import moment from 'moment';

const NoticesData = [
  {
    id: '000000001',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    title: '你收到了 14 份新周报',
    datetime: '2017-08-09',
    status: 0,
    type: 'notification',
  },
  {
    id: '000000002',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
    title: '你推荐的 曲妮妮 已通过第三轮面试',
    datetime: '2017-08-08',
    status: 0,
    type: 'notification',
  },
  {
    id: '000000003',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
    title: '这种模板可以区分多种通知类型',
    datetime: '2017-08-07',
    status: 0,
    read: true,
    type: 'notification',
  },
  {
    id: '000000004',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
    title: '左侧图标用于区分不同的类型',
    datetime: '2017-08-07',
    status: 0,
    type: 'notification',
  },
  {
    id: '000000005',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    title: '内容不要超过两行字，超出时自动截断',
    datetime: '2017-08-07',
    type: 'notification',
    status: 0,
  },
];

const getNotices = (req, res) => {
  const params = req.query; // eslint-disable-line
  return res.json({ NoticesData });
};

function postNotices(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, id } = body;

  const beginDay = new Date().getTime();
  switch (method) {
    case 'post':
      // const i = Math.ceil(Math.random() * 10000);
      NoticesData.unshift({
        id: `00000000${435}`,
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
        title: '你推荐的 曲妮妮 已通过第三轮面试',
        datetime: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * 4)).format('YYYY-MM-DD HH:mm'),
        status: 0,
        type: 'notification',
      });
      break;
    case 'update':
      NoticesData.map(item => {
        if (item.id === id) {
          // eslint-disable-next-line
          Object.assign(item, { status: 1 });
        }
        return item;
      });
      break;
    default:
      break;
  }

  return getNotices(req, res, u);
}

export default {
  'GET /api/notices': getNotices,
  'POST /api/notices': postNotices,
};
