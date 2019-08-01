import React, { memo } from 'react';
import { Col, Card } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import styles from './Profile.less';
import { Basic } from '@/components/Line';

const Line = memo(({ data, loading, title, titleId }) => (
  <Card hoverable style={{ height: 330 }} loading={loading} bodyStyle={{ padding: 0 }}>
    <div className={styles.salesCard}>
      <Col>
        <div className={styles.salesBar}>
          <Basic
            height={285}
            title={<FormattedMessage id={titleId} defaultMessage={title} />}
            data={data}
          />
        </div>
      </Col>
    </div>
  </Card>
));

export default Line;
