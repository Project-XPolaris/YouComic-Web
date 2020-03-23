import { Effect, Subscription } from 'dva';
import { Reducer } from 'redux';
import { decodeJwtSign } from '@/util/jwt';
import { ConnectType } from '@/global/connect';
import { getUser, User } from '@/services/user';
import { ListQueryContainer } from '@/services/base';
import {
  Collection,
  createCollection,
  deleteBookFromCollection,
  deleteCollection,
  queryCollections,
  removeUserFromCollection,
} from '@/services/collection';
import router from 'umi/router';

export interface UserStateType {
  id?: number
  ownCollections?: Collection[]
  followCollections?: Collection[],
  nickname?:string
}

export interface UserType {
  namespace: string,
  reducers: {
    setUserId: Reducer
    onRefreshUserSuccess: Reducer
    onQueryOwnCollectionSuccess: Reducer
    onQueryFollowCollectionSuccess: Reducer
    reset:Reducer
  }
  state: UserStateType
  effects: {
    refreshUser: Effect
    refreshUserCollections: Effect
    createCollection: Effect
    removeCollection:Effect
    logout:Effect
  }
  subscriptions: {
    setup: Subscription
  }
}

const User: UserType = {
  namespace: 'user',
  state: {},
  subscriptions: {
    'setup'({ dispatch, history }) {
      dispatch({
        type: 'refreshUser',
      });
    },
  },
  effects: {
    * refreshUser(_, { call, put, select }) {
      const userToken = localStorage.getItem('youcomic_token');
      if (userToken === null){
        yield put({
          type:"reset"
        })
        router.push("/user/login")
        return
      }
      const claims = decodeJwtSign(userToken)
      const { user_id } = claims;

      yield put({
        type:"setUserId",
        payload:{
          id:user_id
        }
      })
      const queryUserResponse: User = yield call(getUser, { id:user_id });
      yield put({
        type: 'onRefreshUserSuccess',
        payload: {
          user: queryUserResponse,
        },
      });

      //check collection
      yield put({
        type: 'refreshUserCollections',
      });
    },
    * refreshUserCollections(_, { call, put, select }) {
      const { id } = yield select((state: ConnectType) => (state.user));
      const queryOwnCollectionsResponse: ListQueryContainer<Collection> = yield call(queryCollections, { owner: id });
      yield put({
        type: 'onQueryOwnCollectionSuccess',
        payload: {
          collections: queryOwnCollectionsResponse.result,
        },
      });
      const queryFollowCollectionsResponse: ListQueryContainer<Collection> = yield call(queryCollections, { user: id });
      yield put({
        type: 'onQueryFollowCollectionSuccess',
        payload: {
          collections: queryFollowCollectionsResponse.result,
        },
      });
    },
    * createCollection({ payload: { name } }, { call, put, select }) {
      const createCollectionResponse = yield call(createCollection, { name });
      yield put({
        type: 'refreshUserCollections',
      });
    },
    * removeCollection({ payload: { collectionId } }, { call, put, select }) {
      const { ownCollections, followCollections,id }: { ownCollections: Collection[], followCollections: Collection[],id:number } = yield select((state: ConnectType) => (state.user));
      let collection = ownCollections.find((collection: Collection) => collection.id === collectionId);
      if (collection === undefined){
        collection = followCollections.find((collection:Collection) => collection.id === collectionId);
        //not found in own and follow collections
        if (collection === undefined){
          return
        }
        yield call(removeUserFromCollection,{id:collection.id,userId:id})
      }else{
        yield call(deleteCollection,{id:collection.id})
      }
      yield put({
        type: 'refreshUserCollections',
      });
    },
    * logout(_,{call,put,select}){
      localStorage.removeItem("youcomic_token");
      localStorage.removeItem("youcomic_uid");
      yield put({
        type:"refreshUser"
      })
    }
  },
  reducers: {
    setUserId(state, { payload }) {
      return {
        ...state,
        id: payload.id,
      };
    },
    onRefreshUserSuccess(state, { payload }) {
      return {
        ...state,
        ...payload.user,
      };
    },
    onQueryOwnCollectionSuccess(state, { payload }) {
      return {
        ...state,
        ownCollections: payload.collections,
      };
    },
    onQueryFollowCollectionSuccess(state, { payload }) {
      return {
        ...state,
        followCollections: payload.collections,
      };
    },
    reset(state,_){
      return {}
    }
  },

};
export default User;
