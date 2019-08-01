import React, { Component, Suspense, lazy } from 'react';
import { connect } from 'dva';
import { Row, Col, DatePicker, Select, Tooltip, Icon } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import moment from 'moment';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import PageLoading from '@/components/PageLoading';
import { getCurrentDate } from '@/utils/utils';
import { ChartCard } from '@/components/Charts';
import Yuan from '@/utils/Yuan';
import Trend from '@/components/Trend';
import styles from './View.less';

const ClusteredStack = lazy(() => import('./ClueteredStack'));
const Column = lazy(() => import('../Profile/Column'));
const { Option } = Select;

@connect(({ view, loading }) => ({
  view,
  loading: loading.models.view,
}))
class Analysis extends Component {
  state = {
    currentGroup: '0',
    datePickerValue: getCurrentDate(),
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { currentGroup, datePickerValue } = this.state;
    const date = moment(datePickerValue).format('YYYY-MM-DD');
    dispatch({
      type: 'view/fetchChart',
      payload: {
        teamId: currentGroup,
        date,
      },
    });
    dispatch({
      type: 'view/fetchGroup',
    });
    dispatch({
      type: 'view/fetchBase',
      payload: {
        teamId: currentGroup,
        date,
      },
    });
  }

  handleGroupChange = currentGroup => {
    const { datePickerValue } = this.state;
    const { dispatch } = this.props;
    this.setState({
      currentGroup,
    });
    const date = moment(datePickerValue).format('YYYY-MM-DD');
    dispatch({
      type: 'view/fetchChart',
      payload: {
        teamId: currentGroup,
        date,
      },
    });
    dispatch({
      type: 'view/fetchBase',
      payload: {
        teamId: currentGroup,
        date,
      },
    });
  };

  handlleDatePickerChange = datePickerValue => {
    const { currentGroup } = this.state;
    const { dispatch } = this.props;
    this.setState({
      datePickerValue,
    });
    const date = moment(datePickerValue).format('YYYY-MM-DD');
    dispatch({
      type: 'view/fetchChart',
      payload: {
        teamId: currentGroup,
        date,
      },
    });
    dispatch({
      type: 'view/fetchBase',
      payload: {
        teamId: currentGroup,
        date,
      },
    });
  };

  render() {
    const { datePickerValue, currentGroup } = this.state;
    const { view, loading } = this.props;
    const { indicatorNames, indicatorData, yesterdayRank, groupList, baseInfo } = view;
    const compare = (current, last, id, defaultMessage) => {
      const dayThan = current ? ((Math.abs(current - last) / current) * 100).toFixed(2) : 0;
      if (current - last < 0) {
        return (
          <Trend flag="down" style={{ textAlign: 'right' }}>
            <FormattedMessage id={id} defaultMessage="Day Changes" />
            <span className={styles.trendText}>{`${dayThan}%`}</span>
          </Trend>
        );
      }
      return (
        <Trend flag="up" style={{ textAlign: 'right' }}>
          <FormattedMessage id="app.analysis.yesterday" defaultMessage={defaultMessage} />
          <span className={styles.trendText}>{`${dayThan}%`}</span>
        </Trend>
      );
    };
    return (
      <GridContent>
        <Suspense fallback={<PageLoading />}>
          <Row style={{ marginBottom: 24 }}>
            <ChartCard bordered={false} contentHeight={10}>
              <DatePicker
                defaultValue={datePickerValue}
                format="YYYY-MM-DD"
                style={{ width: 256 }}
                onChange={this.handlleDatePickerChange}
              />
              <Select
                style={{ float: 'right', width: 196 }}
                defaultValue={currentGroup}
                onChange={this.handleGroupChange}
              >
                <Option key={0}>全员</Option>
                {groupList.map(item => (
                  <Option key={item.id}>{item.name}</Option>
                ))}
              </Select>
            </ChartCard>
          </Row>
          <Row gutter={24}>
            <Col xl={6} lg={6} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
              <ChartCard
                bordered={false}
                title={<FormattedMessage id="app.analysis.daySales" defaultMessage="Day Sales" />}
                loading={loading}
                action={
                  <Tooltip
                    title={
                      <FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />
                    }
                  >
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={() => <Yuan>{baseInfo.dayTotal}</Yuan>}
                contentHeight={46}
              >
                {compare(
                  baseInfo.dayTotal,
                  baseInfo.yesTotal,
                  'app.analysis.yesterday',
                  'Day Changes',
                )}
              </ChartCard>
              <ChartCard
                bordered={false}
                title={
                  <FormattedMessage id="app.analysis.monthSales" defaultMessage="Month Sales" />
                }
                loading={loading}
                total={() => <Yuan>{baseInfo.month}</Yuan>}
                footer={
                  <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    <Trend style={{ marginRight: 16 }}>
                      {
                        <FormattedMessage
                          id="app.analysis.remainRate"
                          defaultMessage="Remain Rate"
                        />
                      }
                      <span className={styles.trendText}>{`${baseInfo.remainRate}%`}</span>
                    </Trend>
                    <Trend>
                      {
                        <FormattedMessage
                          id="app.analysis.repeatRate"
                          defaultMessage="Repeat Rate"
                        />
                      }
                      <span className={styles.trendText}>{`${baseInfo.repeatRate}%`}</span>
                    </Trend>
                  </div>
                }
                contentHeight={46}
              >
                {compare(
                  baseInfo.month,
                  baseInfo.lastMonth,
                  'app.analysis.monthSales',
                  'Month Change',
                )}
              </ChartCard>
            </Col>
            <Col xl={18} lg={18} md={24} sm={24} xs={24}>
              <Column
                data={yesterdayRank}
                loading={loading}
                title="前一天业绩排名"
                titleId="app.analysis.preTodayRank"
              />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col>
              <ClusteredStack
                data={indicatorData}
                loading={loading}
                title="当日个人各项指标统计"
                titleId="app.analysis.todayRank"
                indicatorNames={indicatorNames}
              />
            </Col>
          </Row>
        </Suspense>
      </GridContent>
    );
  }
}

export default Analysis;
