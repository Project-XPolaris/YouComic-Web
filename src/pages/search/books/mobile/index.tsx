import { makeStyles } from '@material-ui/core/styles';
import { connect, Dispatch } from 'dva';
import BookCollection from '@/pages/book/list/mobile/components/BookCollection';
import { ConnectType } from '@/global/connect';
import React from 'react';
import { SearchBooksModelStateType } from '@/pages/search/books/model';

const useStyles = makeStyles({
  main: {
    paddingTop:130,
    minHeight: '100vh',
    backgroundColor: '#EEEEEE',

  },

});

interface SearchBookMobilePagePropsType {
  dispatch: Dispatch,
  searchBooks:SearchBooksModelStateType
}

function SearchBookMobilePage({ dispatch,searchBooks:{mobile} }: SearchBookMobilePagePropsType) {
  const classes = useStyles();
  const onLoadMore = () => {
    dispatch({
      type:"searchBooks/queryMobileBook",
    })
  }
  return (
    <div className={classes.main}>
      <BookCollection
        books={mobile.books}
        onLoadMore={onLoadMore}
        hasMore={mobile.hasMore}
      />
    </div>
  );
}

export default connect(({searchBooks}:ConnectType) => ({searchBooks}))(SearchBookMobilePage);
