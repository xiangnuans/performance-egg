import React, { memo } from 'react';
import { Col, Card } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import styles from './View.less';
import { ClusteredStacked } from '@/components/Charts';

const ClusteredStack = memo(({ data, loading, title, titleId, indicatorNames }) => (
  <Card hoverable style={{ height: 390 }} loading={loading} bodyStyle={{ padding: 0 }}>
    <div className={styles.salesCard}>
      <Col>
        <div className={styles.salesBar}>
          <ClusteredStacked
            height={360}
            title={<FormattedMessage id={titleId} defaultMessage={title} />}
            indicatorNames={indicatorNames}
            data={data}
          />
        </div>
      </Col>
    </div>
  </Card>
));

export default ClusteredStack;
