import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Popover, Select, notification } from 'antd';

const { Option } = Select;

@connect(({ notice, loading }) => ({
  notice,
  loading: loading.models.gloal,
}))
class WrapPopover extends Component {
  state = {
    clicked: false,
    hovered: false,
    groupId: undefined,
  };

  handleHoverChange = visible => {
    this.setState({
      hovered: visible,
      clicked: false,
    });
  };

  handleClickChange = visible => {
    this.setState({
      clicked: visible,
      hovered: false,
    });
  };

  handleSubmit = () => {
    const { currentUser, invitee, dispatch } = this.props;
    const { groupId } = this.state;
    const { userId, roomId } = currentUser;
    this.setState({
      clicked: false,
      hovered: false,
    });
    dispatch({
      type: 'global/addNotice',
      payload: {
        inviter: userId,
        invitee: invitee.userId,
        groupId,
        roomId,
      },
      callback: response => {
        if (!response.success) {
          notification.error({
            message: '邀请用户失败',
            description: response.message,
          });
        }
        dispatch({
          type: 'list/fetch',
        });
      },
    });
  };

  handleCancel = () => {
    this.setState({
      clicked: false,
      hovered: false,
    });
  };

  handleChange = groupId => {
    this.setState({
      groupId,
    });
  };

  render() {
    const { status, currentUser } = this.props;
    const { hovered, clicked } = this.state;
    let content = '';
    let title = '';
    let trigger = '';
    let visible;
    let onVisibleChange;
    if (currentUser.status === 2) {
      title = '确认框';
      trigger = 'click';
      visible = clicked;
      onVisibleChange = this.handleClickChange;
      content = (
        <div style={{ width: 280 }}>
          <span>
            邀请该用户加入：
            <Select
              defaultVulue={-1}
              style={{ width: 120, marginBottom: 10 }}
              onChange={this.handleChange}
            >
              <Option value={currentUser.groupId}>同组</Option>
              <Option value={-1}>PK组</Option>
            </Select>
          </span>
          <div style={{ textAlign: 'right' }}>
            <Button
              style={{ height: 25, width: 50, marginRight: 10, textAlign: 'center' }}
              onClick={this.handleCancel}
            >
              取消
            </Button>
            <Button
              style={{ height: 25, width: 50, textAlign: 'center' }}
              onClick={this.handleSubmit}
            >
              确认
            </Button>
          </div>
        </div>
      );
    } else {
      title = '提示框';
      trigger = 'hover';
      visible = hovered;
      onVisibleChange = this.handleHoverChange;
      content = <div>你尚未在PK中，请先加入房间中</div>;
    }

    return (
      <Popover
        style={{ width: 800 }}
        content={content}
        title={title}
        trigger={trigger}
        visible={visible}
        onVisibleChange={onVisibleChange}
      >
        <Button>{status}</Button>
      </Popover>
    );
  }
}

export default WrapPopover;
