import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { Chip } from '@material-ui/core';

const useStyles = makeStyles({
  main: {},
});

interface OrderFilterButtonPropsType {
  text: string,
  onFilterChange: (isActive: boolean, isAsc: boolean) => void
  defaultAsc?: boolean
  defaultActive?: boolean
}


export default function OrderFilterButton({ text, onFilterChange, defaultActive = false, defaultAsc = true }: OrderFilterButtonPropsType) {
  const classes = useStyles();
  const [isAsc, setIsAsc] = useState(defaultAsc);
  const [isActive, setIsActive] = useState(defaultActive);
  const onChipClick = () => {
    onFilterChange(!isActive, isAsc);
    setIsActive(!isActive);
  };
  const onChipDeleteClick = () => {
    onFilterChange(isActive, !isAsc);
    setIsAsc(!isAsc);

  };
  return (
    <Chip
      label={text}
      clickable={true}
      color="primary"
      onClick={onChipClick}
      variant={isActive ? 'default' : 'outlined'}
      deleteIcon={isAsc ? <ArrowUpwardIcon/> : <ArrowDownwardIcon/>}
      onDelete={onChipDeleteClick}
    />
  );
}
