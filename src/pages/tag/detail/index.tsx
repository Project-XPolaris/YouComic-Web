import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BookCollection, { BookCollectionItem } from '@/layouts/components/BookCollection';
import { connect, Dispatch } from 'dva';
import { ConnectType } from '@/global/connect';
import { TagDetailModelStateType } from '@/pages/tag/detail/model';
import { LayoutModelStateType } from '@/models/layout';
import Pagination from '@/layouts/components/Pagination';

const useStyles = makeStyles(theme => ({
  main: {
    paddingTop:theme.spacing(12),
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
    minHeight:"100vh",

  },
  mainExpand: {
    paddingTop:theme.spacing(12),
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
    minHeight:"100vh",
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
}


function TagDetailPage({ tagDetail, layout, dispatch }: TagDetailPagePropsType) {
  const classes = useStyles();
  const { books, tag, pageSize, page, count } = tagDetail;
  const { isDrawerOpen } = layout;
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
  const onPaginationChange = (page = tagDetail.page, pageSize = tagDetail.pageSize) => {
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
  const onNextPage = () => {
    onPaginationChange(page + 1);
  };
  const onPrevious = () => {
    onPaginationChange(page - 1);
  };
  const onSelectPage = (currentPage: number) => {
    onPaginationChange(currentPage);
  };
  return (
    <div className={isDrawerOpen ? classes.mainExpand : classes.main}>
      <BookCollection title={tag ? tag.name : '标签'} books={bookItem || []}/>
      <div className={classes.paginationWrap}>
        <Pagination
          count={count}
          page={page}
          pageSize={pageSize}
          onNextPage={onNextPage}
          onPreviousPage={onPrevious}
          onSelectPage={onSelectPage}
        />
      </div>
    </div>
  );
}

export default connect(({ tagDetail, layout }: ConnectType) => ({ tagDetail, layout }))(TagDetailPage);
