import { Effect, Subscription } from 'dva';
import { ListQueryContainer } from '@/services/base';
import { Book, queryBooks } from '@/services/book';
import { Reducer } from 'redux';
import { ConnectType } from '@/global/connect';
import { getCoverThumbnailURL } from '@/util/image';
const pathToRegexp = require('path-to-regexp');

export interface BookListModelStateType {
  books?: Book[]
  page: number,
  pageSize: number,
  total: number
  order?: string
  startTime?: string,
  endTime?: string
}

export interface BookListModelType {
  namespace: string,
  reducers: {
    onQueryBookSuccess: Reducer
    setPage: Reducer
    setOrder: Reducer
    setTimeRange: Reducer
  }
  state: BookListModelStateType
  effects: {
    queryBooks: Effect
  }

}

const BookListModel: BookListModelType = {
  namespace: 'bookList',
  state: {
    page: 1,
    pageSize: 24,
    total: 0,
    order: '-id',
  },
  effects: {
    * queryBooks({ payload }, { call, put, select }) {
      const { page, pageSize, order, startTime, endTime } = yield select((state: ConnectType) => (state.bookList));
      const queryBookResponse: ListQueryContainer<Book> = yield call(queryBooks, {
        page, page_size: pageSize, order, startTime, endTime,
      });
      queryBookResponse.result.forEach(book => book.cover = getCoverThumbnailURL(book.cover));
      yield put({
        type: 'onQueryBookSuccess',
        payload: {
          books: queryBookResponse.result,
          total: queryBookResponse.count,
        },
      });
    },
  },
  reducers: {
    onQueryBookSuccess(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    setPage(state, { payload }) {
      return {
        ...state,
        page: payload.page,
        pageSize: payload.pageSize,
      };
    },
    setTimeRange(state, { payload }) {
      return {
        ...state,
        startTime: payload.startTime,
        endTime: payload.endTime,
      };
    },
    setOrder(state, { payload }) {
      const order = Object.keys(payload.order).map((key: string) => `${payload.order[key] === 'asc' ? '' : '-'}${key}`).join(',');
      return {
        ...state,
        order,
      };
    },
  },
};
export default BookListModel;
