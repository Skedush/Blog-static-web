import { Action, AnyAction } from 'redux';
import { History, Location, Route } from 'umi';

export interface Dispatch<A extends Action = AnyAction> {
  <T extends A>(action: T): any;
}

export interface LoadingState {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
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
