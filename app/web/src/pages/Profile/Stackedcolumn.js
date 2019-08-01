import React, { memo } from 'react';
import { Col, Card } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import styles from './Profile.less';
import { StackedColumn } from '@/components/Charts';
import { yMap } from '@/utils/utils';

const Line = memo(({ data, nameList, loading, title, titleId }) => (
  <Card hoverable style={{ height: 330 }} loading={loading} bodyStyle={{ padding: 0 }}>
    <div className={styles.salesCard}>
      <Col>
        <div className={styles.salesBar}>
          <StackedColumn
            height={285}
            title={<FormattedMessage id={titleId} defaultMessage={title} />}
            titleMap={yMap(data, nameList)}
            data={data}
          />
        </div>
      </Col>
    </div>
  </Card>
));

export default Line;
