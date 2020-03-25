import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';

const useStyles = makeStyles({
  main: {},
  chip:{
    marginRight:8,
    marginBottom:8
  }
});

export interface MobileChipCollectionItem {
  text: string
  onChipClick?: () => void
  color?:any
  icon?:any
}

interface MobileChipCollectionPropsType {
  chips?: MobileChipCollectionItem[]
}


export default function MobileChipCollection({ chips = [] }: MobileChipCollectionPropsType) {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      {
        chips?.map(chip => {
          return (
            <Chip
              className={classes.chip}
              label={chip.text}
              clickable={Boolean(chip.onChipClick)}
              onClick={chip.onChipClick}
              key={chip.text}
              color={chip.color}
              icon={chip.icon}
            />
          );
        })
      }
    </div>
  );
}
