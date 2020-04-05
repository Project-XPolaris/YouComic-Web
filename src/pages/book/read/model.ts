import { Effect, Subscription } from 'dva';
import { Reducer } from 'redux';
import { ConnectType } from '@/global/connect';
import { Page, queryPages } from '@/services/page';
import { ListQueryContainer } from '@/services/base';
import { sortBy } from 'lodash';

const pathToRegexp = require('path-to-regexp');

export interface ReadPageModelStateType {
  id: number,
  pages?: Page[]
  count:number
}

export interface ReadPageModelType {
  namespace: string,
  reducers: {
    setBookId: Reducer
    onQueryPagesSuccess: Reducer
  }
  state: ReadPageModelStateType
  effects: {
    queryPages: Effect
  }
  subscriptions: {
    setup: Subscription
  }
}

const ReadPageModel: ReadPageModelType = {
  namespace: 'bookRead',
  state: {
    id: 0,
    count:0
  },
  subscriptions: {
    'setup'({ dispatch, history }) {
      history.listen((location) => {
        const regexp = pathToRegexp('/book/:bookId(\\d+)/read');
        const match = regexp.exec(location.pathname);
        if (match) {
          dispatch({
            type: 'setBookId',
            payload: {
              id: Number(match[1]),
            },
          });
          dispatch({
            type: 'queryPages',
            payload: {
              id: Number(match[1]),
            },
          });
        }
      });
    },
  },
  effects: {
    * queryPages(state, { call, put, select }) {
      const { id } = yield select((state: ConnectType) => (state.bookRead));
      const queryPagesResponse: ListQueryContainer<Page> = yield call(queryPages, {
        book: id,
        page: 1,
        pageSize: 1000,
      });
      queryPagesResponse.result = sortBy(queryPagesResponse.result, [(page: Page) => (page.order)]);
      yield put({
        type: 'onQueryPagesSuccess',
        payload: {
          pages: queryPagesResponse.result,
          count: queryPagesResponse.count,
        },
      });
    },
  },
  reducers: {
    setBookId(state, { payload }) {
      return {
        ...state,
        id: payload.id,
      };
    },
    onQueryPagesSuccess(state, { payload }) {
      return {
        ...state,
        pages: payload.pages,
        count: payload.count,
      };
    },
  },
};
export default ReadPageModel;
