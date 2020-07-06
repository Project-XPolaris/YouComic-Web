import CoverImage from '../../../../../assets/no-cover.png';
import ImageLoader from '@/components/ImageLoader';
import { history } from '@@/core/umiExports';
import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Box, Card, CardActionArea } from '@material-ui/core';
import { Book } from '@/services/book';
import { getBookTagInfo } from '@/util/book';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    maxWidth: 330,
    maxHeight: 160,
  },
  media: {
    height: 160,
    width: 110,
    objectFit: 'cover',
  },
  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  meta: {
    marginTop: 8,
  },
  infoArea: {
    marginLeft: 16,
    paddingTop: 16,
    paddingRight: 16,
    flexGrow: 1,
  },
  author: {
    marginTop: 8,
    overflow: 'hidden',
  },
  series: {
    fontSize: 12,
    height: 16,
    overflow: 'hidden',
  },
  actionArea: {
    width: 110,
  },

});

interface BookDetailHorizonCardPropsType {
  book?: Book
  loading?: boolean
}

export default function BookDetailHorizonCard({ book, loading = false }: BookDetailHorizonCardPropsType) {
  const classes = useStyles();
  const onCardClick = () => {
    if (book !== undefined) {
      history.push(`/book/${book.id}`);
    }
  };
  const { series, author } = getBookTagInfo(book);
  return (
    <Card className={classes.card} square={true}>
      <CardActionArea onClick={onCardClick} className={classes.actionArea}>
        {loading ? <Skeleton width={110} height={160} variant={'rect'} animation={'wave'}/> :
          <ImageLoader url={book?.cover || CoverImage} className={classes.media} loadingHeight={160} loadingWidth={110}/>}
      </CardActionArea>
      <div className={classes.infoArea}>
        <Box
          fontWeight="fontWeightLight"
          fontSize="subtitle.fontSize"
          textOverflow="ellipsis"
          className={classes.title}
        >
          {
            loading ?
              <div>
                <Skeleton variant={'text'}/>
                <Skeleton variant={'text'} width={64}/>
              </div>
              : book?.name
          }

        </Box>
        <Box fontWeight="fontWeightBold" fontSize="subtitle2.fontSize" className={classes.author}>
          {loading ? <Skeleton variant={'text'} width={120}/> : author?.name}
        </Box>
        <div>


          <Box
            fontWeight="fontWeightLight"
            fontSize="caption.fontSize"
            textOverflow="ellipsis"
            className={classes.series}
          >
            {loading ? <Skeleton variant={'text'} width={96}/> : series?.name}
          </Box>
        </div>

      </div>
    </Card>
  );
}
