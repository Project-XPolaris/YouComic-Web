import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CoverImage from '../../../../../assets/no-cover.png';
import router from 'umi/router';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  media: {
    maxHeight: 160,
    maxWidth:114
  },
  title: {
    overflow:"hidden",
    textOverflow: "ellipsis"
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
    overflow:"hidden",
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
      <img src={cover || CoverImage} className={classes.media}/>
      </CardActionArea>
      <div className={classes.infoArea}>
        <Box fontWeight="fontWeightLight" fontSize="subtitle.fontSize" textOverflow="ellipsis" className={classes.title}>
          {title}
        </Box>
        <Box fontWeight="fontWeightBold" fontSize="subtitle2.fontSize" className={classes.author}>
          {author.text}
        </Box>
        {theme && <Box fontWeight="fontWeightLight" fontSize="caption.fontSize" textOverflow="ellipsis"  className={classes.author}>{author.text}</Box>}
        {series && <Box fontWeight="fontWeightLight" fontSize="caption.fontSize"  textOverflow="ellipsis" className={classes.author}>{series.text}</Box>}

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
