import numeral from 'numeral';
import ChartCard from './ChartCard';
import Field from './Field';
import Bar from './Bar';
import StackedColumn from './StackedColumn';
import ClusteredStacked from './ClusteredStacked'

const yuan = val => `¥ ${numeral(val).format('0,0')}`;

const Charts = {
  yuan,
  Bar,
  ChartCard,
  Field,
  StackedColumn,
  ClusteredStacked
};

export {
  Charts as default,
  yuan,
  Bar,
  ChartCard,
  Field,
  StackedColumn,
  ClusteredStacked,
};
