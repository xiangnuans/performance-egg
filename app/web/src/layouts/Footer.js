import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2019杭州微点网络科技有限公司版权所有浙ICP备16025731号-1
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
