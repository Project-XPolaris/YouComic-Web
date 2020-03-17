import React, { useEffect, useState } from 'react';
import { connect, Dispatch } from 'dva';
import { ConnectType } from '@/global/connect';
import { BookListModelStateType } from '@/pages/book/list/model';
import BookCollection, { BookCollectionItem } from '@/layouts/components/BookCollection';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Pagination from '@/layouts/components/Pagination';
import { LayoutModelStateType } from '@/models/layout';

interface BookListPropsType {
  dispatch: Dispatch
  bookList: BookListModelStateType
  layout: LayoutModelStateType
}

const useStyles = makeStyles((theme:Theme) => ({
  main: {
    backgroundColor:"#EEEEEE",
    paddingTop:theme.spacing(20),
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
    minHeight:"100vh"
  },
  mainExpand: {
    paddingTop:theme.spacing(20),
    backgroundColor:"#EEEEEE",
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
    minHeight:"100vh"
  },
  collectionWrap: {},
  paginationWrap: {
    textAlign: 'end',
    marginTop: 32,
  },
}));

function BookListPage({ dispatch, bookList, layout }: BookListPropsType) {

  const classes = useStyles();
  const { books } = bookList;
  const bookItem: BookCollectionItem[] | undefined = books?.map(book => ({
    title: book.name,
    cover: book.cover,
    author: ((tag) => tag ? {
      text: tag.name,
      link: `/tag/${tag.id}`,
    } : undefined)(book.tags.find(tag => tag.type === 'artist')),
    theme: ((tag) => tag ? {
      text: tag.name,
      link: `/tag/${tag.id}`,
    } : undefined)(book.tags.find(tag => tag.type === 'theme')),
    series: ((tag) => tag ? {
      text: tag.name,
      link: `/tag/${tag.id}`,
    } : undefined)(book.tags.find(tag => tag.type === 'series')),
    link: `/book/${book.id}`,
  }));
  const [isFirstLoadBook, setIsFirstLoadBook] = useState(true);
  useEffect(() => {
    if (isFirstLoadBook) {
      dispatch({
        type: 'bookList/queryBooks',
      });
      setIsFirstLoadBook(false);
    }
  });
  const onPaginationChange = (page = bookList.page, pageSize = bookList.pageSize) => {
    dispatch({
      type: 'bookList/setPage',
      payload: {
        page,
        pageSize,
      },
    });
    dispatch({
      type: 'bookList/queryBooks',
    });
  };
  const onNextPage = () => {
    onPaginationChange(bookList.page + 1);
  };
  const onPrevious = () => {
    onPaginationChange(bookList.page - 1);
  };
  const onSelectPage = (page: number) => {
    onPaginationChange(page);
  };
  const { isDrawerOpen } = layout;

  return (
    <div className={isDrawerOpen ? classes.mainExpand : classes.main}>
      <div className={classes.collectionWrap}>
        <BookCollection title={''} books={bookItem || []}/>
        <div className={classes.paginationWrap}>
          <Pagination
            count={bookList.total}
            page={bookList.page}
            pageSize={bookList.pageSize}
            onNextPage={onNextPage}
            onPreviousPage={onPrevious}
            onSelectPage={onSelectPage}
          />
        </div>
      </div>
    </div>
  );
}

export default connect(({ bookList, layout }: ConnectType) => ({ bookList, layout }))(BookListPage);

