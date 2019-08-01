function chartData(req, res) {
  // const params = req.query;

  const indicatorNames = [];
  const indicatorMap = {
    yesPerformance: '昨日业绩',
    dayHigh: '个人日销售最高纪录',
    monthHigh: '个人月销售最高纪录',
    yesFans: '昨日单粉',
    remainRate: '留存率',
    repeatRate: '复购率',
    rank: '全公司排名',
    groupRank: '组内排名',
  };
  const indicatorOriginData = [];
  const indicatorData = [];
  const yesterdayRank = [];
  for (let i = 0; i <= 40; i += 1) {
    indicatorOriginData.push({
      name: `小${i}`,
      yesPerformance: Math.floor(Math.random() * 1000) + 200,
      dayHigh: Math.floor(Math.random() * 10) + 200,
      monthHigh: Math.floor(Math.random() * 100) + 200,
      yesFans: Math.floor(Math.random() * 100) + 200,
      remainRate: `${Math.floor(Math.random() * 100)}%`,
      repeatRate: `${Math.floor(Math.random() * 100)}%`,
      rank: parseInt(Math.floor(Math.random() * 500), 10),
      groupRank: parseInt(Math.floor(Math.random() * 30), 10),
    });
    yesterdayRank.push({
      x: `小${i}`,
      y: Math.floor(Math.random() * 1000) + 200,
    });
  }
  indicatorOriginData.forEach(item => {
    const obj = {
      name: item.name,
    };
    Object.keys(item).forEach(key => {
      if (key !== 'name') {
        obj[indicatorMap[key]] = item[key];
      }
    });
    indicatorData.push(obj);
  });

  Object.keys(indicatorMap).forEach(key => {
    indicatorNames.push(indicatorMap[key]);
  });
  return res.json({
    indicatorNames,
    indicatorData,
    yesterdayRank,
  });
}

function getGroupList(req, res) {
  // const params = req.query;
  const groupList = [];
  for (let i = 0; i < 10; i += 1) {
    groupList.push({
      id: i,
      name: `服务事业部00${i}`,
    });
  }
  return res.json({ groupList });
}

function getBaseInfo(req, res) {
  // const params = req.query;
  const baseInfo = {
    dayTotal: 25463,
    yesTotal: 23644,
    month: 4657677,
    lastMonth: 2354667,
    remainRate: 45.33,
    repeatRate: 43.33,
  };
  return res.json({ baseInfo });
}

export default {
  'GET /api/chartData': chartData,
  'GET /api/groupList': getGroupList,
  'GET /api/base': getBaseInfo,
};
