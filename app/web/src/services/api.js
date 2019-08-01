import { stringify } from 'qs';
import request from '@/utils/request';

export async function viewChartData(params) {
  return request(`/api/chartData?${stringify(params)}`);
}

export async function getGroupList() {
  return request('/api/groupList');
}

export async function viewBase(params) {
  return request(`/api/base?${stringify(params)}`);
}

export async function profileData(params) {
  return request(`/api/profile?${stringify(params)}`);
}

export async function vsProfile(params) {
  return request(`/api/vsProfile?${stringify(params)}`);
}

export async function basic(params) {
  return request(`/api/basic?${stringify(params)}`);
}

export async function basicList(params) {
  return request(`/api/basicList?${stringify(params)}`);
}

export async function cardList(params) {
  return request(`/api/cardList?${stringify(params)}`);
}

export async function queryList(params) {
  return request(`/api/userList?${stringify(params)}`);
}

export async function removeList(params) {
  return request('/api/list', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addList(params) {
  return request('/api/list', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateList(params = {}) {
  return request(`/api/list?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    data: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function updateNotice(params) {
  return request(`/api/notices/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

export async function addNotice(params) {
  const { ...restParams } = params;
  return request('/api/notices?', {
    method: 'POST',
    data: {
      ...restParams,
      // method: 'post',
    },
  });
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
