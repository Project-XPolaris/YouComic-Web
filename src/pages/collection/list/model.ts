import { Effect } from 'dva';
import { Reducer } from 'redux';
import { Collection, queryCollections } from '@/services/collection';
import { ConnectType } from '@/global/connect';
import { ListQueryContainer } from '@/services/base';

export interface CollectionListModelStateType {
  ownCollections?: Collection[]
  followCollections?: Collection[]
}

export interface CollectionListModelType {
  namespace: string,
  reducers: {
    onQueryOwnCollectionSuccess: Reducer
    onQueryFollowCollectionSuccess: Reducer
  }
  state: CollectionListModelStateType
  effects: {
    queryOwnCollections: Effect
    queryFollowCollections: Effect
  }
  subscriptions: {}
}

const CollectionListModel: CollectionListModelType = {
  namespace: 'collectionList',
  state: {},
  subscriptions: {},
  effects: {
    * queryOwnCollections(_, { call, put, select }) {
      const { id } = yield select((state: ConnectType) => (state.user));
      if (id) {
        const queryCollectionsResponse: ListQueryContainer<Collection> = yield call(queryCollections, { owner: id });
        console.log(queryCollectionsResponse)
        yield put({
          type: 'onQueryOwnCollectionSuccess',
          payload: {
            collections: queryCollectionsResponse.result,
          },
        });
      }
    },
    * queryFollowCollections(_, { call, put, select }) {
      const { id } = yield select((state: ConnectType) => (state.user));
      if (id) {
        const queryCollectionsResponse: ListQueryContainer<Collection> = yield call(queryCollections, { user: id });
        yield put({
          type: 'onQueryFollowCollectionSuccess',
          payload: {
            collections: queryCollectionsResponse.result,
          },
        });
      }
    },
  },
  reducers: {
    onQueryFollowCollectionSuccess(state, { payload }) {
      return {
        ...state,
        followCollections: payload.collections,
      };
    },
    onQueryOwnCollectionSuccess(state, { payload }) {
      return {
        ...state,
        ownCollections: payload.collections,
      };
    },
  },

};
export default CollectionListModel;
