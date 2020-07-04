import React from 'react';
import useStyles from './style';
import { Book } from '@/services/book';
import { Box, Card, CardActionArea, CardContent, Link } from '@material-ui/core';
import { getBookTagInfo } from '@/util/book';
import ImageLoader from '@/components/ImageLoader';
import { history } from '@@/core/umiExports';


interface BookCardPropsType {
  book: Book
}


export default function BookCard({ book }: BookCardPropsType) {
  const classes = useStyles();
  const { series, author } = getBookTagInfo(book);
  const onCardClick = () => {
    history.push(`/book/${book.id}`);
  };
  return (
    <Card className={classes.main}>
      <CardActionArea onClick={onCardClick}>
        <ImageLoader url={book.cover} className={classes.cover}/>
      </CardActionArea>
      <CardContent className={classes.content}>
        <Link href={`/book/${book.id}`} className={classes.link}>
          <Box overflow="hidden" width={1} maxWidth={1} className={classes.title}>{book.name}</Box>
        </Link>
        {
          author ?
            <Link href={`/tag/${author.id}`} className={classes.link}>
              <Box className={classes.author}>{author?.name || '未知'}</Box>
            </Link> :
            <Box className={classes.author}>未知</Box>
        }
        {
          series ?
            <Link href={`/tag/${series.id}`} className={classes.link}>
              <Box className={classes.series}>{series?.name || '未知'}</Box>
            </Link> :
            <Box className={classes.series}>未知</Box>
        }

      </CardContent>
    </Card>
  );
}
