import React from 'react';
import useStyles from './style';
import { Box, Card, CardActionArea } from '@material-ui/core';
import { Tag } from '@/services/tag';
import { history } from '@@/core/umiExports';

interface TagCardPropsType {
  tag: Tag
}


export default function TagCard({ tag }: TagCardPropsType) {
  const classes = useStyles();
  const onCardClick = () => {
    history.push(`/tag/${tag.id}`);
  };
  return (
    <Card>
      <CardActionArea onClick={onCardClick} className={classes.main}>
        <Box fontSize="h6.fontSize">
          {tag.name}
        </Box>
        <Box fontSize="subtitle.fontSize" className={classes.tagType}>
          {tag.type}
        </Box>
      </CardActionArea>
    </Card>
  );
}
