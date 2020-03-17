import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CoverImage from '../../../../../assets/no-cover.png';
import router from 'umi/router';
import { CardActions, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  card: {
    [theme.breakpoints.down('sm')]: {
      minHeight: 400,
    },
    [theme.breakpoints.up('sm')]: {
      minHeight: 320,
    },
  },
  media: {

    [theme.breakpoints.down('sm')]: {},
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      maxHeight: 300,
    },
  },
  title: {},
  meta: {
    marginTop: 8,
  },
}));

interface CollectionBookCardPropsType {
  id: number
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
  link: string,
  onDelete: (id: number) => void
}

const LoadingSkeleton = () => {

};
export default function CollectionBookCard({
                                             cover,
                                             title = '未知',
                                             author = { text: '未知作者', link: '#' },
                                             theme,
                                             series,
                                             link,
                                             onDelete,
                                             id,
                                           }: CollectionBookCardPropsType) {
  const classes = useStyles();
  const onCardClick = () => {
    router.push(link);
  };
  const onCardDeleteActionClick = () => {
    onDelete(id);
  };
  return (
    <Card className={classes.card} square={true}>
      <CardActionArea onClick={onCardClick}>
        <img src={cover || CoverImage} className={classes.media}/>
      </CardActionArea>
      <CardContent>
        <Typography gutterBottom={true} noWrap={true} variant="subtitle2" component="h2" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="body2" noWrap={true} color="textPrimary" component="p">
          {author.text}
        </Typography>
        {theme && <Typography
          noWrap={true}
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.meta}
        >{theme.text}
        </Typography>}
        {series &&
        <Typography
          noWrap={true}
          variant="body2"
          color="textSecondary"
          component="p"

          className={classes.meta}
        >
          {series.text}
        </Typography>
        }
      </CardContent>
      <CardActions disableSpacing={true}>
        <IconButton aria-label="add to favorites" size={'small'} onClick={onCardDeleteActionClick}>
          <DeleteIcon/>
        </IconButton>
      </CardActions>
    </Card>
  );
}
