import { Effect } from 'dva';
import { Reducer } from 'redux';
import { getAuth, UserAuth } from '@/services/user';
import { history, Notification } from '@@/core/umiExports';
import { ApiError } from '@/services/error';
import { getReasonFromCode } from '@/util/request';

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
      const authResponse: UserAuth | ApiError = yield call(getAuth, { username, password });
      if ("success" in authResponse && !authResponse.success){
        const reason = getReasonFromCode(authResponse.code)
        if (reason){
          const notification: Notification = {
            message: reason,
            options: {
              variant: 'error',
            },
            dismiss: false,
          };
          yield put({
            type: 'notice/addNotification',
            payload: {
              notification,
            },
          });
        }
      }
      if ("sign" in authResponse) {
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
