import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CoverImage from '../../../../../assets/no-cover.png';
import router from 'umi/router';
import { Box } from '@material-ui/core';
import ImageLoader from '@/components/ImageLoader';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    maxWidth: 330,
    maxHeight: 160,
  },
  media: {
    maxHeight: 160,
    maxWidth: 110,
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
  },
  author: {
    marginTop: 8,
    overflow: 'hidden',
  },
  series: {
    fontSize: 12,
    height: 16,
    overflow:'hidden'
  },

});

interface BookDetailHorizonCardPropsType {
  cover?: string
  title: string,
  author?: {
    text?: string,
    link?: string
  }
  theme?: {
    text?: string,
    link?: string
  },
  series?: {
    text?: string,
    link?: string
  }
  link: string
}

const LoadingSkeleton = () => {

};
export default function BookDetailHorizonCard({
                                                cover,
                                                title = '未知',
                                                author = { text: '未知作者', link: '#' },
                                                theme,
                                                series,
                                                link,
                                              }: BookDetailHorizonCardPropsType) {
  const classes = useStyles();
  const onCardClick = () => {
    router.push(link);
  };
  return (
    <Card className={classes.card} square={true}>
      <CardActionArea className={classes.media} onClick={onCardClick}>
        <div>
          <ImageLoader url={cover || CoverImage} className={classes.media} />
        </div>
      </CardActionArea>
      <div className={classes.infoArea}>
        <Box fontWeight="fontWeightLight" fontSize="subtitle.fontSize" textOverflow="ellipsis"
             className={classes.title}>
          {title}
        </Box>
        <Box fontWeight="fontWeightBold" fontSize="subtitle2.fontSize" className={classes.author}>
          {author.text}
        </Box>
        <div>
          {series && <Box fontWeight="fontWeightLight" fontSize="caption.fontSize" textOverflow="ellipsis"
                          className={classes.series}>{series.text}</Box>}
        </div>

      </div>
      {/*<CardContent>*/}
      {/*  <Typography gutterBottom={true} noWrap={true} variant="subtitle2" component="h2" className={classes.title}>*/}
      {/*    {title}*/}
      {/*  </Typography>*/}
      {/*  <Typography variant="body2" noWrap={true} color="textPrimary" component="p">*/}
      {/*    {author.text}*/}
      {/*  </Typography>*/}
      {/*  {theme && <Typography noWrap={true} variant="body2" color="textSecondary" component="p"*/}
      {/*                        className={classes.meta}>{theme.text}</Typography>}*/}
      {/*  {series && <Typography noWrap={true} variant="body2" color="textSecondary" component="p"*/}
      {/*                         className={classes.meta}>{series.text}</Typography>}*/}
      {/*</CardContent>*/}

    </Card>
  );
}
