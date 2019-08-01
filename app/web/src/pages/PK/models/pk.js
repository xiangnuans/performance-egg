import { cardList } from '@/services/api';

export default {
  namespace: 'pk',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchPKList({ payload }, { call, put }) {
      const response = yield call(cardList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
