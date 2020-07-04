import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import ImageLoader from '@/components/ImageLoader';
import { history } from '@@/core/umiExports';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    maxWidth: theme.spacing(16),
    minHeight: theme.spacing(38),
  },
  media: {
    maxHeight: theme.spacing(24),
  },
  title: {
    maxWidth: theme.spacing(16),
  },
  meta: {
    marginTop: 8,
  },
}));

interface BookCardPropsType {
  cover?: string
  title: string,
  author?: {
    text: string,
    link: string
  }
  theme?: {
    text: string,
    link: string
  },
  series?: {
    text: string,
    link: string
  }
  link: string
}

export default function BookCard({
                                   cover,
                                   title = '未知',
                                   author = { text: '未知作者', link: '#' },
                                   theme,
                                   series,
                                   link,
                                 }: BookCardPropsType) {
  const classes = useStyles();
  const onCardClick = () => {
    history.push(link);
  };
  return (
    <Card className={classes.card} square={true}>
      <CardActionArea onClick={onCardClick}>
        <ImageLoader url={cover} className={classes.media}/>
      </CardActionArea>
      <CardContent>

        <Typography gutterBottom={true} noWrap={true} variant="subtitle2" component="h2" className={classes.title}>
          <Box fontWeight="fontWeightLight" fontSize={14} color={'#333'}>
            {title}
          </Box>
        </Typography>

        <Typography variant="body2" noWrap={true} color="textPrimary" component="p">
          <Box fontWeight="fontWeightLight" fontSize={12} color={'#333'}>
            {author.text}
          </Box>
        </Typography>
        {theme &&
        <Typography
          noWrap={true}
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.meta}
        >
          {theme.text}
        </Typography>
        }
      </CardContent>

    </Card>
  );
}
