import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BookCard from '@/components/BookCard';
import { Book } from '@/services/book';

const useStyles = makeStyles({
  main: {},

});


interface BookCollectionPropsType {
  title: string,
  books: Book[]
  loading?: boolean
}

export default function BookCollection({ title, books,loading = false }: BookCollectionPropsType) {
  const classes = useStyles();
  const items = books.map((book:Book) => (
    <Grid item={true} key={book.name}>
      <BookCard
        book={book}
        loading={loading}
      />
    </Grid>
  ));
  return (
    <div className={classes.main}>
      <Typography variant="h5">
        {title}
      </Typography>
      <Grid container={true} spacing={1}>
        {items}
      </Grid>
    </div>
  );
}
