import React, { Suspense, lazy, PureComponent } from 'react';
import { Card, Row, Col } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './Profile.less';

const Column = lazy(() => import('./Column'));
const Line = lazy(() => import('./Line'));

class BasicProfile extends PureComponent {
  render() {
    const { loading, dayProduce, fans, monthProduce, basic } = this.props;
    return (
      <GridContent>
        <Card hoverable style={{ marginBottom: 24 }}>
          <Row gutter={24}>
            <Col span={8}>
              <Card
                hoverable
                bordered={false}
                cover={
                  <div style={{ textAlign: 'center', fontSize: 36 }} className={styles.cardAvatar}>
                    {basic.nickName}
                  </div>
                }
              >
                <Card.Meta
                  title={<div style={{ textAlign: 'center' }}>{basic.teamName}</div>}
                  description={<div style={{ textAlign: 'center' }}>{basic.department}</div>}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false} style={{ height: 181 }}>
                <p>业绩：{basic.performance}</p>
                <p>设备：{basic.deviceCnt}</p>
                <p> 粉丝：{basic.fans}</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false}>
                <p>留存率： {basic.remainRate}</p>
                <p>复购率：{basic.repeatRate}</p>
                <p>胜率：{basic.winRate}</p>
              </Card>
            </Col>
          </Row>
        </Card>
        <Suspense fallback={null}>
          <Row style={{ marginBottom: 24 }}>
            <Line data={dayProduce} loading={loading} title="Day" titleId="app.profile.day" />
          </Row>
        </Suspense>
        <Suspense fallback={null}>
          <Row style={{ marginBottom: 24 }}>
            <Column data={fans} loading={loading} title="日均单粉" titleId="app.profile.dayFans" />
          </Row>
        </Suspense>
        <Suspense fallback={null}>
          <Row>
            <Line data={monthProduce} loading={loading} title="Month" titleId="app.profile.month" />
          </Row>
        </Suspense>
      </GridContent>
    );
  }
}

export default BasicProfile;
