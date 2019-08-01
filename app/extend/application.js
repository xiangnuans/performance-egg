'use strict';

// const { Producer, Consumer } = require('ali-ons');

module.exports = {
  /**
   * 取消消息订阅
   * @param {String} topic
   */
  // unsubscribe(topic) {
  //   this.mqtt.unsubscribe(topic);
  // },
  /**
   * 创建rocketmq 生产者
   */
  // producer() {
  //   const { rocketmq } = this.config;
  //   const producer = new Producer(Object.assign(rocketmq.options, {
  //     nameSrv: rocketmq.nameSrv,
  //     accessKey: rocketmq.accessKey,
  //     secretKey: rocketmq.secretKey,
  //   }));
  //   this.logger.info('【extend.application】: rocketmq 生产者建立连接成功 ');
  //   producer.on('error', (err) => {
  //     this.logger.error('【extend.application】: rocketmq 生产者建立连接失败： ', err);
  //   });
  //   return producer;
  // },
  /**
   * 创建rocketmq 消费者
   */
  // consumer() {
  //   const { rocketmq } = this.config;
  //   const consumer = new Consumer(Object.assign(rocketmq.options, {
  //     nameSrv: rocketmq.nameSrv,
  //     accessKey: rocketmq.accessKey,
  //     secretKey: rocketmq.secretKey,
  //   }));
  //   this.logger.info('【extend.application】: rocketmq 消费者连接成功');
  //   consumer.on('error', (err) => this.app.logger.error('【extend.application】: rocketmq 消费者连接失败', err));
  //   return consumer;
  // },
};
