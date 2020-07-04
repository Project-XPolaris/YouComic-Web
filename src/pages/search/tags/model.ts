import { Effect, Subscription } from 'dva';
import { Reducer } from 'redux';
import { queryTags, Tag } from '@/services/tag';
import { ConnectType } from '@/global/connect';
import { ListQueryContainer } from '@/services/base';
import { getPaginationFromURL } from '@/util/url';

const { pathToRegexp } = require("path-to-regexp");

export interface SearchTagsModelStateType {
  tags?: Tag[]
  filter: {}
  page: number
  pageSize: number
  count: number
  searchKey?: string
  order: '-id'
  startTime?: string,
  endTime?: string
}

export interface SearchTagsModelType {
  namespace: string,
  reducers: {
    setSearchKey: Reducer
    setPage: Reducer
    setOrder: Reducer
    onSearchTagsSuccess: Reducer
    setFilter: Reducer
    setTimeRange: Reducer
  }
  state: SearchTagsModelStateType
  effects: {
    searchTags: Effect
  }
  subscriptions: {
    setup: Subscription
  }
}

const SearchTagsModel: SearchTagsModelType = {
  namespace: 'searchTags',
  state: {
    filter: {},
    page: 1,
    pageSize: 30,
    count: 0,
    order: '-id',
  },
  subscriptions: {
    'setup'({ dispatch, history }) {
      history.listen((location:any) => {
        const regexp = pathToRegexp('/search/:name/tags');
        const match = regexp.exec(location.pathname);
        if (match) {
          dispatch({
            type: 'setSearchKey',
            payload: {
              searchKey: match[1],
            },
          });
          const {page,pageSize} = getPaginationFromURL(location.query,1,24)
          dispatch({
            type:"setPage",
            payload:{
              page,pageSize
            }
          })
          let {type} = location.query
          if (!Array.isArray(type)){
            type = [type,]
          }
          dispatch({
            type:"setFilter",
            payload:{
              filter:{
                type
              }
            }
          })
          dispatch({
            type: 'searchTags',
          });
        }
      });
    },
  },
  effects: {
    * searchTags(_, { call, put, select }) {
      const { searchKey, page, pageSize, filter, order, startTime, endTime } = yield select((state: ConnectType) => (state.searchTags));
      const searchTagsResponse: ListQueryContainer<Tag> = yield call(queryTags, {
        nameSearch: searchKey,
        page,
        pageSize, ...filter,
        order,
        startTime,
        endTime,
      });
      yield put({
        type: 'onSearchTagsSuccess',
        payload: {
          result: searchTagsResponse.result,
          page: searchTagsResponse.page,
          pageSize: searchTagsResponse.pageSize,
          count: searchTagsResponse.count,
        },
      });
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
    setOrder(state, { payload }) {
      const order = Object.keys(payload.order).map((key: string) => `${payload.order[key] === 'asc' ? '' : '-'}${key}`).join(',');
      return {
        ...state,
        order,
      };
    },
    onSearchTagsSuccess(state, { payload: { result, page, pageSize, count } }) {
      return {
        ...state,
        page, pageSize, tags: result, count,
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
    setTimeRange(state, { payload: startTime, endTime }) {
      return {
        ...state,
      };
    },
  },

};
export default SearchTagsModel;
