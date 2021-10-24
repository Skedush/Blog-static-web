import mdlExtend from '@/common/model';
import { DvaModel } from '@/common/type';
import api from '@/services';

const { login } = api;

export interface LoginModelState {
  user: object;
  access: string;
  refresh: string;
}

const IndexModel: DvaModel<LoginModelState> = {
  namespace: 'login',
  state: {
    user: {},
    access: '',
    refresh: '',
  },

  effects: {
    *login({ payload }, { call, put }) {
      const res = yield call(login, payload);
      if (res && res.success && res.data) {
        const { data } = res;
        const { user, access, refresh } = data;
        yield put({
          type: 'update',
          payload: { user: user, access: access, refresh: refresh },
        });
      }
    },
  },
  reducers: {},

  subscriptions: {
    setup({ dispatch, history }) {},
  },
};

export default mdlExtend(IndexModel);
