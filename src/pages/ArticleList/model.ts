import mdlExtend from '@/common/model';
import { DvaModel } from '@/common/type';
import api from '@/services';

const { getArticleList } = api;

export interface ArticleModelState {
  articleList: any;
}

const ArticleModel: DvaModel<ArticleModelState> = {
  namespace: 'article',
  state: {
    articleList: [],
  },

  effects: {
    *getArticleList({ payload }, { call, put }) {
      const res = yield call(getArticleList, payload);
      if (res && res.success && res.data) {
        const { data } = res;
        yield put({
          type: 'update',
          payload: { articleList: data },
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
