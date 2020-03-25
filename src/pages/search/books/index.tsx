import React from 'react';
import { connect, Dispatch } from 'dva';
import { ConnectType } from '@/global/connect';
import useStyles from './style';
import BookRowCollection from '@/pages/home/components/BookRowCollection';
import { SearchBooksModelStateType } from '@/pages/search/books/model';
import { LayoutModelStateType } from '@/models/layout';
import MaterialPagination from '@material-ui/lab/Pagination';

interface SearchBooksPagePropsType {
  dispatch: Dispatch,
  searchBooks: SearchBooksModelStateType
  layout: LayoutModelStateType
}

function SearchBooksPage({ dispatch, searchBooks, layout }: SearchBooksPagePropsType) {
  const classes = useStyles();
  const { books } = searchBooks;
  const onPaginationChange = (e:any,page = searchBooks.page) => {
    dispatch({
      type: 'searchBooks/setPage',
      payload: {
        page,
        pageSize:searchBooks.pageSize,
      },
    });
    dispatch({
      type: 'searchBooks/searchBooks',
    });
  };
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
}))(SearchBooksPage);
