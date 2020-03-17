import { Effect, Subscription } from 'dva';
import { Reducer } from 'redux';
import { Collection, queryCollections } from '@/services/collection';
import { ConnectType } from '@/global/connect';
import { ListQueryContainer } from '@/services/base';

const pathToRegexp = require('path-to-regexp');

export interface SearchCollectionsModelStateType {
  collections?: Collection[]
  page: number
  pageSize: number
  count: number
  searchKey?: string
}

export interface SearchCollectionsModelType {
  namespace: string,
  reducers: {
    onSearchCollectionSuccess: Reducer
    setSearchKey: Reducer
    setPage: Reducer
  }
  state: SearchCollectionsModelStateType
  effects: {
    searchCollections: Effect
  }
  subscriptions: {
    setup: Subscription
  }
}

const SearchCollectionsModel: SearchCollectionsModelType = {
  namespace: 'searchCollections',
  state: {
    page: 1,
    pageSize: 20,
    count: 0,
  },
  subscriptions: {
    'setup'({ dispatch, history }) {
      history.listen((location) => {
        const regexp = pathToRegexp('/search/:name/collections');
        const match = regexp.exec(location.pathname);
        if (match) {
          dispatch({
            type: 'setSearchKey',
            payload: {
              searchKey: match[1],
            },
          });
          dispatch({
            type: 'searchCollections',
          });
        }
      });
    },
  },
  effects: {
    * searchCollections(state, { call, put, select }) {
      const { searchKey, page, pageSize, filter, order, startTime, endTime } = yield select((state: ConnectType) => (state.searchCollections));
      const queryCollectionResponse: ListQueryContainer<Collection> = yield call(queryCollections, {
        nameSearch: searchKey,
        page,
        pageSize,
        ...filter,
        order,
        startTime,
        endTime,
      });
      yield put({
        type: 'onSearchCollectionSuccess',
        payload: {
          collections: queryCollectionResponse.result,
          page: queryCollectionResponse.page,
          pageSize: queryCollectionResponse.pageSize,
          count: queryCollectionResponse.count,
        },
      });
    },
  },
  reducers: {
    setPage(state, { payload: { page, pageSize } }) {
      return {
        ...state,
        page, pageSize,
      };
    },
    setSearchKey(state, { payload: { searchKey } }) {
      return {
        ...state,
        searchKey,
      };
    },
    onSearchCollectionSuccess(state, { payload: { collections, page, pageSize, count } }) {
      return {
        ...state,
        collections, page, pageSize, count,
      };
    },
  },

};
export default SearchCollectionsModel;
