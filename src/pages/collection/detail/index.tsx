import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { connect, Dispatch } from 'dva';
import { ConnectType } from '@/global/connect';
import { CollectionDetailModelStateType } from '@/pages/collection/detail/model';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@material-ui/core';
import { getBookTagInfo } from '@/util/book';
import { Book } from '@/services/book';
import CollectionBookCard from '@/pages/collection/detail/components/CollectionBookCard';
import Pagination from '@/layouts/components/Pagination';
import useStyles from '@/pages/collection/detail/style';
import { LayoutModelStateType } from '@/models/layout';




interface CollectionDetailPropsType {
  dispatch: Dispatch,
  collectionDetail: CollectionDetailModelStateType,
  onDelete: (id: number) => void
  layout:LayoutModelStateType
}

function CollectionDetail({ dispatch, collectionDetail ,layout}: CollectionDetailPropsType) {
  const classes = useStyles();
  const {isDrawerOpen} = layout;
  const [actionBookId, setActonBookId] = useState<number | undefined>(undefined);
  const [isDeleteDialogShow, setIsDeleteDialogShow] = useState<boolean>(false);
  const onBookDelete = (id: number) => {
    setActonBookId(id);
    setIsDeleteDialogShow(true);
  };
  const renderBooks = () => {
    const { books } = collectionDetail;
    if (books) {
      return books.map((book: Book) => {
        const { series, author, theme } = getBookTagInfo(book);
        return (
          <Grid item={true} key={book.id} xs={6} sm={isDrawerOpen?4:3} md={isDrawerOpen?4:3} lg={3} xl={2}>
            <CollectionBookCard
              onDelete={onBookDelete}
              id={book.id}
              title={book.name}
              link={`/book/${book.id}`}
              cover={book.cover}
              author={{
                text: author?.name,
                link: author ? `/tag/${author.id}` : undefined,
              }}
              series={{
                text: series?.name,
                link: series ? `/tag/${series.id}` : undefined,
              }}
              theme={{
                text: theme?.name,
                link: theme ? `/tag/${theme.id}` : undefined,
              }}
            />
          </Grid>
        );
      });
    } else {
      return undefined;
    }
  };
  const onNextPage = () => {
    dispatch({
      type: 'collectionDetail/setPage',
      payload: {
        page: collectionDetail.page + 1,
        pageSize: collectionDetail.pageSize,
      },
    });
    dispatch({
      type: 'collectionDetail/querySummaryBooks',
    });
  };
  const onPreviousPage = () => {
    dispatch({
      type: 'collectionDetail/setPage',
      payload: {
        page: collectionDetail.page - 1,
        pageSize: collectionDetail.pageSize,
      },
    });
    dispatch({
      type: 'collectionDetail/querySummaryBooks',
    });
  };
  const onSelectPage = (page: number) => {
    dispatch({
      type: 'collectionDetail/setPage',
      payload: {
        page: page,
        pageSize: collectionDetail.pageSize,
      },
    });
    dispatch({
      type: 'collectionDetail/querySummaryBooks',
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
      <Grid container={true} spacing={4}>
        {renderBooks()}
      </Grid>
      <div className={classes.paginationWrap}>
        <Pagination
          count={collectionDetail.count}
          page={collectionDetail.page}
          pageSize={collectionDetail.pageSize}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
          onSelectPage={onSelectPage}
        />
      </div>
    </div>
  );
}

export default connect(({ collectionDetail ,layout}: ConnectType) => ({ collectionDetail,layout }))(CollectionDetail);
