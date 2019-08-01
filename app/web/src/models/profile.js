import { profileData, vsProfile, basic, basicList } from '@/services/api';

export default {
  namespace: 'profile',
  state: {
    dayProduce: [],
    fans: [],
    monthProduce: [],
    basicList: [],
    vsDay: [],
    vsFans: [],
    vsName: [],
    vsMonth: [],
    basic: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(profileData, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *vsfetch({ payload }, { call, put }) {
      const response = yield call(vsProfile, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *basic({ payload }, { call, put }) {
      const response = yield call(basic, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *basicList({ payload }, { call, put }) {
      const response = yield call(basicList, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    clear() {
      return {
        dayProduce: [],
        fans: [],
        monthProduce: [],
        basicList: [],
        vsDay: [],
        vsFans: [],
        vsName: [],
        vsMonth: [],
        basic: {},
      };
    },
  },
};
