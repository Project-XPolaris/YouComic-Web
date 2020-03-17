import React from 'react';
import useStyles from './style';
import { Tag } from '@/services/tag';
import TagCard from '@/pages/search/tags/components/TagCard';
import { Grid } from '@material-ui/core';


interface TagsCollectionPropsType {
  tags?: Tag[]
}


export default function TagsCollection({ tags = [] }: TagsCollectionPropsType) {
  const classes = useStyles();
  const items = tags?.map((tag: Tag) => {
    return (
      <Grid item={true} key={tag.id}>
        <TagCard tag={tag}/>
      </Grid>
    );
  });
  return (
    <div className={classes.main}>
      <Grid container={true} spacing={4}>
        {items}
      </Grid>
    </div>
  );
}
