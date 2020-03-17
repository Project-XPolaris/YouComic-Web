import React from 'react';
import useStyles from './style';
import { Book } from '@/services/book';
import { Box, Card, CardActionArea, CardContent } from '@material-ui/core';
import { getBookTagInfo } from '@/util/book';
import router from 'umi/router';


interface BookCardPropsType {
  book: Book
}


export default function BookCard({ book }: BookCardPropsType) {
  const classes = useStyles();
  const { series, author, theme } = getBookTagInfo(book);
  const onCardClick = () => {
    router.push(`/book/${book.id}`)
  };
  return (
    <Card className={classes.main}>
      <CardActionArea onClick={onCardClick}>
        <img src={book.cover} className={classes.cover}/>
      </CardActionArea>
      <CardContent>
        <Box overflow="hidden" width={1} maxWidth={1} className={classes.title}>{book.name}</Box>
        <Box className={classes.author}>{author?.name}</Box>
      </CardContent>
    </Card>
  );
}
