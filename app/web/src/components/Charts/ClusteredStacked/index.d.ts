import React from 'react';

export interface IStackedColumnProps {
  data: Array<{
    x: number;
    y1: number;
    y2?: number;
  }>;
  padding?: [number, number, number, number];
  height?: number;
  style?: React.CSSProperties;
  title: string,
  indicatorName?: Array<string>
}

export default class Series extends React.Component<IStackedColumnProps, any> {}