import { Effect, Subscription } from 'dva';
import { ListQueryContainer } from '@/services/base';
import { Book, queryBooks } from '@/services/book';
import { Reducer } from 'redux';
import { ConnectType } from '@/global/connect';
import { getCoverThumbnailURL } from '@/util/image';
import { encodeOrderToUrl, getOrdersFromUrlQuery, getPaginationFromURL } from '@/util/url';
const pathToRegexp = require('path-to-regexp');

export interface BookListModelStateType {
  books?: Book[]
  page: number,
  pageSize: number,
  total: number
  order: any[]
  startTime?: string,
  endTime?: string,
  timeRange?:string
  nameSearch?:string
  mobile:{
    books:[]
    page:number
    pageSize:number
    count:number
    hasMore:boolean
  }
}

export interface BookListModelType {
  namespace: string,
  reducers: {
    onQueryBookSuccess: Reducer
    setPage: Reducer
    setOrder: Reducer
    setTimeRange: Reducer
    onQueryMobileBookSuccess:Reducer
    clearLoadMore:Reducer
    setNameSearch:Reducer
  }
  state: BookListModelStateType
  effects: {
    queryBooks: Effect
    queryMobileBook:Effect
  }
  subscriptions: {
    setup: Subscription
  }

}

const BookListModel: BookListModelType = {
  namespace: 'bookList',
  state: {
    page: 1,
    pageSize: 24,
    total: 0,
    order: [],
    mobile:{
      books:[],
      page:0,
      pageSize:10,
      count:0,
      hasMore:false
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location: any) => {
        if (location.pathname === '/books') {
          const {page, pageSize} = getPaginationFromURL(location.query,1,24)
          dispatch({
            type:"setPage",
            payload:{
              page,
              pageSize
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
            type:"setOrder",
            payload:{
              order:getOrdersFromUrlQuery(location.query.order,"-id")
            }
          })
          dispatch({
            type:"setNameSearch",
            payload:{
              nameSearch:location.query.nameSearch
            }
          })
          dispatch({
            type:"clearLoadMore"
          })
          dispatch({
            type:"queryBooks"
          })
        }
      });
    },
  },
  effects: {
    * queryBooks({ payload }, { call, put, select }) {
      const { page, pageSize, order, startTime, endTime,nameSearch } = yield select((state: ConnectType) => (state.bookList));
      const queryBookResponse: ListQueryContainer<Book> = yield call(queryBooks, {
        page,
        page_size: pageSize,
        order:encodeOrderToUrl(order),
        startTime,
        endTime,
        nameSearch
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
    *queryMobileBook(_,{call,put,select}){
      const bookListState : BookListModelStateType = yield select((state: ConnectType) => (state.bookList));
      const {mobile:{pageSize,page},order,startTime,endTime,nameSearch} = bookListState
      const queryBookResponse: ListQueryContainer<Book> = yield call(queryBooks, {
        page:page + 1,
        page_size: pageSize,
        order : encodeOrderToUrl(order),
        startTime,
        endTime,
        nameSearch
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
        timeRange:payload.timeRange
      };
    },
    setOrder(state, { payload:{order} }) {
      return {
        ...state,
        order,
      };
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
    setNameSearch(state,{payload:{nameSearch}}){
      return{
        ...state,
        nameSearch
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
export default BookListModel;
