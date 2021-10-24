import modelExtend from 'dva-model-extend';
import { Reducer } from 'umi';
import { DvaModel } from './type';

export interface CommonModelType<T = any> extends DvaModel {
  reducers?: { update: Reducer<T>; [key: string]: Reducer<T> };
}

const CommonModel: CommonModelType = {
  namespace: 'common',
  state: {},

  effects: {},
  reducers: {
    update(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default <T>(model: DvaModel<T>) => modelExtend(CommonModel, model);
