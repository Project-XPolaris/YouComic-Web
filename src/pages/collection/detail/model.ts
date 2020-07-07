import { Effect, Subscription } from 'dva';
import { Reducer } from 'redux';
import { ConnectType } from '@/global/connect';
import { Book, queryBooks } from '@/services/book';
import { ListQueryContainer } from '@/services/base';
import { getCoverThumbnailURL } from '@/util/image';
import { deleteBookFromCollection } from '@/services/collection';

const { pathToRegexp } = require("path-to-regexp");

export interface CollectionDetailModelStateType {
  books?: Book[]
  page: number,
  pageSize: number
  collectionId: number
  count:number
}

export interface CollectionDetailModelType {
  namespace: string,
  reducers: {
    onQueryBookSuccess: Reducer
    setCollectionId: Reducer
    setPage:Reducer
  }
  state: CollectionDetailModelStateType
  effects: {
    queryBooks: Effect
    removeBookFromCollection:Effect
  }
  subscriptions: {
    setup: Subscription
  }
}

const CollectionDetailModel: CollectionDetailModelType = {
  namespace: 'collectionDetail',
  state: {
    page: 1,
    pageSize: 24,
    collectionId: 0,
    count:0
  },
  subscriptions: {
    'setup'({ dispatch, history }) {
      history.listen((location) => {
        const regexp = pathToRegexp('/collection/:collectionId(\\d+)');
        const match = regexp.exec(location.pathname);
        if (match) {
          dispatch({
            type: 'setCollectionId',
            payload: {
              id: Number(match[1]),
            },
          });
          dispatch({
            type: 'queryBooks',
          });
        }
      });
    },
  },
  effects: {
    * queryBooks(_, { call, put, select }) {
      const { page, pageSize, collectionId } = yield select((state: ConnectType) => (state.collectionDetail));
      if (collectionId) {
        const queryBookResponse: ListQueryContainer<Book> = yield call(queryBooks, {
          collection: collectionId,
          page,
          page_size: pageSize,
        });
        queryBookResponse.result.forEach((book: Book) => book.cover = getCoverThumbnailURL(book.cover));
        yield put({
          type: 'onQueryBookSuccess',
          payload: {
            ...queryBookResponse,
          },
        });
      }
    },
    * removeBookFromCollection({payload},{call,put}){
      const {bookId,collectionId} = payload;
      yield call(deleteBookFromCollection,{bookId,collectionId});
      yield put({
        type:"queryBooks"
      })
    }
  },
  reducers: {
    onQueryBookSuccess(state, { payload }) {
      return {
        ...state,
        books: payload.result,
        page: payload.page,
        pageSize: payload.pageSize,
        count: payload.count,
      };
    },
    setCollectionId(state, { payload }) {
      return {
        ...state,
        collectionId: payload.id,
      };
    },
    setPage(state,{payload}){
      return{
        ...state,
        page:payload.page,
        pageSize:payload.pageSize
      }
    }
  },

};
export default CollectionDetailModel;
