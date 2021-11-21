import mdlExtend from '@/common/model';
import { DvaModel } from '@/common/type';
import api from '@/services';
import store from 'store';
import { history } from 'umi';

const { login } = api;

export interface LoginModelState {
  user: object;
  access: string;
  refresh: string;
}

const LoginModel: DvaModel<LoginModelState> = {
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
        store.set('user', user);
        store.set('token', access);
        store.set('refresh', refresh);
        history.push({ pathname: '/blog/article/list' });
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

export default mdlExtend(LoginModel);
