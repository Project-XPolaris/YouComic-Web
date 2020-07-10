import { makeStyles } from '@material-ui/core/styles';
import { Book } from '@/services/book';
import BookCard from '@/pages/book/list/mobile/components/BookCard';
import InfiniteScroll from 'react-infinite-scroller';
import { Divider } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  main: {},
  item: {},
});

interface BookCollectionPropsType {
  books?: Book[]
  onLoadMore: (page: any) => void
  hasMore: boolean
}


export default function BookCollection({ books = [], onLoadMore, hasMore }: BookCollectionPropsType) {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <InfiniteScroll
        pageStart={0}
        loadMore={onLoadMore}
        hasMore={hasMore}
        loader={<></>}
        useWindow={true}
      >
        {
          books.map(book => {
            return (
              <div className={classes.item} key={book.id}>
                <BookCard
                  book={book}
                />
                <Divider/>
              </div>
            );
          })
        }
      </InfiniteScroll>

    </div>
  );
}
