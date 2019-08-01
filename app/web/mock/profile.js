import moment from 'moment';

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

const salesData = [];
for (let j = 0; j < Math.random() * 5; j += 1) {
  const list = [];
  for (let i = 0; i < 10; i += 1) {
    list.push({
      x: `亚麻套装${i}`,
      y: Math.floor(Math.random() * 1000) + 200,
    });
  }
  salesData.push(list);
}

const nowDate = new Date();
const cloneNowDate = new Date();
const fullYear = nowDate.getFullYear();
const month = nowDate.getMonth() + 1; // getMonth 方法返回 0-11，代表1-12月
const endOfMonth = new Date(fullYear, month, 0).getDate(); // 获取本月最后一天
const date = nowDate.getDay();
function getFullDate(targetDate) {
  let D;
  let y;
  let m;
  let d;
  if (targetDate) {
    D = new Date(targetDate);
    y = D.getFullYear();
    m = D.getMonth() + 1;
    d = D.getDate();
  } else {
    y = fullYear;
    m = month;
    d = date;
  }
  m = m > 9 ? m : `0${m}`;
  d = d > 9 ? d : `0${d}`;
  return `${y}-${m}-${d}`;
}

const fakeY1 = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5, 3, 9, 4, 6, 7, 3, 5];
const endDate = getFullDate(cloneNowDate.setDate(endOfMonth)); // 当月最后一天
const dayLength = endDate.substr(8);
const startTime = new Date(new Date('2019-07-12').toLocaleDateString()).getTime();

function fakeProfileData(req, res) {
  const dayProduce = [];
  for (let i = 0; i < fakeY1.length; i += 1) {
    dayProduce.push({
      x: moment(new Date(startTime + 60 * 60 * 1000 * i)).format('HH:mm'),
      y: fakeY1[i],
    });
  }
  const fans = [];
  for (let i = 1; i <= dayLength; i += 1) {
    fans.push({
      x: getFullDate(cloneNowDate.setDate(i)).substr(5),
      y: Math.floor(Math.random() * 1000) + 200,
    });
  }

  const monthProduce = [];
  for (let i = 1; i <= dayLength; i += 1) {
    monthProduce.push({
      x: getFullDate(cloneNowDate.setDate(i)).substr(5),
      y: Math.floor(Math.random() * 1000) + 200,
    });
  }

  return res.json({
    dayProduce,
    fans,
    monthProduce,
  });
}

function fakeVSProfile(req, res) {
  const vsName = ['liy', 'jing', 'Json', 'Jsck', 'lili', 'nini', 'xinli', 'nih'];
  const vsDay = [];
  for (let i = 0; i < fakeY1.length; i += 1) {
    vsDay.push({
      x: moment(new Date(startTime + 60 * 60 * 1000 * i)).format('HH:mm'),
      y1: Math.floor(Math.random() * 10) + 2,
      y2: Math.floor(Math.random() * 10) + 1,
      y3: Math.floor(Math.random() * 10) + 3,
    });
  }

  const vsMonth = [];
  for (let i = 1; i <= dayLength; i += 1) {
    vsMonth.push({
      x: getFullDate(cloneNowDate.setDate(i)).substr(5),
      y1: Math.floor(Math.random() * 1000) + 200,
      y2: Math.floor(Math.random() * 1000) + 100,
      // y3: Math.floor(Math.random() * 1000) + 140,
      // y4: Math.floor(Math.random() * 1000) + 170,
    });
  }

  const vsFans = [];
  for (let i = 1; i <= dayLength; i += 1) {
    vsFans.push({
      x: getFullDate(cloneNowDate.setDate(i)).substr(5),
      y1: Math.floor(Math.random() * 1000) + 200,
      y2: Math.floor(Math.random() * 1000) + 100,
      // y3: Math.floor(Math.random() * 1000) + 140,
      // y4: Math.floor(Math.random() * 1000) + 170,
    });
  }
  return res.json({
    vsDay,
    vsFans,
    vsMonth,
    vsName,
  });
}

function fakeBasicList(req, res) {
  const gradeMap = [0, 1, 2, 3];
  const basicList = [];
  for (let i = 0; i < Math.random() * 9; i += 1) {
    basicList.push({
      userId: i,
      name: `小${i}`,
      avatar: avatars[i % 9],
      performance: Math.floor(Math.random() * 1000) + 99,
      deviceCnt: Math.floor(Math.random() * 100) + 10,
      fans: Math.floor(Math.random() * 1000) + 670,
      remainRate: `${(Math.random() * 100).toFixed(2)}%`,
      repeatRate: `${(Math.random() * 100).toFixed(2)}%`,
      winRate: `${(Math.random() * 100).toFixed(2)}%`,
      allRank: Math.floor(Math.random() * 600),
      groupRank: Math.floor(Math.random() * 40),
      grade: gradeMap[i % 4],
      department: `服务事业部${i}`,
    });
  }
  return res.json({
    data: {
      basicList,
    },
  });
}

function fakeBasic(req, res) {
  const params = req.query;
  const gradeMap = [0, 1, 2, 3];
  const basic = {
    userId: params.userId,
    nickName: `小${params.userId}`,
    avatar: avatars[0],
    performance: Math.floor(Math.random() * 1000) + 99,
    deviceCnt: Math.floor(Math.random() * 100) + 10,
    fans: Math.floor(Math.random() * 1000) + 670,
    remainRate: `${(Math.random() * 100).toFixed(2)}%`,
    repeatRate: `${(Math.random() * 100).toFixed(2)}%`,
    winRate: `${(Math.random() * 100).toFixed(2)}%`,
    allRank: Math.floor(Math.random() * 600),
    groupRank: Math.floor(Math.random() * 40),
    grade: gradeMap[0],
    department: `服务事业部${params.userId}`,
  };
  return res.json({
    data: {
      basic,
    },
  });
}

export default {
  'GET /api/profile': fakeProfileData,
  'GET /api/vsProfile': fakeVSProfile,
  'GET /api/basicList': fakeBasicList,
  'GET /api/basic': fakeBasic,
};
