import useStyles from './style';
import { Book } from '@/services/book';
import { getBookTagInfo } from '@/util/book';
import { history } from '@@/core/umiExports';
import { Box, Card, CardActionArea, CardContent, Link } from '@material-ui/core';
import React from 'react';
import { Skeleton } from '@material-ui/lab';
import ImageLoader from '@/components/ImageLoader';


interface BookCardPropsType {
  book?: Book
  loading: boolean
}


export default function BookCard({ book, loading = false }: BookCardPropsType) {
  const classes = useStyles();
  const { series, author } = getBookTagInfo(book);
  const onCardClick = () => {
    history.push(`/book/${book?.id}`);
  };
  return (
    <Card className={classes.main}>
      <CardActionArea onClick={onCardClick}>
        {loading ? <Skeleton variant="rect" width={160} height={230} animation="wave"/> :
          <ImageLoader url={book?.cover} className={classes.cover} loadingHeight={230} loadingWidth={160}/>}
      </CardActionArea>
      <CardContent className={classes.content}>
        <Link href={`/book/${book?.id}`} className={classes.link}>
          {loading || !book ? <Skeleton variant="text"/> :
            <Box overflow="hidden" width={1} maxWidth={1} className={classes.title}>{book?.name}</Box>}
        </Link>
        {
          loading || !book ?<Skeleton variant="text"/> : (author ?
              <Link href={`/tag/${author?.id}`} className={classes.link}>
                <Box className={classes.author}>{author?.name || '未知'}</Box>
              </Link> :
              <Box className={classes.author}>未知</Box>
          )
        }
        {
          loading || !book ? <Skeleton variant="text"/>:(series ?
              <Link href={`/tag/${series?.id}`} className={classes.link}>
                <Box className={classes.series}>{series?.name || '未知'}</Box>
              </Link> :
              <Box className={classes.series}>未知</Box>
          )
        }

      </CardContent>
    </Card>
  );
}
