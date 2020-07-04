import { Effect, Subscription } from 'dva';
import { Reducer } from 'redux';
import { ConnectType } from '@/global/connect';
import { ListQueryContainer } from '@/services/base';
import { queryTags, Tag } from '@/services/tag';
import { Book, queryBooks } from '@/services/book';
import { getCoverThumbnailURL, getImageURL } from '@/util/image';

const { pathToRegexp } = require("path-to-regexp");
export interface TagDetailModelStateType {
  id: number
  page: number
  pageSize: number
  count: number
  tag?: Tag
  books?: Book[]
}

export interface TagDetailModelType {
  namespace: string,
  reducers: {
    setTagId: Reducer
    setTag: Reducer
    onQueryBooksSuccess: Reducer
    setPage:Reducer
  }
  state: TagDetailModelStateType
  effects: {
    queryTags: Effect
    queryBooks: Effect
  }
  subscriptions: {
    setup: Subscription
  }
}

const TagDetailModel: TagDetailModelType = {
  namespace: 'tagDetail',
  state: {
    id: 0,
    page: 1,
    pageSize: 20,
    count: 0,
  },
  subscriptions: {
    'setup'({ dispatch, history }) {
      history.listen((location) => {
        const regexp = pathToRegexp('/tag/:tagId(\\d+)');
        const match = regexp.exec(location.pathname);
        if (match) {
          dispatch({
            type: 'setTagId',
            payload: {
              id: Number(match[1]),
            },
          });
          dispatch({
            type: 'queryTags',
          });
          dispatch({
            type: 'queryBooks',
          });
        }
      });
    },
  },
  effects: {
    * queryTags(_, { call, put, select }) {
      const { id } = yield select((state: ConnectType) => (state.tagDetail));
      const queryTagsResponse: ListQueryContainer<Tag> = yield call(queryTags, { page: 1, pageSize: 1, id });
      if (queryTagsResponse.count > 0) {
        yield put({
          type: 'setTag',
          payload: {
            tag: queryTagsResponse.result[0],
          },
        });
      }
    },
    * queryBooks(_, { call, put, select }) {
      const { id, page, pageSize } = yield select((state: ConnectType) => (state.tagDetail));
      const queryBooksResponse: ListQueryContainer<Book> = yield call(queryBooks, { tag: id, page, pageSize });
      queryBooksResponse.result.forEach((book:Book) => book.cover = getCoverThumbnailURL(book.cover));
      yield put({
        type: 'onQueryBooksSuccess',
        payload: {
          books: queryBooksResponse.result,
          count: queryBooksResponse.count,
          page: queryBooksResponse.page,
          pageSize: queryBooksResponse.pageSize,
        },
      });
    },
  },
  reducers: {
    setTagId(state, { payload }) {
      return {
        ...state,
        id: payload.id,
      };
    },
    setTag(state, { payload }) {
      return {
        ...state,
        tag: payload.tag,
      };
    },
    onQueryBooksSuccess(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    setPage(state,{payload}){
      return {
        ...state,
        page:payload.page,
        pageSize:payload.pageSize,
      }
    }
  },

};
export default TagDetailModel;
