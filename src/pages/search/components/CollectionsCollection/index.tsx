import React from 'react';

import useStyles from './style';
import { Box, Button, Grid } from '@material-ui/core';
import { Collection } from '@/services/collection';
import CollectionCard from '@/layouts/components/CollectionCard';

interface CollectionsCollectionPropsType {
  collections?:Collection[],
  title:string,
  onShowMoreCollection?:() => void
}


export default function CollectionsCollection({collections = [],title,onShowMoreCollection}: CollectionsCollectionPropsType) {
  const classes = useStyles();
  const items = collections!!.map((collection: Collection) => {
    return (
      <Grid key={collection.id} item={true}>
        <CollectionCard collection={collection} />
      </Grid>
    );
  });
  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <div className={classes.titleWrap}>
          <Box className={classes.title}>{title}</Box>
        </div>
        {onShowMoreCollection !== undefined && <Button variant={'contained'} disableElevation={true} color={'primary'} size={"small"} onClick={onShowMoreCollection}>查看更多</Button>}
      </div>
      <Grid container={true} spacing={4}>
        {items}
      </Grid>
    </div>
  );
}
