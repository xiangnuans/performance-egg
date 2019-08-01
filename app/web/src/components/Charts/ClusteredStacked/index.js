import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';
import styles from '../index.less';
/**
 * 分组层叠柱状图
 */
class ClusteredStacked extends Component {
  render() {
    const { title, height, data, padding, forceFit = true, indicatorNames } = this.props;

    const { DataView } = DataSet;
    const dv = new DataView();
    dv.source(data)
      .transform({
        type: 'fold',
        fields: indicatorNames,
        // 展开字段集
        key: 'key',
        value: 'value',
        retains: ['name'],
      })
      .transform({
        type: 'map',
        callback: obj => {
          const key = obj.key;
          let type;

          if (key === indicatorNames[0]) {
            type = 'a';
          } else if (key === indicatorNames[1]) {
            type = 'b';
          } else if (key === indicatorNames[2]) {
            type = 'c';
          } else {
            type = 'd';
          }
          obj.type = type;
          return obj;
        },
      });

    const colorMap = {};
    const color = ['#209BDD', '#E3F4BF', '#BEF7C8', '#86E6C8', '#36CFC9', '#FF9900'];
    for (let i = 0; i < indicatorNames.length; i += 1) {
      colorMap[indicatorNames[i]] = color[i];
    }

    const defaultScales = {
      population: {
        tickInterval: 1000000,
      },
    };
    return (
      <div className={styles.chart} style={{ height }}>
        {title && <h4 style={{ marginBottom: 20 }}>{title}</h4>}
        <Chart
          height={title ? height - 41 : height}
          data={dv}
          forceFit={forceFit}
          padding={padding || 'auto'}
          scale={defaultScales}
        >
          <Legend />
          <Axis name="value" />
          <Tooltip />
          <Geom
            type="interval"
            position="name*value"
            color={[
              'key',
              function(key) {
                return colorMap[key];
              },
            ]}
            tooltip={[
              'key*value',
              (key, value) => {
                return {
                  name: key,
                  value: value,
                };
              },
            ]}
            adjust={[
              {
                type: 'dodge',
                dodgeBy: 'type',
                marginRatio: 0,
              },
              {
                type: 'stack',
              },
            ]}
          />
        </Chart>
      </div>
    );
  }
}

export default ClusteredStacked;
