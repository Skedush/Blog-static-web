import mdlExtend from '@/common/model';
import { DvaModel } from '@/common/type';
import api from '@/services';

const { getArticle } = api;

export interface ArticleModelState {
  article: any;
}

const ArticleModel: DvaModel<ArticleModelState> = {
  namespace: 'article',
  state: {
    article: {},
  },

  effects: {
    *getArticle({ payload }, { call, put }) {
      const res = yield call(getArticle, payload);
      if (res && res.success && res.data) {
        const { data } = res;
        yield put({
          type: 'update',
          payload: { article: data },
        });
      }
    },
  },
  reducers: {},

  subscriptions: {
    setup({ dispatch, history }) {},
  },
};

export default mdlExtend(ArticleModel);
