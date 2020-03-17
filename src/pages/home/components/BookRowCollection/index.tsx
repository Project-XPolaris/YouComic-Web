import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Grid } from '@material-ui/core';
import useStyles from '@/pages/home/components/BookRowCollection/style';
import { Book } from '@/services/book';
import BookCard from '@/pages/home/components/BookCard';


interface BookRowCollectionPropsType {
  title: string
  books?: Book[]
  onShowMore?: () => void
}


export default function BookRowCollection({ title, books = [], onShowMore }: BookRowCollectionPropsType) {
  const classes = useStyles();
  const items = books!!.map((book: Book) => {
    return (
      <Grid item={true} key={book.id}>
        <BookCard book={book}/>
      </Grid>
    );
  });
  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <Box className={classes.title}>
          {title}
        </Box>
        {onShowMore !== undefined && <Button variant={'contained'} disableElevation={true} onClick={onShowMore} size={'small'} color={'primary'}>查看更多</Button>}
      </div>
      <Grid container={true} spacing={4}>
        {items}
      </Grid>
    </div>
  );
}
