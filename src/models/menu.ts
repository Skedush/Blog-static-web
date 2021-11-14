import mdlExtend from '@/common/model';
import { DvaModel } from '@/common/type';
import api from '@/services';
import store from 'store';

const { getMenu } = api;

export interface MenuModelState {
  menu: any[];
}

const MenuModel: DvaModel<MenuModelState> = {
  namespace: 'menu',
  state: {
    menu: [],
  },

  effects: {
    *getMenu({ payload }, { call, put }) {
      const res = yield call(getMenu, payload);
      if (res && res.success && res.data) {
        const { data } = res;
        store.set('menu', data);
        yield put({
          type: 'update',
          payload: { menu: data },
        });
      }
    },
  },
  reducers: {},

  subscriptions: {
    setup({ dispatch, history }) {},
  },
};

export default mdlExtend(MenuModel);
