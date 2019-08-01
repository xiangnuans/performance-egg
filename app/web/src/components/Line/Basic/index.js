import { Component } from 'react';
import { G2, Chart, Geom, Axis, Tooltip, Goord, Label, Legend } from 'bizcharts';
import styles from '../index.less';

class Basic extends Component {
  render() {
    const {
      height = 285,
      data = [],
      forceFit = true,
      color = '#1890FF',
      title,
      padding
    } = this.props;
    const defaultScales = {
      y: {
        min: 0
      },
      x: {
        range: [0, 1]
      }
    }; 

    return (
      <div className={styles.chart} style={{ height }}>
        {title && <h4 style={{ marginBottom: 20 }}>{title}</h4>}
        <Chart 
          padding={padding || 'auto'}
          height={title ? height - 41 : height}
          data={data}
          scale={defaultScales}
          forceFit={forceFit}>
          <Axis name="x" />
          <Axis name="y" />
          <Tooltip crosshairs={{
            type: "y"
          }}/>
          <Geom type="line" position="x*y" color={color} size={2}/>
          <Geom
            type="point"
            position="x*y"
            color={color}
            size={4}
            shape="circle"
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

export default Basic;

