import { Effect, Subscription } from 'dva';
import { Reducer } from 'redux';
import { ConnectType } from '@/global/connect';
import { ListQueryContainer } from '@/services/base';
import { Book, queryBooks, queryBookTags } from '@/services/book';
import { queryTagBooks, Tag } from '@/services/tag';
import { getCoverThumbnailURL } from '@/util/image';
import { addBookToCollection } from '@/services/collection';

const pathToRegexp = require('path-to-regexp');

export interface DetailModelStateType {
  id: number
  book?: Book
  tags?: Tag[]
  tagBooks: any
  isSelectCollectionDialogOpen: boolean
}

export interface DetailModelType {
  namespace: string,
  reducers: {
    setBookId: Reducer
    onQueryBookSuccess: Reducer
    onQueryBookTagsSuccess: Reducer
    onQueryTagBooksSuccess: Reducer
    setSelectCollectionOpen: Reducer
  }
  state: DetailModelStateType
  effects: {
    queryBook: Effect
    queryBookTags: Effect
    queryTagBooks: Effect
    addBookToCollection: Effect
  }
  subscriptions: {
    setup: Subscription
  }
}

const DetailModel: DetailModelType = {
  namespace: 'bookDetail',
  state: {
    id: 0,
    tagBooks: {},
    isSelectCollectionDialogOpen: false,
  },
  subscriptions: {
    'setup'({ dispatch, history }) {
      history.listen((location) => {
        const regexp = pathToRegexp('/book/:bookId(\\d+)');
        const match = regexp.exec(location.pathname);
        if (match) {
          dispatch({
            type: 'setBookId',
            payload: {
              id: Number(match[1]),
            },
          });
          dispatch({
            type: 'queryBook',
          });
          dispatch({
            type: 'queryBookTags',
          });
        }
      });
    },
  },
  effects: {
    * queryBook(_, { call, put, select }) {
      const { id } = yield select((state: ConnectType) => (state.bookDetail));
      const queryBooksResponse: ListQueryContainer<Book> = yield call(queryBooks, { id });

      if (queryBooksResponse.count > 0) {
        const book = queryBooksResponse.result[0];
        book.cover = getCoverThumbnailURL(book.cover);
        yield put({
          type: 'onQueryBookSuccess',
          payload: {
            book: queryBooksResponse.result[0],
          },
        });
      }
    },
    * queryBookTags(_, { call, put, select }) {
      const { id } = yield select((state: ConnectType) => (state.bookDetail));
      const queryBookTagsResponse: ListQueryContainer<Tag> = yield call(queryBookTags, { id });
      yield put({
        type: 'onQueryBookTagsSuccess',
        payload: {
          tags: queryBookTagsResponse.result,
        },
      });
    },
    * queryTagBooks({ payload: { id, page, pageSize } }, { call, put }) {
      const queryTagBooksResponse: ListQueryContainer<Book> = yield call(queryTagBooks, { id, page, pageSize });
      queryTagBooksResponse.result.forEach((book: Book) => book.cover = getCoverThumbnailURL(book.cover));
      yield put({
        type: 'onQueryTagBooksSuccess',
        payload: {
          id: id,
          books: queryTagBooksResponse.result,
        },
      });
    },
    * addBookToCollection({ payload: { collectionIds } }, { select, call, put }) {
      const { id } = yield select((state: ConnectType) => (state.bookDetail));
      for (let idx = 0; idx < collectionIds.length; idx++) {
        const addToBookCollectionResponse = yield call(addBookToCollection, {
          collectionId: collectionIds[idx],
          bookIds: [id],
        });
      }
      yield put({
        type: 'setSelectCollectionOpen',
        payload: {
          open: false,
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
    onQueryBookSuccess(state, { payload }) {
      return {
        ...state,
        book: payload.book,
      };
    },
    onQueryBookTagsSuccess(state, { payload }) {
      return {
        ...state,
        tags: payload.tags,
      };
    },
    onQueryTagBooksSuccess(state, { payload }) {
      const tagBooks = {
        ...state.tagBooks,
      };
      tagBooks[payload.id] = payload.books;
      return {
        ...state,
        tagBooks,
      };
    },
    setSelectCollectionOpen(state, { payload }) {
      return {
        ...state,
        isSelectCollectionDialogOpen: payload.open,
      };
    },
  },

};
export default DetailModel;
