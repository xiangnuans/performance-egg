import React, { Suspense, lazy, PureComponent } from 'react';
import { Card, Row, Col } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './Profile.less';

const WrapSeries = lazy(() => import('./WrapSeries'));
const StackedColumn = lazy(() => import('./Stackedcolumn'));

class BasicProfile extends PureComponent {
  render() {
    const { loading, vsDay, vsName, vsMonth, vsFans, basicList } = this.props;
    const bs = (basic, span) => (
      <div>
        <Col xl={span} lg={span} md={span} sm={12} xs={12}>
          <Card
            style={{ marginTop: 35 }}
            bordered={false}
            cover={
              <div style={{ textAlign: 'center' }} className={styles.cardAvatar}>
                {basic.nickName}
              </div>
            }
          >
            <Card.Meta
              title={<div style={{ textAlign: 'center' }}>{basic.nickName}</div>}
              description={
                <div style={{ textAlign: 'center' }}>
                  {basic.department}
                  <p>{basic.grade}</p>
                </div>
              }
            />
          </Card>
        </Col>
        <Col xl={span} lg={span} md={span} sm={12} xs={12}>
          <Card bordered={false} style={{ height: 203 }}>
            <p>业绩：{basic.performance}</p>
            <p>设备：{basic.deviceCnt}</p>
            <p>粉丝：{basic.fans}</p>
            <p>留存率： {basic.remainRate}</p>
            <p>复购率：{basic.repeatRate}</p>
            <p>胜率：{basic.winRate}</p>
          </Card>
        </Col>
      </div>
    );

    const base = list => {
      const len = list.length;
      switch (len) {
        case 1:
          return (
            <Row gutter={24} style={{ marginTop: 20 }}>
              <Col span={12}>
                <Card
                  bordered={false}
                  cover={
                    <div
                      style={{ textAlign: 'center', fontSize: 36 }}
                      className={styles.cardAvatar}
                    >
                      {list[0].nickName}
                    </div>
                  }
                >
                  <Card.Meta
                    title={<div style={{ textAlign: 'center' }}>{list[0].teamName}</div>}
                    description={
                      <div style={{ textAlign: 'center' }}>
                        {list[0].department}
                        <p>{list[0].grade}</p>
                      </div>
                    }
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card bordered={false} style={{ height: 203 }}>
                  <p>业绩：{list[0].performance}</p>
                  <p>设备：{list[0].deviceCnt}</p>
                  <p>粉丝：{list[0].fans}</p>
                </Card>
              </Col>
              <Col span={6}>
                <Card bordered={false} style={{ height: 203 }}>
                  <p>留存率： {list[0].remainRate}</p>
                  <p>复购率：{list[0].repeatRate}</p>
                  <p>胜率：{list[0].winRate}</p>
                </Card>
              </Col>
            </Row>
          );
        case 2:
          return (
            <Row gutter={24}>
              <Col span={3} style={{ marginTop: 35 }}>
                <Card
                  bordered={false}
                  cover={
                    <div
                      style={{ textAlign: 'center', fontSize: 36 }}
                      className={styles.cardAvatar}
                    >
                      {list[0].nickName}
                    </div>
                  }
                >
                  <Card.Meta
                    title={<div style={{ textAlign: 'center' }}>{list[0].teamName}</div>}
                    description={
                      <div style={{ textAlign: 'center' }}>
                        {list[0].department}
                        <p>{list[0].grade}</p>
                      </div>
                    }
                  />
                </Card>
              </Col>
              <Col span={4}>
                <Card bordered={false}>
                  <p>业绩：{list[0].performance}</p>
                  <p>设备：{list[0].deviceCnt}</p>
                  <p>粉丝：{list[0].fans}</p>
                  <p>留存率： {list[0].remainRate}</p>
                  <p>复购率：{list[0].repeatRate}</p>
                  <p>胜率：{list[0].winRate}</p>
                </Card>
              </Col>
              <Col span={3}>
                <Card bordered={false} style={{ marginTop: 130 }}>
                  <p>胜率：{list[0].winRate}</p>
                </Card>
              </Col>
              <Col
                span={4}
                style={{
                  textAlign: 'center',
                  marginTop: 60,
                  padding: 4,
                  fontSize: 64,
                  color: 'Darkorange',
                }}
              >
                VS
              </Col>
              <Col span={3}>
                <Card bordered={false} style={{ marginTop: 130 }}>
                  <p>胜率：{list[1].winRate}</p>
                </Card>
              </Col>
              <Col span={4}>
                <Card bordered={false}>
                  <p>业绩：{list[1].performance}</p>
                  <p>设备：{list[1].deviceCnt}</p>
                  <p>粉丝：{list[1].fans}</p>
                  <p>留存率： {list[1].remainRate}</p>
                  <p>复购率：{list[1].repeatRate}</p>
                  <p>胜率：{list[1].winRate}</p>
                </Card>
              </Col>
              <Col span={3} style={{ marginTop: 35 }}>
                <Card
                  bordered={false}
                  cover={
                    <div
                      style={{ textAlign: 'center', fontSize: 36 }}
                      className={styles.cardAvatar}
                    >
                      {list[1].nickName}
                    </div>
                  }
                >
                  <Card.Meta
                    title={<div style={{ textAlign: 'center' }}>{list[1].teamName}</div>}
                    description={
                      <div style={{ textAlign: 'center' }}>
                        {list[1].department}
                        <p>{list[1].grade}</p>
                      </div>
                    }
                  />
                </Card>
              </Col>
            </Row>
          );
        case 3:
          return <Row gutter={24}>{list.map(basic => bs(basic, 4))}</Row>;
        case 4:
          return <Row gutter={24}>{list.map(basic => bs(basic, 3))}</Row>;
        case 5:
          return (
            <div>
              <Row gutter={24}>{list.slice(0, 2).map(basic => bs(basic, 6))}</Row>
              <Row gutter={24}>{list.slice(2, 5).map(basic => bs(basic, 4))}</Row>
            </div>
          );
        case 6:
          return (
            <div>
              <Row gutter={24}>{list.slice(0, 3).map(basic => bs(basic, 4))}</Row>
              <Row gutter={24}>{list.slice(3, 6).map(basic => bs(basic, 4))}</Row>
            </div>
          );
        case 7:
          return (
            <div>
              <Row gutter={24}>{list.slice(0, 3).map(basic => bs(basic, 4))}</Row>
              <Row gutter={24}>{list.slice(3, 7).map(basic => bs(basic, 3))}</Row>
            </div>
          );
        default:
          return (
            <div>
              <Row gutter={24}>{list.slice(0, 4).map(basic => bs(basic, 3))}</Row>
              <Row gutter={24}>{list.slice(4, 8).map(basic => bs(basic, 3))}</Row>
            </div>
          );
      }
    };
    return (
      <GridContent>
        <Card hoverable style={{ marginBottom: 24 }}>
          {base(basicList)}
        </Card>
        <Suspense fallback={null}>
          <Row>
            <WrapSeries
              data={vsDay}
              nameList={vsName}
              loading={loading}
              title="Day"
              titleId="app.profile.day"
            />
          </Row>
        </Suspense>
        <Suspense fallback={null}>
          <Row style={{ marginBottom: 24 }}>
            <StackedColumn
              data={vsFans}
              nameList={vsName}
              loading={loading}
              title="日均单粉"
              titleId="app.profile.dayFans"
            />
          </Row>
        </Suspense>
        <Suspense fallback={null}>
          <Row>
            <WrapSeries
              data={vsMonth}
              nameList={vsName}
              loading={loading}
              title="Month"
              titleId="app.profile.month"
            />
          </Row>
        </Suspense>
      </GridContent>
    );
  }
}

export default BasicProfile;
