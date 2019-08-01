import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Row, Col, Icon, List, Popover } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './CardList.less';
import Plus from './Plus';
import VSProfile from '@/pages/Profile/VSProfile';

@connect(({ pk, user, profile, loading }) => ({
  currentUser: user.currentUser,
  pk,
  loading: loading.models.pk,
  profile,
  profileLoading: loading.models.profile,
}))

class CardList extends PureComponent {
  state = {
    visible: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'pk/fetchPKList',
      payload: {},
    });
  }

  showModal = roomId => {
    const { dispatch } = this.props;
    this.setState({
      visible: true,
    });
    dispatch({
      type: 'profile/vsfetch',
      payload: {
        roomId,
      },
    });
    dispatch({
      type: 'profile/basicList',
      payload: {
        roomId,
      },
    });
  };

  handleVisibleChange = visible => {
    this.setState({
      visible,
    });
  };

  handleListChange = pagination => {
    const { dispatch, currentUser } = this.props;
    const params = {
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      userId: currentUser.userId,
    };
    dispatch({
      type: 'pk/fetchPKList',
      payload: params,
    });
  };

  render() {
    const {
      pk: { data },
      profile,
      profileLoading,
      loading,
    } = this.props;
    const { list, pagination } = data;
    const { vsDay, vsName, vsMonth, vsFans, basicList } = profile;
    const { visible } = this.state;
    const listItem = item => {
      let room = 0;
      let userList1 = [];
      let userList2 = [];
      /* eslint-disable */
      for (const i in item) {
        room = i;
        userList1 = item[i][0];
        userList2 = item[i][1];
      }
      /* eslint-disable */

      return {
        roomId: room,
        userListLeft: userList1,
        userListRight: userList2,
      };
    };

    const calculateLayout = userList => {
      switch (userList.length) {
        case 1:
          return {
            card: styles.card1,
            newButton: styles.newButton1,
          };
        case 2:
          return {
            card: styles.card2,
            newButton: styles.newButton2,
          };
        case 3:
          return {
            card: styles.card3,
            newButton: styles.newButton3,
          };
        case 4:
          return {
            card: styles.card4,
            newButton: styles.newButton3,
          };
        default:
          return {
            card: styles.card,
            newButton: styles.newButton,
          };
      }
    };

    const renderCol = (groupId, userList, room) => {
      const dynamicStyle = calculateLayout(userList);
      switch (userList.length) {
        case 1:
        case 2:
          return (
            <List
              rowKey="userId"
              loading={loading}
              dataSource={['', ...userList]}
              renderItem={item =>
                item ? (
                  <List.Item style={{ marginBottom: 0 }}>
                    <Card
                      hoverable
                      style={{ paddingBottom: 0 }}
                      className={dynamicStyle.card}
                      onClick={e => {
                        e.preventDefault();
                        this.showModal(room);
                      }}
                    >
                      <Card.Meta
                        avatar={
                          <div
                            style={{ textAlign: 'center', fontSize: 24 }}
                            className={styles.cardAvatar}
                          >
                            {item.nickName}
                          </div>
                        }
                      />
                    </Card>
                  </List.Item>
                ) : (
                  <Plus
                    roomId={room}
                    groupId={{ groupId }}
                    buttonStyle={dynamicStyle.newButton}
                    {...this.props}
                  />
                )
              }
            />
          );
        case 3:
          return (
            <List
              rowKey="userId"
              loading={loading}
              dataSource={['', ...userList]}
              renderItem={item =>
                item ? (
                  <List.Item>
                    <Col span={12} style={{ paddingLeft: 0, marginTop: -14, marginBottom: 12 }}>
                      <Card
                        hoverable
                        className={dynamicStyle.card}
                        onClick={e => {
                          e.preventDefault();
                          this.showModal(room);
                        }}
                      >
                        <Card.Meta
                          avatar={
                            <div
                              style={{ textAlign: 'center', fontSize: 24 }}
                              className={styles.cardAvatar}
                            >
                              {item.nickName}
                            </div>
                          }
                        />
                      </Card>
                    </Col>
                  </List.Item>
                ) : (
                  <Col span={12} style={{ paddingLeft: 0, marginTop: -14, marginBottom: 12 }}>
                    <Plus
                      roomId={room}
                      groupId={{ groupId }}
                      buttonStyle={dynamicStyle.newButton}
                      {...this.props}
                    />
                  </Col>
                )
              }
            />
          );
        case 4:
          return (
            <List
              rowKey="userId"
              loading={loading}
              dataSource={['', ...userList]}
              renderItem={item =>
                item ? (
                  <List.Item>
                    <Row gutter={24}>
                      <Col>
                        <Card
                          hoverable
                          className={dynamicStyle.card}
                          onClick={e => {
                            e.preventDefault();
                            this.showModal(room);
                          }}
                        >
                          <Card.Meta
                            avatar={
                              <div
                                style={{ textAlign: 'center', fontSize: 24 }}
                                className={styles.cardAvatar}
                              >
                                {item.nickName}
                              </div>
                            }
                          />
                        </Card>
                      </Col>
                    </Row>
                  </List.Item>
                ) : (
                  {}
                )
              }
            />
          );
        default:
          return null;
      }
    };

    const renderItem = item => {
      const itemObj = listItem(item);
      const userListL = itemObj.userListLeft;
      const userListR = itemObj.userListRight;
      const room = itemObj.roomId;
      const listLeftLen = userListL.length;
      const listRightLen = userListR.length;
      return (
        <List.Item key={room}>
          <div style={{ background: '#ECECEC', padding: '15px' }}>
            <Row style={{ height: 248 }} gutter={24}>
              <Col span={10} style={{ height: '100%' }}>
                {listLeftLen !== 0 ? (
                  renderCol(0, userListL, room)
                ) : (
                  <Plus roomId={room} groupId={0} {...this.props} />
                )}
              </Col>
              <Col
                span={4}
                style={{ marginTop: 70, padding: 4, fontSize: 56, color: 'Darkorange' }}
                onClick={e => {
                  e.preventDefault();
                  this.showModal(room);
                }}
              >
                VS
              </Col>
              <Col span={10}>
                {listRightLen !== 0 ? (
                  renderCol(1, userListR, room)
                ) : (
                  <Plus roomId={room} groupId={1} {...this.props} />
                )}
              </Col>
            </Row>
          </div>
        </List.Item>
      );
    };

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const renderRoom = () => {
      return (
        <List.Item>
          <div style={{ background: '#ECECEC', padding: '15px' }}>
            <Row gutter={24}>
              <Col span={10}>
                <Plus isFirst={true} groupId={0} {...this.props} />
              </Col>
              <Col
                span={4}
                style={{ marginTop: 70, padding: 4, fontSize: 56, color: 'Darkorange' }}
              >
                VS
              </Col>
              <Col span={10}>
                <Plus isFirst={true} groupId={1} {...this.props} />
              </Col>
            </Row>
          </div>
        </List.Item>
      );
    };

    const speakText = text => {
      const preUrl = 'http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&text=';
      const url = preUrl.concat(encodeURI(text));
      const audio = new Audio(url);
      audio.src = url;
      audio
        .play()
        .then(_ => {
          console.log('开始语音播报');
        })
        .catch(error => {
          console.log('语音播报错误', error);
        });
    };

    return (
      <GridContent>
        <Card style={{ marginBottom: 24, border: false }} bodyStyle={{ padding: 8 }}>
          <h1>
            <Icon type="sound" /> 温馨提示：您已进入PK大赛 {speakText('温馨提示：您已进入PK大赛')}
          </h1>
        </Card>
        <div className={styles.cardList}>
          <List
            rowKey="roomId"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            onChange={this.handleListChange}
            pagination={paginationProps}
            dataSource={['', ...list]}
            renderItem={item => (item ? renderItem(item) : renderRoom())}
          />
        </div>
        <Popover
          overlayStyle={{ width: '75%' }}
          placement="topLeft"
          arrowPointAtCenter
          content={
            <VSProfile
              loading={profileLoading}
              vsDay={vsDay}
              vsName={vsName}
              vsMonth={vsMonth}
              vsFans={vsFans}
              basicList={basicList}
            />
          }
          title="VS详情"
          trigger="hover"
          visible={visible}
          onVisibleChange={this.handleVisibleChange}
        />
      </GridContent>
    );
  }
}

export default CardList;
