import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar } from '@material-ui/core';
import { Dispatch } from 'dva';
import ChipGroupFilter, { ChipFilterItem } from '@/layouts/components/ApplicationHeaderBar/components/ChipFilter';

const useStyles = makeStyles({
  main: {
    backgroundColor: '#FFF',
    overflowX: 'scroll',
    msOverflowStyle: 'none',
    overflow: '-moz-scrollbars-none',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

interface SearchTagsToolBarPropsType {
  dispatch: Dispatch
}


export default function SearchTagsToolBar({ dispatch }: SearchTagsToolBarPropsType) {
  const classes = useStyles();
  const tagTypeFilterItems: ChipFilterItem[] = [
    {
      title: '作者',
      filterKey: 'artist',
    },
    {
      title: '系列',
      filterKey: 'series',
    },
    {
      title: '主题',
      filterKey: 'theme',
    },
    {
      title: '汉化组',
      filterKey: 'translator',
    },
  ];
  const onTagTypeFilterChange = (selected: string[]) => {
    dispatch({
      type: 'searchTags/setFilter',
      payload: {
        filter: {
          type: selected,
        },
      },
    });
    dispatch({
      type: 'searchTags/searchTags',
    });
  };
  return (
    <Toolbar className={classes.main}>
      <ChipGroupFilter items={tagTypeFilterItems} onFilterChange={onTagTypeFilterChange}/>
    </Toolbar>
  );
}
