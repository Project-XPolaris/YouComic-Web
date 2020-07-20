import { Reducer } from '@@/plugin-dva/connect';

export interface NoticeModelStateType {
  notices: Notification[]
}

export interface Notification {
  message: string
  dismiss: boolean
  key?: string
  options: any
}

export interface NoticeModelType {
  namespace: string,
  reducers: {
    removeNotification: Reducer<NoticeModelStateType>
    addNotification: Reducer<NoticeModelStateType>
  },
  state: NoticeModelStateType,
  effects: {},
  subscriptions: {}
}

const NoticeModel: NoticeModelType = {
  namespace: 'notice',
  state: {
    notices: [],
  },
  subscriptions: {},
  effects: {},
  reducers: {
    removeNotification(state, { payload: { key } }) {
      return {
        ...state,
        notices: state!!.notices.filter((item: Notification) => item.key !== key),
      };
    },
    addNotification(state, { payload: { notification } }) {
      return {
        ...state,
        notices: [...(state?.notices || []), {
          ...notification,
          key: notification.key || new Date().getTime() + Math.random(),
        }],
      };
    },
  },
};
export default NoticeModel;
