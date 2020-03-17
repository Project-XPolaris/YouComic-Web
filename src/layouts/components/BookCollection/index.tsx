import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import BookCard from '@/layouts/components/BookCard';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  main: {},

});

export interface BookCollectionItem {
  cover?: string
  title: string,
  author?: {
    text: string,
    link: string
  }
  theme?: {
    text: string,
    link: string
  },
  series?: {
    text: string,
    link: string
  }
  link: string,

}

interface BookCollectionPropsType {
  title: string,
  books: BookCollectionItem[]
  loading?: boolean
}

export default function BookCollection({ title, books}: BookCollectionPropsType) {
  const classes = useStyles();
  const items = books.map(book => (
    <Grid item={true}  key={book.title} spacing={8}>
      <BookCard title={book.title} author={book.author} theme={book.theme} series={book.series} cover={book.cover} link={book.link} />
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
