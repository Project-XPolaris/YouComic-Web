import { Effect, Subscription } from 'dva';
import { Reducer } from 'redux';
import { Book, queryBooks } from '@/services/book';
import { ListQueryContainer } from '@/services/base';
import { getCoverThumbnailURL } from '@/util/image';

const pathToRegexp = require('path-to-regexp');

export interface HomeModelStateType {
  books: {
    recentAdd?: Book[]
  }
}

export interface HomeModelType {
  namespace: string,
  reducers: {
    onQueryBooksSuccess: Reducer
  }
  state: HomeModelStateType
  effects: {
    queryBooks: Effect
  }
  subscriptions: {
    setup: Subscription
  }
}

const HomeModel: HomeModelType = {
  namespace: 'home',
  state: {
    books: {},
  },
  subscriptions: {
    'setup'({ dispatch, history }) {
      history.listen((location) => {
        const regexp = pathToRegexp('/');
        const match = regexp.exec(location.pathname);
        if (match) {
          dispatch({
            type: 'queryBooks',
            payload: {
              page: 1,
              pageSize: 12,
              order: '-id',
              index: 'recentAdd',
            },
          });
        }
      });
    },
  },
  effects: {
    * queryBooks({ payload }, { call, put, select }) {
      const { index, ...queryParams } = payload;
      const queryBooksResponse: ListQueryContainer<Book> = yield call(queryBooks, { ...queryParams });
      queryBooksResponse.result.forEach((book: Book) => book.cover = getCoverThumbnailURL(book.cover));
      yield put({
        type: 'onQueryBooksSuccess',
        payload: {
          index,
          books: queryBooksResponse.result,
        },
      });
    },
  },
  reducers: {
    onQueryBooksSuccess(state, { payload }) {
      const books = state.books;
      books[payload.index] = payload.books;
      return {
        ...state,
        books,
      };
    },
  },

};
export default HomeModel;
