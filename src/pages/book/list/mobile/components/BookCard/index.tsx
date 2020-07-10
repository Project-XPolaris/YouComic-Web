import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Box, Link } from '@material-ui/core';
import ImageLoader from '@/components/ImageLoader';
import { history } from '@@/core/umiExports';
import { Book } from '@/services/book';
import { getBookTagInfo } from '@/util/book';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    maxHeight: 160,
    background: '#FFF',
  },
  media: {
    maxHeight: 160,
    maxWidth: 110,
    overflow: 'hidden',
  },
  cover: {
    maxHeight: 160,
  },
  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: 18,
    fontWeight: 300,
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
  textLink: {
    color: '#222',
  },

});

interface BookCardPropsType {
  book?: Book,
  loading?: boolean
}

export default function BookCard(
  { book, loading = true }: BookCardPropsType) {
  const classes = useStyles();
  const { author, theme, series } = getBookTagInfo(book);
  const onCardClick = () => {
    if (book) {
      history.push(`/book/${book?.id}`);
    }
  };
  const onAuthorClick = () => {
    if (author) {
      history.push(`/tag/${author.id}`);
    }
  };
  const onThemeClick = () => {
    if (theme) {
      history.push(`/tag/${theme.id}`);
    }
  };
  const onSeriesClick = () => {
    if (series) {
      history.push(`/tag/${series.id}`);
    }
  };
  return (
    <div className={classes.card}>
      <CardActionArea className={classes.media} onClick={onCardClick}>
        <ImageLoader className={classes.cover} url={book?.cover || ''}/>
      </CardActionArea>
      <div className={classes.infoArea}>
        <Box
          className={classes.title}
        >
          <Link onClick={onCardClick} className={classes.textLink}>
            {loading ? <Skeleton variant="text" animation={'wave'}/> : book?.name}
          </Link>

        </Box>
        <Box
          fontWeight="fontWeightBold"
          fontSize="subtitle2.fontSize"
          className={classes.author}
        >
          <Link onClick={onAuthorClick} className={classes.textLink}>
            {loading ? <Skeleton variant="text" animation={'wave'} width={120}/> : author.name}
          </Link>
        </Box>
        {
          theme &&
          <Box
            fontWeight="fontWeightLight"
            fontSize="caption.fontSize"
            textOverflow="ellipsis"
            className={classes.author}
          >
            <Link onClick={onThemeClick} className={classes.textLink}>
              {theme.name}
            </Link>
          </Box>
        }
        {
          series &&
          <Box
            fontWeight="fontWeightLight"
            fontSize="caption.fontSize"
            textOverflow="ellipsis"
            className={classes.author}
          >
            <Link onClick={onSeriesClick} className={classes.textLink}>
              {series.name}
            </Link>
          </Box>
        }
      </div>
    </div>
  );
}
