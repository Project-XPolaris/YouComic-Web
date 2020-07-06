import useStyles from '@/pages/home/components/BookRowCollection/style';
import { Book } from '@/services/book';
import BookCard from '@/components/BookCard';
import { Box, Button, Grid } from '@material-ui/core';
import React from 'react';


interface BookRowCollectionPropsType {
  title: string
  books?: Book[]
  onShowMore?: () => void
  loading:boolean
}


export default function BookRowCollection({ title, books = [], onShowMore,loading }: BookRowCollectionPropsType) {
  const classes = useStyles();
  const items = books!!.map((book: Book) => {
    return (
      <Grid item={true} key={book.id} style={{ padding: 8 }}>
        <BookCard book={book} loading={loading}/>
      </Grid>
    );
  });
  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <Box className={classes.title}>
          {title}
        </Box>
        {onShowMore !== undefined &&
        <Button
          variant={'contained'}
          disableElevation={true}
          onClick={onShowMore}
          size={'small'}
          color={'primary'}
        >查看更多
        </Button>}
      </div>
      <Grid container={true}>
        {items}
      </Grid>
    </div>
  );
}
