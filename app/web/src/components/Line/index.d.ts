import * as numeral from 'numeral';
import { default as Basic } from './Basic';
import { default as Series } from './Series';

declare const yuan: (value: number | string) => string;

declare const Lines: {
  Basic: Basic;
  Series: Series;
};

export {
  Lines as default,
  Basic,
  Series,
};
