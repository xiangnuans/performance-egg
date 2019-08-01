import React from 'react';

export interface IBasicProps {
  color?: string;
  height: number;
  data: Array<{
    x: number | string;
    y: number;
  }>;
  style?: React.CSSProperties;
  title: string,
}

export default class Basic extends React.Component<IBasicProps, any> {}