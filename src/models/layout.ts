import { Effect, Subscription } from 'dva';
import { Reducer } from 'redux';
import isMobile from 'ismobilejs';
const pathToRegexp = require('path-to-regexp');

export interface LayoutModelStateType {
  drawerMode: 'normal' | 'collection'
  currentCollectionId: number,
  isDrawerOpen:boolean,
}

export interface LayoutModelType {
  namespace: string,
  reducers: {
    changeDrawerMode: Reducer
    changeCollectionItem: Reducer
    setDrawerOpen:Reducer
  }
  state: LayoutModelStateType
  effects: {}
  subscriptions: {
    setup:Subscription
  }
}

const LayoutModel: LayoutModelType = {
  namespace: 'layout',
  state: {
    drawerMode: 'normal',
    currentCollectionId: 0,
    isDrawerOpen:((isMobile) => {
      if (isMobile !== undefined) {
        return !isMobile.phone;
      } else {
        return false;
      }
    })(isMobile(window.navigator.userAgent))
  },
  subscriptions: {
    'setup'({ dispatch, history }) {
      history.listen((location) => {
        const regexp = pathToRegexp('/collection/:id');
        const match = regexp.exec(location.pathname);
        if (match) {
          dispatch({
            type: 'changeDrawerMode',
            payload: {
              mode:"collection",
            },
          });
          dispatch({
            type: 'changeCollectionItem',
            payload: {
              id:Number(match[1]),
            },
          });
        }
      });
    },
  },
  effects: {},
  reducers: {
    changeDrawerMode(state, { payload }) {
      return {
        ...state,
        drawerMode: payload.mode,
      };
    },
    changeCollectionItem(state, { payload }) {
      return {
        ...state,
        currentCollectionId: payload.id,
      };
    },
    setDrawerOpen(state,{payload}){
      return{
        ...state,
        isDrawerOpen:payload.open
      }
    }
  },

};
export default LayoutModel;
