import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BookCard, { BookCardAction } from '@/components/BookCard';
import { Book } from '@/services/book';
import style from './style.less';

const useStyles = makeStyles({
  main: {},

});


interface BookCollectionPropsType {
  title: string,
  books: Book[]
  loading?: boolean
  loadingCardCount?:number
  bookCardMenuAction?:BookCardAction[]
  titleClassName?:any
}

export default function BookCollection({ title, books,loading = false,loadingCardCount = 6,bookCardMenuAction,titleClassName = style.title }: BookCollectionPropsType) {
  const classes = useStyles();
  const renderItems = () => {
    if (loading){
      return [...Array(loadingCardCount).keys()].map(idx => (
        <Grid item={true} key={idx}>
          <BookCard
            loading={loading}
          />
        </Grid>
      ))
    }
    return books.map((book:Book) => (
      <Grid item={true} key={book.name}>
        <BookCard
          book={book}
          loading={loading}
          menuAction={bookCardMenuAction}
        />
      </Grid>
    ));
  }

  return (
    <div className={classes.main}>
      <div className={titleClassName}>
        <Typography variant="h5" >
          {title}
        </Typography>
      </div>

      <Grid container={true} spacing={1}>
        {renderItems()}
      </Grid>
    </div>
  );
}
