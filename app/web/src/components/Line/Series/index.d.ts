import React from 'react';

export interface ISeriesProps {
  data: Array<{
    x: number;
    y1: number;
    y2?: number;
    y3?: number;
    y4?: number;
    y5?: number;
    y6?: number;
    y7?: number;
    y8?: number;
  }>;
  titleMap: { y1: string; y2?: string };
  padding?: [number, number, number, number];
  height?: number;
  style?: React.CSSProperties;
  title: string,
  titleLen?: number,
}

export default class Series extends React.Component<ISeriesProps, any> {}