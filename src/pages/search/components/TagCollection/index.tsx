import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStyles from './style';
import { Box, Button, Grid } from '@material-ui/core';
import { Tag } from '@/services/tag';
import TagCard from '@/pages/search/components/TagCollection/card';
import router from 'umi/router';

interface TagCollectionPropsType {
  title: string
  tags?: Tag[],
  onShowMoreTag?:() => void
}


export default function TagCollection({ title, tags = [] ,onShowMoreTag}: TagCollectionPropsType) {
  const classes = useStyles();
  const items = tags!!.map((tag: Tag) => {
    return (
      <Grid key={tag.id} item={true}>
        <TagCard tag={tag}/>
      </Grid>
    );
  });
  return (
    <div className={classes.main}>
      <div className={classes.header}>
      <div className={classes.titleWrap}>
        <Box className={classes.title}>{title}</Box>
      </div>
        {onShowMoreTag !== undefined && <Button variant={'contained'} disableElevation={true} color={'primary'} onClick={onShowMoreTag}>查看更多</Button>}
      </div>
      <Grid container={true} spacing={4}>
        {items}
      </Grid>
    </div>
  );
}
