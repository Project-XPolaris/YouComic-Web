import React from 'react';
import { connect, Dispatch } from 'dva';
import { ConnectType } from '@/global/connect';
import useStyles from './style';
import BookRowCollection from '@/pages/home/components/BookRowCollection';
import { SearchBooksModelStateType } from '@/pages/search/books/model';
import { LayoutModelStateType } from '@/models/layout';
import MaterialPagination from '@material-ui/lab/Pagination';
import { updateQueryParamAndReplaceURL } from '@/util/url';
import { withWidth,isWidthDown } from '@material-ui/core';
import SearchBookMobilePage from '@/pages/search/books/mobile';

interface SearchBooksPagePropsType {
  dispatch: Dispatch,
  searchBooks: SearchBooksModelStateType
  layout: LayoutModelStateType
  width:any
}

function SearchBooksPage({ dispatch, searchBooks, layout,width }: SearchBooksPagePropsType) {
  const classes = useStyles();
  const { books } = searchBooks;
  const onPaginationChange = (e:any,page = searchBooks.page) => {
    updateQueryParamAndReplaceURL({
      page
    })
  };
  if (isWidthDown("md",width)){
    return (
      <SearchBookMobilePage />
    )
  }
  return (
    <div className={layout.isDrawerOpen ? classes.mainExpand : classes.main}>
      <BookRowCollection title={''} books={books}/>
      <div className={classes.paginationWrap}>
        <MaterialPagination
          page={searchBooks.page}
          count={Math.ceil(searchBooks.count / searchBooks.pageSize)}
          color="primary"
          onChange={onPaginationChange}
        />
      </div>
    </div>
  );
}

export default connect(({ search, searchBooks, layout }: ConnectType) => ({
  search,
  searchBooks,
  layout,
}))(withWidth()(SearchBooksPage));
