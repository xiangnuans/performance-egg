import request from '@/utils/request';

export async function queryUser() {
  return request('/api/currentUser?');
}

export async function updateUser(body) {
  return request('/api/updateUser', {
    method: 'POST',
    data: {
      ...body,
    },
  });
}
