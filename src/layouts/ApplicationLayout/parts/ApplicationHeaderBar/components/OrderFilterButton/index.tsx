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
  order?:string
  isActive?:boolean
}


export default function OrderFilterButton({ text, onFilterChange, defaultActive = false, defaultAsc = true,order="asc",isActive=true }: OrderFilterButtonPropsType) {
  const classes = useStyles();
  const isAsc = order === "asc"
  const onChipClick = () => {
    onFilterChange(!isActive, isAsc);
  };
  const onChipDeleteClick = () => {
    onFilterChange(isActive, !isAsc);
  };
  return (
    <Chip
      label={text}
      clickable={true}
      color="primary"
      onClick={onChipClick}
      variant={isActive ? 'default' : 'outlined'}
      deleteIcon={order === 'asc' ? <ArrowUpwardIcon/> : <ArrowDownwardIcon/>}
      onDelete={onChipDeleteClick}
    />
  );
}
