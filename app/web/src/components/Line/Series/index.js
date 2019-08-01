import { Component } from 'react';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
} from 'bizcharts';
import DataSet from '@antv/data-set';
import styles from '../index.less';

class Series extends Component {
  render() {
    const {
      title,
      titleMap,
      height,
      data: sourceData,
      borderWidth = 2,
      padding,
      forceFit = true,
    } = this.props;
    const data = Array.isArray(sourceData) ? sourceData : [{ x: 0, y1: 0, y2: 0 }];

    const yMap = (newRow, row, titleMap, data) => {
      let max = 0;
      if (titleMap.y1) {
        newRow[titleMap.y1] = row.y1;
      }
      if (titleMap.y2) {
        newRow[titleMap.y2] = row.y2;
      }
      if (titleMap.y3) {
        newRow[titleMap.y3] = row.y3;
      }
      if (titleMap.y4) {
        newRow[titleMap.y4] = row.y4;
      }
      if (titleMap.y5) {
        newRow[titleMap.y5] = row.y5;
      }
      if (titleMap.y6) {
        newRow[titleMap.y6] = row.y6;
      }
      if (titleMap.y7) {
        newRow[titleMap.y7] = row.y7;
      }
      if (titleMap.y8) {
        newRow[titleMap.y8] = row.y8;
      }
      return {
        newRow: newRow,
        max: max
      };
    }

    let max = yMap({}, {}, {}, data).max || 0;

    const ds = new DataSet();
    const dv = ds.createView()

    const fields = [];
    for (let i in titleMap) {
      fields.push(titleMap[i]);
    }

    dv.source(data)
    .transform({
      type: 'map',
      callback(row) {
        const newRow = { ...row };  
        return yMap(newRow, row, titleMap, data).newRow;
      } 
    })
    .transform({
      type: "fold",
      fields: fields,
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
          <Axis name="x" />
          <Axis
            name="value"
            label={{
              formatter: val => `${val}k`
            }}
          />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom
            type="line"
            position="x*value"
            size={borderWidth}
            color={"key"}
          />
          <Geom
            type="point"
            position="x*value"
            size={4}
            shape={"circle"}
            color={"key"}
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
          />
        </Chart>
      </div>
    )
  }

}

export default Series;
