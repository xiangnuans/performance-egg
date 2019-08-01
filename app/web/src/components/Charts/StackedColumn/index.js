import { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';
import styles from '../index.less';


let nowDate = new Date();
let cloneNowDate = new Date();
let fullYear = nowDate.getFullYear();
let month = nowDate.getMonth() + 1; // getMonth 方法返回 0-11，代表1-12月
let endOfMonth = new Date(fullYear, month, 0).getDate(); // 获取本月最后一天
function getFullDate(targetDate) {
  var D, y, m, d;
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
  m = m > 9 ? m : '0' + m;
  d = d > 9 ? d : '0' + d;
  return y + '-' + m + '-' + d;
};

const startDate = getFullDate(cloneNowDate.setDate(1)) // 当月第一天
const endDate = getFullDate(cloneNowDate.setDate(endOfMonth));//当月最后一天
const dayLength = endDate.substr(8);
const dateData = [];
for (let i = 1; i<= dayLength; i += 1) {
  const d = getFullDate(cloneNowDate.setDate(i)).substr(5)
  dateData.push(d);
}

class StackedColumn extends Component {
  render() {
    const {
      title,
      titleMap,
      height,
      data: sourceData,
      borderWidth = 2,
      padding,
      forceFit = true
    } = this.props;

    const yMap = (i, defaultData, data, dateData, sourceData) => {
      if(titleMap.y1) {
        defaultData.push({});
        defaultData[0][dateData[i]] = 0;
        data.push({});
        data[0][dateData[i]] = sourceData[i].y1 || 0;
        data[0]["name"] = titleMap.y1;
      }
      if (titleMap.y2) {
        defaultData.push({});
        defaultData[1][dateData[i]] = 0;
        data.push({});
        data[1][dateData[i]] = sourceData[i].y2 || 0;
        data[1]["name"] = titleMap.y2;
      }
      if (titleMap.y3) {
        defaultData.push({});
        defaultData[2][dateData[i]] = 0;
        data.push({});
        data[2][dateData[i]] = sourceData[i].y3 || 0;
        data[2]["name"] = titleMap.y3;
      }
      if (titleMap.y4) {
        defaultData.push({});
        data.push({});
        defaultData[3][dateData[i]] = 0;
        data[3][dateData[i]] = sourceData[i].y4 || 0;
        data[3]["name"] = titleMap.y4;
      }
      if (titleMap.y5) {
        defaultData.push({});
        data.push({});
        defaultData[4][dateData[i]] = 0;
        data[4][dateData[i]] = sourceData[i].y5 || 0;
        data[4]["name"] = titleMap.y5;
      }
      if (titleMap.y6) {
        defaultData.push({});
        data.push({});
        defaultData[5][dateData[i]] = 0;
        data[5][dateData[i]] = sourceData[i].y6 || 0;
        data[5]["name"] = titleMap.y6;
        
      }
      if (titleMap.y7) {
        defaultData.push({});
        data.push({});
        defaultData[6][dateData[i]] = 0;
        data[6][dateData[i]] = sourceData[i].y7 || 0;
        data[6]["name"] = titleMap.y7;
      }
      if (titleMap.y8) {
        defaultData.push({});
        data.push({});
        defaultData[7][dateData[i]] = 0;
        data[7][dateData[i]] = sourceData[i].y8 || 0;
        data[7]["name"] = titleMap.y8;
      }
      return {
        defaultData: defaultData,
        data: data,
      };
    }

    let defaultData = [];
    for (let i = 0; i < dayLength; i += 1) {
      defaultData = yMap(i, defaultData, [], dateData, sourceData).defaultData;
    }

    let data = [];
    if (Array.isArray(sourceData)) {
      for (let i = 0; i < dayLength; i += 1) {
          data = yMap(i, [], data, dateData, sourceData).data;
      }
    }

    const ds = new DataSet();
    const dv = ds.createView()

    dv.source(data)
    .transform({
      type: "fold",
      fields: dateData,
      // 展开字段集
      key: 'key',
      value: 'value'
    })
    
    return (
      <div className={styles.chart} style={{ height }}>
        {title && <h4 style={{ marginBottom: 20 }}>{title}</h4>}
        <Chart
          height={title ? height - 41 : height}
          data={dv}
          forceFit={forceFit}
          padding={ padding || 'auto'}
        >
          <Legend />
          <Axis name="key" />
          <Axis name="value" />
          <Tooltip />
          <Geom
            type="intervalStack"
            position="key*value"
            color={"name"}
            style = {{
              stroke: "#fff",
              lineWidth: 1
            }}
          />
        </Chart>
      </div>
    )
  }
}

export default StackedColumn;