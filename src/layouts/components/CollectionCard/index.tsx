import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import useStyles from './style';
import { Collection } from '@/services/collection';
import randomcolor from 'randomcolor';
import router from 'umi/router';
import { Avatar, Box, Card, CardActionArea, Divider } from '@material-ui/core';

interface CollectionCardPropsType {
  collection: Collection
}


export default function CollectionCard({ collection }: CollectionCardPropsType) {
  const classes = useStyles();
  const onCardClick = () => {
    router.push(`/collection/${collection.id}`);
  };
  return (
    <Card>
      <CardActionArea onClick={onCardClick} className={classes.main}>
        <Box fontSize="h6.fontSize">
          {collection.name}
        </Box>
      </CardActionArea>
    </Card>
  );
}
