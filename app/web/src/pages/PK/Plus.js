import React, { Component } from 'react';
import { Button, Icon, Modal } from 'antd';
import { findDOMNode } from 'react-dom';
import styles from './CardList.less';
import Result from '@/components/Result';

class Plus extends Component {
  state = {
    visible: false,
    done: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handlleSubmit = (type, groupId, roomId) => {
    const { dispatch, currentUser } = this.props;
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      done: true,
    });
    if (currentUser.status !== 2) {
      dispatch({
        type: 'user/update',
        payload: {
          userId: currentUser.userId,
          status: 2,
          type,
          groupId,
          roomId,
          teamId: currentUser.teamId,
          nickName: currentUser.nickName,
        },
      });
    }
  };

  handleCancel = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      visible: false,
    });
  };

  handleDone = () => {
    const { dispatch, currentUser } = this.props;
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      done: false,
      visible: false,
    });
    dispatch({
      type: 'user/fetch',
    });
    dispatch({
      type: 'pk/fetchPKList',
      payload: {
        userId: currentUser.userId,
      },
    });
  };

  render() {
    const { visible, done } = this.state;
    const { buttonStyle, isFirst = false, groupId, roomId, currentUser } = this.props;
    let type = 0; // 0-普通 1-房主
    if (isFirst) {
      type = 1;
    }
    const getModalContent = user => {
      if (done) {
        return (
          <Result
            type={user.status === 2 ? 'error' : 'success'}
            title={user.status === 2 ? '你已加入PK赛中，无法再次加入' : '加入成功'}
            actions={
              <Button type="primary" onClick={this.handleDone}>
                知道了
              </Button>
            }
            className={styles.formResult}
          />
        );
      }
      return <div>确定加入该PK中？</div>;
    };
    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : {
          okText: '确定',
          onOk: () => {
            this.handlleSubmit(type, groupId, roomId);
          },
          onCancel: this.handleCancel,
        };

    return (
      <div>
        <Button
          type="dashed"
          // eslint-disable-next-line
          className={buttonStyle ? buttonStyle : styles.newButton}
          onClick={this.showModal}
          ref={component => {
            /* eslint-disable */
            this.addBtn = findDOMNode(component);
            /* eslint-enable */
          }}
        >
          <Icon type="plus" />
        </Button>
        <Modal title="确认框" destroyOnClose visible={visible} {...modalFooter}>
          {getModalContent(currentUser)}
        </Modal>
      </div>
    );
  }
}

export default Plus;
