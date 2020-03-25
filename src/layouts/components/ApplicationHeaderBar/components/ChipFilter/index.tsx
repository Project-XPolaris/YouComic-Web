import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  main: {},
  chip: {
    marginRight: theme.spacing(1),
  },
}));

interface ChipGroupFilterPropsType {
  items: ChipFilterItem[],
  onFilterChange:(selectedFilters:string[]) => void
  filter?:string[]
}

export interface ChipFilterItem {
  title: string
  filterKey: string

}

export default function ChipGroupFilter({ items ,onFilterChange,filter = []}: ChipGroupFilterPropsType) {
  const classes = useStyles();
  const chipItems = items.map((item: ChipFilterItem) => {
    const isSelected = filter.find(selectedFilters => selectedFilters === item.filterKey) !== undefined;
    const onChipClick = () => {
      if (isSelected) {
        const selected = filter.filter(selectedFilter => selectedFilter !== item.filterKey);
        onFilterChange(selected);
      } else {
        const selected = [...filter, item.filterKey];
        onFilterChange(selected);
      }
    };
    return (
      <Chip
        key={item.filterKey}
        label={item.title}
        color={'primary'}
        variant={isSelected ? 'default' : 'outlined'}
        className={classes.chip}
        onClick={onChipClick}
      />
    );
  });
  return (
    <div className={classes.main}>
      {chipItems}
    </div>
  );
}
