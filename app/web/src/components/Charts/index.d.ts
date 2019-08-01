import * as numeral from 'numeral';
import { default as Bar } from './Bar';
import { default as ChartCard } from './ChartCard';
import { default as Field } from './Field';

declare const yuan: (value: number | string) => string;

declare const Charts: {
  yuan: (value: number | string) => string;
  Bar: Bar;
  ChartCard: ChartCard;
  Field: Field;
};

export {
  Charts as default,
  yuan,
  Bar,
  ChartCard,
  Field,
};
