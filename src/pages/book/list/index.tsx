import { ConnectType } from '@/global/connect';
import { BookListModelStateType } from '@/pages/book/list/model';
import BookCollection from '@/layouts/components/BookCollection';
import { LayoutModelStateType } from '@/models/layout';
import BoolListMobilePage from '@/pages/book/list/mobile';
import { updateQueryParamAndReplaceURL } from '@/util/url';
import { Dispatch, Loading } from '@@/plugin-dva/connect';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { isWidthDown, withWidth } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import React from 'react';
import { connect } from '@@/plugin-dva/exports';

interface BookListPropsType {
  dispatch: Dispatch
  bookList: BookListModelStateType
  layout: LayoutModelStateType
  width: any
  loading: Loading
}

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    backgroundColor: '#EEEEEE',
    paddingTop: theme.spacing(20),
    [theme.breakpoints.only('xs')]: {
      paddingLeft: 12,
      paddingRight: 12,
    },
    [theme.breakpoints.only('sm')]: {
      paddingLeft: 24,
      paddingRight: 24,
    },
    [theme.breakpoints.only('md')]: {
      paddingLeft: 32,
      paddingRight: 32,
    },
    [theme.breakpoints.only('lg')]: {
      paddingLeft: 72,
      paddingRight: 72,
    },
    [theme.breakpoints.only('xl')]: {
      paddingLeft: theme.spacing(30),
      paddingRight: theme.spacing(30),
    },
    paddingBottom: 48,
    minHeight: '100vh',
  },
  mainExpand: {
    paddingTop: theme.spacing(20),
    backgroundColor: '#EEEEEE',
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
      paddingLeft: theme.spacing(30),
      paddingRight: theme.spacing(30),
    },
    paddingBottom: 48,
    minHeight: '100vh',
  },
  collectionWrap: {},
  paginationWrap: {
    textAlign: 'end',
    marginTop: 32,
  },
}));

function BookListPage({ dispatch, bookList, layout, width, loading }: BookListPropsType) {

  const classes = useStyles();
  const { books } = bookList;
  const onSelectPage = (_: any, page: number) => {
    updateQueryParamAndReplaceURL({
      page,
    }, window.location.pathname);
  };
  const { isDrawerOpen } = layout;

  if (isWidthDown('md', width)) {
    return (
      <BoolListMobilePage/>
    );
  } else {
    return (
      <div className={isDrawerOpen ? classes.mainExpand : classes.main}>
        <div className={classes.collectionWrap}>
          <BookCollection title={''} books={books || []} loading={loading.effects['bookList/queryBooks']}/>
          <div className={classes.paginationWrap}>
            <Pagination
              count={Math.ceil(bookList.total / bookList.pageSize)}
              page={bookList.page}
              onChange={onSelectPage}
              color={'primary'}
            />
          </div>
        </div>
      </div>
    );
  }

}

export default connect(({ bookList, layout, loading }: ConnectType) => ({
  bookList,
  layout,
  loading,
}))(withWidth()(BookListPage));

