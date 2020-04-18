import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CoverImage from '../../../../../assets/no-cover.png';
import router from 'umi/router';
import ImageLoader from '@/components/ImageLoader';

const useStyles = makeStyles({
  card: {
    maxWidth: 120,
    height: 300,
    border:"solid 1px #EEEEEE"
  },
  media: {
    height: 170,
  },
  title: {},
  meta: {
    marginTop: 8,
  },
});

interface BookDetailCardPropsType {
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
export default function BookDetailCard({
                                   cover,
                                   title = '未知',
                                   author = { text: '未知作者', link: '#' },
                                   theme,
                                   series,
                                   link,
                                 }: BookDetailCardPropsType) {
  const classes = useStyles();
  const onCardClick = () => {
    router.push(link)
  };
  return (
    <Card className={classes.card} elevation={0}>
      <CardActionArea onClick={onCardClick}>
        <ImageLoader className={classes.media} url={cover || CoverImage} />
      </CardActionArea>
      <CardContent>
        <Typography gutterBottom={true} noWrap={true} variant="subtitle2" component="h2" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="body2" noWrap={true} color="textPrimary" component="p">
          {author.text}
        </Typography>
        {theme && <Typography noWrap={true} variant="body2" color="textSecondary" component="p"
                              className={classes.meta}>{theme.text}</Typography>}
        {series && <Typography noWrap={true} variant="caption" color="textSecondary" component="p"
                               className={classes.meta}>{series.text}</Typography>}
      </CardContent>

    </Card>
  );
}
