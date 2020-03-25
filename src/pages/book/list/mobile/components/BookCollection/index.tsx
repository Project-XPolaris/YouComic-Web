import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Book } from '@/services/book';
import BookCard from '@/pages/book/list/mobile/components/BookCard';
import { getBookTagInfo } from '@/util/book';
import InfiniteScroll from 'react-infinite-scroller';

const useStyles = makeStyles({
  main: {},
  item: {
    marginBottom: 8,
  },
});

interface BookCollectionPropsType {
  books?: Book[]
  onLoadMore:(page:any) => void
  hasMore:boolean
}


export default function BookCollection({ books = [],onLoadMore,hasMore}: BookCollectionPropsType) {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <InfiniteScroll
        pageStart={0}
        loadMore={onLoadMore}
        hasMore={hasMore}
        loader={<div className="loader" key={0}>Loading ...</div>}
        useWindow={true}
      >
        {
          books.map(book => {
            const { series, author, theme } = getBookTagInfo(book);
            return (
              <div className={classes.item}>

                <BookCard
                  title={book.name}
                  link={`/book/${book.id}`}
                  series={series}
                  author={author}
                  cover={book.cover}
                />
              </div>
            );
          })
        }
      </InfiniteScroll>

    </div>
  );
}
