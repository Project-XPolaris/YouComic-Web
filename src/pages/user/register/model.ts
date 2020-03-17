import { Effect, Subscription } from 'dva';
import { Reducer } from 'redux';

export interface RegisterModelStateType {
}

export interface RegisterModelType {
  namespace: string,
  reducers: {}
  state: RegisterModelStateType
  effects: {}
  subscriptions: {}
}

const RegisterModel: RegisterModelType = {
  namespace: 'register',
  state: {},
  subscriptions: {},
  effects: {},
  reducers: {},

};
export default RegisterModel;
