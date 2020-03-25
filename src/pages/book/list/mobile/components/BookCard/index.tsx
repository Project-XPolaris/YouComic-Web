import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import router from 'umi/router';
import { Box } from '@material-ui/core';
import { Tag } from '@/services/tag';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    maxHeight: 160,
  },
  media: {
    maxHeight: 160,
    maxWidth:110,
    overflow:"hidden"
  },
  cover:{
    maxHeight:160,
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

});

interface BookCardPropsType {
  cover?: string
  title: string,
  author?: Tag
  theme?: Tag,
  series?: Tag
  link: string
}

const LoadingSkeleton = () => {

};
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
    router.push(link);
  };
  return (
    <Card className={classes.card} square={true}>
      <CardActionArea className={classes.media} onClick={onCardClick}>
        <img src={cover} className={classes.cover}/>
      </CardActionArea>
      <div className={classes.infoArea}>
        <Box
          className={classes.title}
        >
          {title}
        </Box>
        {
          author &&
          <Box
            fontWeight="fontWeightBold"
            fontSize="subtitle2.fontSize"
            className={classes.author}
          >
            {author.name}
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
            {theme.name}
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
            {series.name}
          </Box>
        }
      </div>
    </Card>
  );
}
