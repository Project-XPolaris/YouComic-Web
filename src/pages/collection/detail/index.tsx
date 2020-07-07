import React, { useState } from 'react';
import { connect, Dispatch } from 'dva';
import { ConnectType } from '@/global/connect';
import { CollectionDetailModelStateType } from '@/pages/collection/detail/model';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import useStyles from '@/pages/collection/detail/style';
import { LayoutModelStateType } from '@/models/layout';
import MaterialPagination from '@material-ui/lab/Pagination';
import BookCollection from '@/layouts/components/BookCollection';
import { getBooleanWithDefault } from '@/util/function';
import { Loading } from '@@/plugin-dva/connect';
import { BookCardAction } from '@/components/BookCard';


interface CollectionDetailPropsType {
  dispatch: Dispatch,
  collectionDetail: CollectionDetailModelStateType,
  onDelete: (id: number) => void
  layout: LayoutModelStateType
  loading: Loading
}

function CollectionDetail({ dispatch, collectionDetail, layout, loading }: CollectionDetailPropsType) {
  const classes = useStyles();
  const [actionBookId, setActonBookId] = useState<number | undefined>(undefined);
  const [isDeleteDialogShow, setIsDeleteDialogShow] = useState<boolean>(false);
  const onBookDelete = (id: number) => {
    setActonBookId(id);
    setIsDeleteDialogShow(true);
  };
  const onPaginationChange = (_: any, page = collectionDetail.page) => (pageSize = collectionDetail.pageSize) => {
    dispatch({
      type: 'tagDetail/setPage',
      payload: {
        page,
        pageSize,
      },
    });
    dispatch({
      type: 'tagDetail/queryBooks',
    });
  };
  const onDeleteDialogCancel = () => {
    setIsDeleteDialogShow(false);
  };
  const onDeleteBookFromCollection = () => {
    dispatch({
      type: 'collectionDetail/removeBookFromCollection',
      payload: {
        collectionId: collectionDetail.collectionId,
        bookId: actionBookId,
      },
    });
    setIsDeleteDialogShow(false);
  };
  const bookCardMenuActions : Array<BookCardAction>  = [
    {
      key:"delete",
      onAction:book => onBookDelete(book.id),
      title:book => {return "删除"}
    }
  ]
  return (
    <div className={classes.main}>
      <Dialog
        open={isDeleteDialogShow}
        onClose={onDeleteDialogCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">确认是否删除</DialogTitle>
        <DialogActions>
          <Button onClick={onDeleteDialogCancel} color="primary">
            取消
          </Button>
          <Button onClick={onDeleteBookFromCollection} color="primary">
            删除
          </Button>
        </DialogActions>
      </Dialog>
      <BookCollection
        books={collectionDetail?.books || []}
        title={'收藏夹'}
        loadingCardCount={32}
        loading={getBooleanWithDefault(loading.effects['collectionDetail/queryBooks'], true)}
        bookCardMenuAction={bookCardMenuActions}
      />
      <div className={classes.paginationWrap}>
        <MaterialPagination

          count={Math.ceil(collectionDetail.count / collectionDetail.pageSize)}
          page={collectionDetail.page}
          onChange={onPaginationChange}
          color={'primary'}
        />
      </div>
    </div>
  );
}

export default connect(({ collectionDetail, layout, loading }: ConnectType) => ({
  collectionDetail,
  layout,
  loading,
}))(CollectionDetail);
