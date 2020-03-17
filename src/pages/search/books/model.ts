import { Effect, Subscription } from 'dva';
import { Reducer } from 'redux';
import { Book, queryBooks } from '@/services/book';
import { ConnectType } from '@/global/connect';
import { ListQueryContainer } from '@/services/base';
import { getCoverThumbnailURL } from '@/util/image';

const pathToRegexp = require('path-to-regexp');

export interface SearchBooksModelStateType {
  books?: []
  filter: {

  }
  page: number
  pageSize: number
  count: number
  searchKey?: string
  order: '-id'
  startTime?: string,
  endTime?: string
}

export interface SearchBooksModelType {
  namespace: string,
  reducers: {
    setSearchKey: Reducer
    setPage: Reducer
    setOrder: Reducer
    onSearchBooksSuccess: Reducer
    setFilter: Reducer
    setTimeRange: Reducer
  }
  state: SearchBooksModelStateType
  effects: {
    searchBooks: Effect
  }
  subscriptions: {
    setup: Subscription
  }
}

const SearchBooksModel: SearchBooksModelType = {
  namespace: 'searchBooks',
  state: {
    filter: {},
    page: 1,
    pageSize: 30,
    count: 0,
    order: '-id',
  },
  subscriptions: {
    'setup'({ dispatch, history }) {
      history.listen((location) => {
        const regexp = pathToRegexp('/search/:name/books');
        const match = regexp.exec(location.pathname);
        if (match) {
          dispatch({
            type: 'setSearchKey',
            payload: {
              searchKey: match[1],
            },
          });
          dispatch({
            type: 'searchBooks',
          });
        }
      });
    },
  },
  effects: {
    * searchBooks(_, { call, put, select }) {
      const { searchKey, page, pageSize, filter, order,startTime,endTime } = yield select((state: ConnectType) => (state.searchBooks));
      if (searchKey !== undefined && searchKey.length !== 0) {
        const queryBooksResponse: ListQueryContainer<Book> = yield call(queryBooks, {
          nameSearch: searchKey,
          page,
          pageSize, ...filter,
          order,
          startTime,endTime
        });
        queryBooksResponse.result.forEach((book: Book) => book.cover = getCoverThumbnailURL(book.cover));
        yield put({
          type: 'onSearchBooksSuccess',
          payload: {
            result: queryBooksResponse.result,
            page: queryBooksResponse.page,
            pageSize: queryBooksResponse.pageSize,
            count: queryBooksResponse.count,
          },
        });
      }
    },
  },
  reducers: {
    setFilter(state, { payload: { filter } }) {
      return {
        ...state,
        filter: {
          ...state.filter,
          ...filter,
        },
      };
    },
    setOrder(state, { payload}) {
      const order = Object.keys(payload.order).map((key: string) => `${payload.order[key] === 'asc' ? '' : '-'}${key}`).join(',');
      return {
        ...state,
        order,
      };
    },
    onSearchBooksSuccess(state, { payload: { result, page, pageSize, count } }) {
      return {
        ...state,
        page, pageSize, books: result, count,
      };
    },
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
    setTimeRange(state,{payload:startTime,endTime}){
      return{
        ...state
      }
    }
  },

};
export default SearchBooksModel;
