import React, { memo } from 'react';
import { Col, Card } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import styles from './Profile.less';
import { Bar } from '@/components/Charts';

const Column = memo(({ data, loading, title, titleId }) => (
  <Card
    hoverable
    style={{ height: 330, marginBottom: 24 }}
    loading={loading}
    bodyStyle={{ padding: 0 }}
  >
    <div className={styles.salesCard}>
      <Col>
        <div className={styles.salesBar}>
          <Bar
            height={285}
            title={<FormattedMessage id={titleId} defaultMessage={title} />}
            data={data}
          />
        </div>
      </Col>
    </div>
  </Card>
));

export default Column;
