import React from 'react';

import useStyles from './style';
import { Collection } from '@/services/collection';
import { Box, Card, CardActionArea } from '@material-ui/core';
import { history } from '@@/core/umiExports';

interface CollectionCardPropsType {
  collection: Collection
}


export default function CollectionCard({ collection }: CollectionCardPropsType) {
  const classes = useStyles();
  const onCardClick = () => {
    history.push(`/collection/${collection.id}`);
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
