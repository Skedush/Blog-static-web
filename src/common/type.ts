import { LoginModelState } from '@/pages/Login/model';
import { Action, AnyAction } from 'redux';
import { Effect, History, Location, Reducer, Route, Subscription } from 'umi';

export interface Dispatch<A extends Action = AnyAction> {
  <T extends A>(action: T): any;
}

export interface LoadingState {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
}
export interface GlobalState {
  login: LoginModelState;
}

export interface UmiComponentProps {
  history: History;
  location: Location;
  match: any;
  route: Route;
  routes: Route[];
  dispatch: any;
  children: any;
}

export interface DvaModelEffects {
  [key: string]: Effect;
}

export interface DvaModelReducers<T> {
  [key: string]: Reducer<T>;
}

export interface DvaModelSubscriptions {
  [key: string]: Subscription;
}
export interface DvaModel<T = any> {
  namespace: string;
  state?: T;
  effects?: DvaModelEffects;
  reducers?: DvaModelReducers<T>;
  subscriptions?: DvaModelSubscriptions;
}
