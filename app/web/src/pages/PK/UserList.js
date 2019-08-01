import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, Badge, Popover } from 'antd';
import StandardTable from '@/components/StandardTable';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './UserList.less';
import WrapPopover from './WrapPopover';
import BasicProfile from '@/pages/Profile/BasicProfile';

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const rank = ['黄金', '王者', '白银', '青铜'];
const rankMap = ['huangjing', 'wangzhe', 'baiyin', 'default'];
const status = ['邀请加入', '被邀请中', '正在PK'];

@connect(({ list, user, profile, loading }) => ({
  currentUser: user.currentUser,
  list,
  loading: loading.models.list,
  profile,
  profileLoading: loading.models.profile,
}))
@Form.create()
class UserList extends PureComponent {
  state = {
    formValues: {},
    visible: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetch',
      payload: {},
    });
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'list/fetch',
      payload: {},
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'list/fetch',
        payload: values,
      });
    });
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.pageIndex,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'list/fetch',
      payload: params,
    });
  };

  handleStatus = (val, record) => {
    switch (val) {
      case 0:
        return <WrapPopover status={status[0]} invitee={record} {...this.props} />;
      case 1:
        return <WrapPopover status={status[1]} invitee={record} {...this.props} />;
      default:
        return <Button disabled>{status[2]}</Button>;
    }
  };

  showModal = item => {
    const { dispatch } = this.props;
    this.setState({
      visible: true,
    });
    dispatch({
      type: 'profile/fetch',
      payload: {
        userId: item.userId,
      },
    });
    dispatch({
      type: 'profile/basic',
      payload: {
        userId: item.userId,
      },
    });
  };

  handleVisibleChange = visible => {
    this.setState({
      visible,
    });
  };

  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <Form.Item label="姓名">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      list: { data },
      profile,
      loading,
      profileLoading,
    } = this.props;
    const { visible } = this.state;
    const { dayProduce, fans, monthProduce, basic } = profile;
    const columns = [
      // {
      //   title: '头像',
      //   dataIndex: 'avatar',
      //   render: (text, record) => (
      //     <img
      //       alt={record.nickName}
      //       src={text}
      //       style={{ width: 50, height: 50, borderRadius: 50 }}
      //       onClick={() => {
      //         this.showModal(record);
      //       }}
      //     />
      //   ),
      // },
      {
        title: '姓名',
        dataIndex: 'nickName',
        render: (text, record) => (
          <Fragment>
            <a
              onClick={e => {
                e.preventDefault();
                this.showModal(record);
              }}
            >
              {text}
            </a>
          </Fragment>
        ),
      },
      {
        title: '等级',
        dataIndex: 'rank',
        filters: [
          {
            text: rank[0],
            value: 0,
          },
          {
            text: rank[1],
            value: 1,
          },
          {
            text: rank[2],
            value: 2,
          },
          {
            text: rank[3],
            value: 3,
          },
        ],
        render(val) {
          return <Badge status={rankMap[val]} text={rank[val]} />;
        },
      },
      {
        title: '胜率',
        dataIndex: 'winRate',
        sorter: true,
        render: val => `${val}%`,
      },
      {
        title: '业绩',
        dataIndex: 'performance',
      },
      {
        title: '粉丝数',
        dataIndex: 'fans',
        sorter: true,
      },
      {
        title: '积分',
        dataIndex: 'integral',
        sorter: true,
      },
      {
        title: '操作',
        dataIndex: 'status',
        render: (text, record) => <Fragment>{this.handleStatus(text, record)}</Fragment>,
      },
    ];
    return (
      <GridContent>
        <Card bordered={false} title="人员列表">
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <StandardTable
              loading={loading}
              rowKey={record => record.userId}
              data={data}
              columns={columns}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <Popover
          overlayStyle={{ width: '75%' }}
          placement="topLeft"
          arrowPointAtCenter
          content={
            <BasicProfile
              loading={profileLoading}
              dayProduce={dayProduce}
              fans={fans}
              monthProduce={monthProduce}
              basic={basic}
            />
          }
          title="个人详情"
          trigger="hover"
          visible={visible}
          onVisibleChange={this.handleVisibleChange}
        />
      </GridContent>
    );
  }
}

export default UserList;
