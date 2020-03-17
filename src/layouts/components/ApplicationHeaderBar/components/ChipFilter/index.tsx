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
}

export interface ChipFilterItem {
  title: string
  filterKey: string
}

export default function ChipGroupFilter({ items ,onFilterChange}: ChipGroupFilterPropsType) {
  const classes = useStyles();
  const [selectedFilters, setSelectFilters] = useState<string[]>([]);
  const chipItems = items.map((item: ChipFilterItem) => {
    const isSelected = selectedFilters.find(selectedFilters => selectedFilters === item.filterKey) !== undefined;
    const onChipClick = () => {
      if (isSelected) {
        const selected = selectedFilters.filter(selectedFilter => selectedFilter !== item.filterKey);
        onFilterChange(selected);
        setSelectFilters(selected);
      } else {
        const selected = [...selectedFilters, item.filterKey];
        onFilterChange(selected);
        setSelectFilters(selected);
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
