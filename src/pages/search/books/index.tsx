import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect, Dispatch } from 'dva';
import { ConnectType } from '@/global/connect';
import useStyles from './style';
import BookRowCollection from '@/pages/home/components/BookRowCollection';
import { SearchBooksModelStateType } from '@/pages/search/books/model';
import { LayoutModelStateType } from '@/models/layout';
import Pagination from '@/layouts/components/Pagination';


interface SearchBooksPagePropsType {
  dispatch: Dispatch,
  searchBooks: SearchBooksModelStateType
  layout: LayoutModelStateType
}

function SearchBooksPage({ dispatch, searchBooks, layout }: SearchBooksPagePropsType) {
  const classes = useStyles();
  const { books } = searchBooks;
  const onPaginationChange = (page = searchBooks.page, pageSize = searchBooks.pageSize) => {
    dispatch({
      type: 'searchBooks/setPage',
      payload: {
        page,
        pageSize,
      },
    });
    dispatch({
      type: 'searchBooks/searchBooks',
    });
  };
  const onNextPage = () => {
    onPaginationChange(searchBooks.page + 1);
  };
  const onPrevious = () => {
    onPaginationChange(searchBooks.page - 1);
  };
  const onSelectPage = (currentPage: number) => {
    onPaginationChange(currentPage);
  };
  return (
    <div className={layout.isDrawerOpen ? classes.mainExpand : classes.main}>
      <BookRowCollection title={''} books={books}/>
      <div className={classes.paginationWrap}>
        <Pagination
          count={searchBooks.count}
          page={searchBooks.page}
          pageSize={searchBooks.pageSize}
          onNextPage={onNextPage}
          onPreviousPage={onPrevious}
          onSelectPage={onSelectPage}
        />
      </div>
    </div>
  );
}

export default connect(({ search, searchBooks, layout }: ConnectType) => ({
  search,
  searchBooks,
  layout,
}))(SearchBooksPage);
