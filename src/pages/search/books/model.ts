import { Effect, Subscription } from 'dva';
import { Reducer } from 'redux';
import { Book, queryBooks } from '@/services/book';
import { ConnectType } from '@/global/connect';
import { ListQueryContainer } from '@/services/base';
import { getCoverThumbnailURL } from '@/util/image';
import { encodeOrderToUrl, getOrdersFromUrlQuery, getPaginationFromURL } from '@/util/url';
import { BookListModelStateType } from '@/pages/book/list/model';

const pathToRegexp = require('path-to-regexp');

export interface SearchBooksModelStateType {
  books?: []
  filter: {

  }
  page: number
  pageSize: number
  count: number
  searchKey?: string
  order: any[]
  startTime?: string,
  endTime?: string,
  timeRange?:string
  mobile:{
    books:[]
    page:number
    pageSize:number
    count:number
    hasMore:boolean
  }
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
    onQueryMobileBookSuccess:Reducer
    clearLoadMore:Reducer
  }
  state: SearchBooksModelStateType
  effects: {
    searchBooks: Effect
    queryMobileBook:Effect

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
    pageSize: 24,
    count: 0,
    order: [],
    mobile:{
      books:[],
      page:0,
      pageSize:10,
      count:0,
      hasMore:true
    }
  },
  subscriptions: {
    'setup'({ dispatch, history }) {
      history.listen((location:any) => {
        const regexp = pathToRegexp('/search/:name/books');
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
          dispatch({
            type:"setOrder",
            payload:{
              order:getOrdersFromUrlQuery(location.query.order,"-id")
            }
          })
          const {timeRange,startTime,endTime} = location.query
          dispatch({
            type:"setTimeRange",
            payload:{
              timeRange,startTime,endTime
            }
          })
          dispatch({
            type:"clearLoadMore"
          })
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
          order:encodeOrderToUrl(order),
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
    *queryMobileBook(_,{call,put,select}){
      const searchBooksState : SearchBooksModelStateType = yield select((state: ConnectType) => (state.searchBooks));
      const {mobile:{pageSize,page},order,startTime,endTime} = searchBooksState
      const queryBookResponse: ListQueryContainer<Book> = yield call(queryBooks, {
        page:page + 1,
        page_size: pageSize,
        order : encodeOrderToUrl(order),
        nameSearch:searchBooksState.searchKey,
        startTime,
        endTime,
      });
      queryBookResponse.result.forEach(book => book.cover = getCoverThumbnailURL(book.cover));

      yield put({
        type:"onQueryMobileBookSuccess",
        payload:{
          books:queryBookResponse.result,
          page:queryBookResponse.page,
          pageSize:queryBookResponse.pageSize,
          count:queryBookResponse.count,
          hasMore:queryBookResponse.next.length > 0
        }
      })
    }
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
      return {
        ...state,
        order:payload.order,
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
    setTimeRange(state,{payload:{timeRange,startTime,endTime}}){
      return{
        ...state,
        timeRange,startTime,endTime
      }
    },
    onQueryMobileBookSuccess(state,{payload:{page,pageSize,books,hasMore}}){
      return {
        ...state,
        mobile:{
          ...state.mobile,
          books:[...state.mobile.books,...books],
          page,
          pageSize,
          hasMore
        }
      }
    },
    clearLoadMore(state,_){
      return{
        ...state,
        mobile:{
          books:[],
          page:0,
          pageSize:10,
          count:0,
          hasMore:true
        }
      }
    }
  },

};
export default SearchBooksModel;
