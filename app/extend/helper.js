'use strict';

// const crypto = require('crypto');
const moment = require('moment')

const key = '751f621ea5c8f930';
const iv = '2624750004598718';

module.exports = {
  /**
   * 返回客户端的用户名和密码加密
   */
  // encrypt(text) {
  //   const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  //   let crypted = cipher.update(text, 'utf8', 'hex');
  //   crypted += cipher.final('hex');
  //   crypted = Buffer.from(crypted, 'hex').toString('base64');
  //   return crypted;
  // },
  /**
   * 解密
   * @param {text}
   */
  // decrypt(text) {
  //   const tb = Buffer.from(text, 'base64').toString('hex');
  //   const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
  //   let decoded = decipher.update(tb, 'hex', 'utf8');
  //   decoded += decipher.final('utf8');
  //   return decoded;
  // },
  /**
   * 从clientId中获取usrName或deviceId
   */
  subString(str) {
    return str.subString(str.indexOf('@') + 3);
  },
  /**
   * 服务中类型定义
   */
  getType() {
    const type = {
      USER_STATUS: {
        PKING: 2,
        INIT: 0,
        INVITING: 1,
      },
      USER_TYPE: {
        ROOM_OWNER: 1,
        ORDINARY: 0,
      },
      USER_GROUP: {
        LEFT: 0,
        INIT: -1,
        RIGHT: 1,
      },
      USER_RANK: {
        INIT: -1,
        GOLD: 0,
        KING: 1,
        SILVER: 2,
        BRONZE: 3,
      },
      NOTICE_STATUS: {
        INIT: 0,
        ACCEPT: 1,
        REJECT: 2,
      },
    };
    return type;
  },
  /**
   * 计算指定时间所在月份的第一天零点和最后一天23:59:59时间戳
   */
  async calculateMonth(current) {
    let data = new Date(current);
    data.setDate(1);
    data.setHours(0);
    data.setMinutes(0);
    data.setSeconds(0);
    
    let nextMonth = new Date(current);
    if (data.getMonth == 12) {
      nextMonth.setMonth(1)
    } else {
      nextMonth.setMonth(data.getMonth() + 1);
    }
    nextMonth.setDate(1);
    nextMonth.setHours(0);
    nextMonth.setMinutes(0);
    nextMonth.setSeconds(0);
    const startTime = parseInt(data.getTime());
    const endTime = parseInt(nextMonth.getTime()) -1;
    return {
      startTime,
      endTime,
    };
  },
  /**
   * 生成一个uuid
   */
  async uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },
  /**
   * 获取指定时间，年月日格式的
   */
  async getFullDate(time) {
    const nowDate = new Date(time);
    const fullYear = nowDate.getFullYear();
    const month = nowDate.getMonth() + 1; // getMonth 方法返回 0-11，代表1-12月
    const date = nowDate.getDay();
    let D;
    let y;
    let m;
    let d;
    if (time) {
      D = new Date(time);
      y = D.getFullYear();
      m = D.getMonth() + 1;
      d = D.getDate();
    } else {
      y = fullYear;
      m = month;
      d = date;
    }
    m = m > 9 ? m : `0${m}`;    
    d = d > 9 ? d : `0${d}`;
    return `${y}-${m}-${d}`;
  },
  /**
   * 获取当前时间所在当月的天数
   * @param {*} 
   */
  async monthDate() {
    const nowDate = new Date();
    const cloneNowDate = new Date();
    const fullYear = nowDate.getFullYear();
    const month = nowDate.getMonth() + 1; // getMonth 方法返回 0-11，代表1-12月
    const startOfMonth = new Date(fullYear, month, 1).getDate();  // 获取本月第一天日期
    const endOfMonth = new Date(fullYear, month, 0).getDate(); // 获取本月最后一天日期
    const startDate = await this.getFullDate(cloneNowDate.setDate(startOfMonth));
    const endDate = await this.getFullDate(cloneNowDate.setDate(endOfMonth)); // 当月最后一天年月日
    const dayLen = endDate.substring(8)
    const STime = new Date(new Date().toLocaleDateString()).getTime();  // 当天的0点
    return {
      dayLen,
      STime,
      startDate,
      endDate,
    }
  }
};
