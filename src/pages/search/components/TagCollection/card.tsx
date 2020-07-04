import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Tag } from '@/services/tag';
import { Avatar, Box, Card, CardActionArea, CardActions, Divider } from '@material-ui/core';
import randomcolor from 'randomcolor'
import { history } from '@@/core/umiExports';
const useStyles = makeStyles((theme: Theme) => ({
  main: {},
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: theme.spacing(8),
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    color:"#FFFFFF"
  },
  textWrap: {
    paddingTop:theme.spacing(2),
    paddingBottom:theme.spacing(2),
    paddingLeft:theme.spacing(3),
    paddingRight:theme.spacing(3)
  },
  text: {},
}));

interface TagCardPropsType {
  tag: Tag
}


export default function TagCard({ tag }: TagCardPropsType) {
  const classes = useStyles();
  const avatarColor = randomcolor({
    seed:tag.name,
    luminosity:"dark"
  });
  const onTagClick = () => {
    history.push(`/tag/${tag.id}`)
  };
  return (
    <Card className={classes.main}>
      <CardActionArea onClick={onTagClick}>
      <div className={classes.header}>
        <Avatar className={classes.avatar} style={{backgroundColor:avatarColor}}>{tag.name[0]}</Avatar>
      </div>
      <Divider/>
      <div className={classes.textWrap}>
        <Box>
          {tag.name}
        </Box>
      </div>
      </CardActionArea>
    </Card>
  );
}
