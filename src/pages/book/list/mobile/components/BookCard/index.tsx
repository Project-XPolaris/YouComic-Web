import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Box, Link } from '@material-ui/core';
import { Tag } from '@/services/tag';
import ImageLoader from '@/components/ImageLoader';
import { history } from '@@/core/umiExports';

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
  cover?: string
  title: string,
  author?: Tag
  theme?: Tag,
  series?: Tag
  link: string
}

export default function BookCard({
                                   cover,
                                   title = '未知',
                                   author,
                                   theme,
                                   series,
                                   link,
                                 }: BookCardPropsType) {
  const classes = useStyles();
  const onCardClick = () => {
    history.push(link);
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
        <ImageLoader className={classes.cover} url={cover}/>
      </CardActionArea>
      <div className={classes.infoArea}>
        <Box
          className={classes.title}
        >
          <Link onClick={onCardClick} className={classes.textLink}>
            {title}
          </Link>

        </Box>
        {
          author &&
          <Box
            fontWeight="fontWeightBold"
            fontSize="subtitle2.fontSize"
            className={classes.author}
          >
            <Link onClick={onAuthorClick} className={classes.textLink}>
              {author.name}
            </Link>
          </Box>
        }
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
