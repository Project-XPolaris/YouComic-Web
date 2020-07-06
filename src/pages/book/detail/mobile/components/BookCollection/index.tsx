import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BookCard from '@/components/BookCard';
import { Book } from '@/services/book';

const useStyles = makeStyles({
  main: {
    display: 'flex',
    overflowX: 'scroll',
  },
  itemContainer: {
    display: 'flex',
    paddingTop:4,
    paddingBottom:24
  },
  item:{
    marginRight:12
  }
});

interface BookCollectionPropsType {
  books: Book[]
}


export default function BookCollection({ books }: BookCollectionPropsType) {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <div className={classes.itemContainer}>
        {
          books.map(book =>
            <div className={classes.item} key={book.id}>
            <BookCard book={book} />
            </div>
          )
        }
      </div>
    </div>

  );
}
