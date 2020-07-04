import { Effect } from 'dva';
import { Reducer } from 'redux';
import { getAuth, UserAuth } from '@/services/user';
import { history } from '@@/core/umiExports';

export interface LoginModelStateType {
}

export interface LoginModelType {
  namespace: string,
  reducers: {
    onLoginSuccess: Reducer
  }
  state: LoginModelStateType
  effects: {
    login: Effect
  }
  subscriptions: {}
}

const LoginModel: LoginModelType = {
  namespace: 'login',
  state: {},
  subscriptions: {},
  effects: {
    * login({ payload: { username, password } }, { call, put }) {
      console.log(username, password);
      const authResponse: UserAuth = yield call(getAuth, { username, password });
      console.log(authResponse);
      if (authResponse['sign']) {
        yield put({
          type: 'onLoginSuccess',
          payload: authResponse,
        });
        yield put({
          type: 'user/refreshUser',
        });
        history.push('/');
      }
    },
  },
  reducers: {
    onLoginSuccess(state, { payload }) {
      localStorage.setItem('youcomic_token', payload.sign);
      localStorage.setItem('youcomic_id', payload.id);
      return {
        ...state,
      };
    },
  },

};
export default LoginModel;
