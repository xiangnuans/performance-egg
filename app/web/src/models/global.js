import { queryNotices, updateNotice, addNotice } from '@/services/api';

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: [],
  },

  effects: {
    *fetchNotices(_, { call, put, select }) {
      const response = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: response.data,
      });
      const unreadCount = yield select(
        state => state.global.notices.filter(item => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: response.data.length,
          unreadCount,
        },
      });
    },
    *clearNotices({ payload }, { call, put, select }) {
      const response = yield call(updateNotice, payload);
      yield put({
        type: 'saveClearedNotices',
        payload: response,
      });
      const count = yield select(state => state.global.notices.length);
      const unreadCount = yield select(
        state => state.global.notices.filter(item => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: count,
          unreadCount,
        },
      });
    },
    *changeNoticeReadState({ payload }, { put, select }) {
      const notices = yield select(state =>
        state.global.notices.map(item => {
          const notice = { ...item };
          if (notice.id === payload) {
            notice.read = true;
          }
          return notice;
        }),
      );
      yield put({
        type: 'saveNotices',
        payload: notices,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: notices.length,
          unreadCount: notices.filter(item => !item.read).length,
        },
      });
    },
    *updateNotice({ payload, callback }, { call, put }) {
      const response = yield call(updateNotice, payload);
      yield put({
        type: 'saveNotice',
        payload: response,
      });
      if (callback) callback(response);
    },
    *addNotice({ payload, callback }, { call, put }) {
      const response = yield call(addNotice, payload);
      yield put({
        type: 'appendNotice',
        payload: response,
      });
      if (callback) callback(response);
    },
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveNotices(state, { payload }) {
      return {
        ...state,
        notices: payload,
      };
    },
    saveClearedNotices(state, { payload }) {
      return {
        ...state,
        notices: state.notices.filter(item => item.type !== payload),
      };
    },
    appendNotice(state, action) {
      return {
        ...state,
        list: state.notices.concat(action.payload),
      };
    },
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
