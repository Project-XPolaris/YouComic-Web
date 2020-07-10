import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar } from '@material-ui/core';
import { connect, Dispatch } from 'dva';
import ChipGroupFilter, { ChipFilterItem } from '@/layouts/ApplicationLayout/parts/ApplicationHeaderBar/components/ChipFilter';
import { updateQueryParamAndReplaceURL } from '@/util/url';
import { ConnectType } from '@/global/connect';
import { SearchTagsModelStateType } from '@/pages/search/tags/model';

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
  searchTags:SearchTagsModelStateType
}


function SearchTagsToolBar({ dispatch,searchTags }: SearchTagsToolBarPropsType) {
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
    updateQueryParamAndReplaceURL({
      type:selected,
    })
  };
  return (
    <Toolbar className={classes.main}>
      <ChipGroupFilter
        items={tagTypeFilterItems}
        onFilterChange={onTagTypeFilterChange}
        filter={searchTags?.filter?.type}
      />
    </Toolbar>
  );
}
export default connect(({searchTags}:ConnectType) => ({searchTags}))(SearchTagsToolBar);
