import { Effect, Subscription } from 'dva';
import { Reducer } from 'redux';
import { ConnectType } from '@/global/connect';
import { Book, queryBooks } from '@/services/book';
import collection from '@/layouts/components/ApplicationDrawer/collection';
import { Collection, queryCollections } from '@/services/collection';
import { queryTags, Tag } from '@/services/tag';
import { ListQueryContainer } from '@/services/base';
import { getCoverThumbnailURL } from '@/util/image';

const pathToRegexp = require('path-to-regexp');

export interface SearchModelStateType {
  searchKey?: string
  summaryBooks?: Book[]
  summaryCollections?: Collection[]
  summaryTags: {
    artist?: Tag[]
    series?: Tag[]
    theme?: Tag[]
    all?: Tag[]
  }
}

export interface SearchModelType {
  namespace: string,
  reducers: {
    setSearchKey: Reducer
    onQuerySummaryBooksSuccess: Reducer
    onQuerySummaryTagsSuccess: Reducer
    onQuerySummaryCollectionsSuccess: Reducer
  }
  state: SearchModelStateType
  effects: {
    querySummaryBooks: Effect
    querySummaryTags: Effect,
    querySummaryCollections: Effect,
    queryBooks:Effect
  }
  subscriptions: {
    setup: Subscription
  }
}

const SearchModel: SearchModelType = {
  namespace: 'search',
  state: {
    summaryTags: {},
  },
  subscriptions: {
    'setup'({ dispatch, history }) {
      history.listen((location) => {
        const regexp = pathToRegexp('/search/:name');
        const match = regexp.exec(location.pathname);
        if (match) {
          dispatch({
            type: 'setSearchKey',
            payload: {
              searchKey: match[1],
            },
          });
          dispatch({
            type: 'querySummaryBooks',
          });
          dispatch({
            type: 'querySummaryCollections',
          });
          dispatch({
            type: 'querySummaryTags',
          });
        }
      });
    },
  },
  effects: {
    * querySummaryBooks(_, { call, put, select }) {
      const { searchKey } = yield select((state: ConnectType) => (state.search));
      const queryBooksResponse : ListQueryContainer<Book> = yield call(queryBooks, { nameSearch: searchKey, page: 1, pageSize: 10 });
      queryBooksResponse.result.forEach((book:Book) => book.cover = getCoverThumbnailURL(book.cover))
      yield put({
        type:"onQuerySummaryBooksSuccess",
        payload:{
          books:queryBooksResponse.result
        }
      })
    },
    *querySummaryCollections(_,{call,put,select}){
      const { searchKey } = yield select((state: ConnectType) => (state.search));
      const queryCollectionsResponse : ListQueryContainer<Collection> = yield call(queryCollections,{ nameSearch: searchKey, page: 1, pageSize: 6 })
      yield put({
        type:"onQuerySummaryCollectionsSuccess",
        payload:{
          collections:queryCollectionsResponse.result
        }
      })
    },
    *querySummaryTags(state,{call,put,select}){
      const { searchKey } = yield select((state: ConnectType) => (state.search));
      const searchTypes = ["artist","theme","series"];
      for (let searchType of searchTypes) {
        const response : ListQueryContainer<Tag> = yield call(queryTags,{nameSearch:searchKey,page: 1, pageSize: 6,type:searchType});
        yield put({
          type:"onQuerySummaryTagsSuccess",
          payload:{
            type:searchType,
            tags:response.result
          }
        })
      }
    },
    *queryBooks(_,{call,put,select}){

    }
  },
  reducers: {
    setSearchKey(state, { payload }) {
      return {
        ...state,
        searchKey: payload.searchKey,
      };
    },
    onQuerySummaryBooksSuccess(state, { payload }) {
      return {
        ...state,
        summaryBooks: payload.books,
      };
    },
    onQuerySummaryCollectionsSuccess(state, { payload }) {
      return {
        ...state,
        summaryCollections: payload.collections,
      };
    },
    onQuerySummaryTagsSuccess(state, { payload: { type, tags } }) {
      const summaryTags = state.summaryTags;
      summaryTags[type] = tags;
      return {
        ...state,
        summaryTags,
      };
    },
  },

};
export default SearchModel;
