import { viewChartData, getGroupList, viewBase } from '@/services/api';

export default {
  namespace: 'view',
  state: {
    indicatorNames: [],
    indicatorData: [],
    yesterdayRank: [],
    groupList: [],
    baseInfo: {},
  },

  effects: {
    *fetchGroup(_, { call, put }) {
      const response = yield call(getGroupList);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *fetchChart({ payload }, { call, put }) {
      const response = yield call(viewChartData, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *fetchBase({ payload }, { call, put }) {
      const response = yield call(viewBase, payload);
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
        indicatorNames: [],
        indicatorData: [],
        yesterdayRank: [],
        groupList: [],
        baseInfo: {},
      };
    },
  },
};
