import React, { useEffect, useLayoutEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect, Dispatch } from 'dva';
import { ConnectType } from '@/global/connect';
import { BookListModelStateType } from '@/pages/book/list/model';
import BookCollection from '@/pages/book/list/mobile/components/BookCollection';


const useStyles = makeStyles({
  main: {
    paddingTop:130,
    minHeight: '100vh',
    backgroundColor: '#EEEEEE',

  },

});

interface BoolListMobilePagePropsType {
  dispatch: Dispatch,
  bookList:BookListModelStateType
}

function BoolListMobilePage({ dispatch,bookList:{mobile} }: BoolListMobilePagePropsType) {
  const classes = useStyles();
  const [startPage,setStartPage] = useState(0)
  let bookCollectionScrollRef : any
  useLayoutEffect(() => {
    bookCollectionScrollRef.pageLoaded = mobile.page
  })
  const onLoadMore = (page:any) => {
    dispatch({
      type:"bookList/queryMobileBook",
      payload:{
        page
      }
    })
  }
  return (
    <div className={classes.main}>
      <BookCollection
        books={mobile.books}
        onLoadMore={onLoadMore}
        hasMore={mobile.hasMore}
        startPage={startPage}
        scrollRef={ref => bookCollectionScrollRef = ref}
      />
    </div>
  );
}

export default connect(({bookList}:ConnectType) => ({bookList}))(BoolListMobilePage);
