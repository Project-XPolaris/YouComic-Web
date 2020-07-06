import BookCollection from '@/layouts/components/BookCollection';
import { ConnectType } from '@/global/connect';
import { TagDetailModelStateType } from '@/pages/tag/detail/model';
import { LayoutModelStateType } from '@/models/layout';
import MaterialPagination from '@material-ui/lab/Pagination';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Dispatch, Loading } from '@@/plugin-dva/connect';
import { connect } from '@@/plugin-dva/exports';
import React from 'react';
import { getBooleanWithDefault } from '@/util/function';

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    paddingTop: theme.spacing(12),
    [theme.breakpoints.only('xs')]: {
      paddingLeft: 12,
      paddingRight: 12,
    },
    [theme.breakpoints.only('sm')]: {
      paddingLeft: 24,
      paddingRight: 24,
    },
    [theme.breakpoints.only('md')]: {
      paddingLeft: 48,
      paddingRight: 48,
    },
    [theme.breakpoints.only('lg')]: {
      paddingLeft: 72,
      paddingRight: 72,
    },
    [theme.breakpoints.only('xl')]: {
      paddingLeft: 420,
      paddingRight: 420,
    },
    paddingBottom: 48,
    minHeight: '100vh',

  },
  mainExpand: {
    paddingTop: theme.spacing(12),
    [theme.breakpoints.only('xs')]: {
      paddingLeft: 12,
      paddingRight: 12,
    },
    [theme.breakpoints.only('sm')]: {
      paddingLeft: 24,
      paddingRight: 24,
    },
    [theme.breakpoints.only('md')]: {
      paddingLeft: 48,
      paddingRight: 48,
    },
    [theme.breakpoints.only('lg')]: {
      paddingLeft: 72,
      paddingRight: 72,
    },
    [theme.breakpoints.only('xl')]: {
      transition: theme.transitions.create('padding', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      paddingLeft: 300,
      paddingRight: 300,
    },
    paddingBottom: 48,
    minHeight: '100vh',
  },
  paginationWrap: {
    textAlign: 'end',
    marginTop: 32,
  },
}));

interface TagDetailPagePropsType {
  tagDetail: TagDetailModelStateType
  layout: LayoutModelStateType
  dispatch: Dispatch
  loading: Loading
}


function TagDetailPage({ tagDetail, layout, dispatch, loading }: TagDetailPagePropsType) {
  const classes = useStyles();
  const { books, tag } = tagDetail;
  const { isDrawerOpen } = layout;
  const bookItem = books;
  const onPaginationChange = (_: any, page = tagDetail.page) => (pageSize = tagDetail.pageSize) => {
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
  return (
    <div className={isDrawerOpen ? classes.mainExpand : classes.main}>
      <BookCollection
        title={tag ? tag.name : '标签'}
        books={bookItem || []}
        loading={getBooleanWithDefault(loading.effects['tagDetail/queryBooks'], true)}
      />
      <div className={classes.paginationWrap}>
        <MaterialPagination
          count={Math.ceil(tagDetail.count / tagDetail.pageSize)}
          page={tagDetail.page}
          onChange={onPaginationChange}
          color={'primary'}
        />
      </div>
    </div>
  );
}

export default connect(({ tagDetail, layout, loading }: ConnectType) => ({
  tagDetail,
  layout,
  loading,
}))(TagDetailPage);
