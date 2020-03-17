import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect, Dispatch } from 'dva';
import useStyles from './style'
import { ConnectType } from '@/global/connect';
import { SearchTagsModelStateType } from '@/pages/search/tags/model';
import { LayoutModelStateType } from '@/models/layout';
import TagCollection from '@/pages/search/components/TagCollection';
import TagsCollection from '@/pages/search/tags/components/TagCollection';
import Pagination from '@/layouts/components/Pagination';



interface SearchTagsPropsType {
  dispatch: Dispatch,
  searchTags:SearchTagsModelStateType
  layout:LayoutModelStateType
}

function SearchTagsPage({ dispatch ,layout,searchTags}: SearchTagsPropsType) {
  const classes = useStyles();
  const {tags} = searchTags;
  const onPaginationChange = (page = searchTags.page, pageSize = searchTags.pageSize) => {
    dispatch({
      type: 'searchTags/setPage',
      payload: {
        page,
        pageSize,
      },
    });
    dispatch({
      type: 'searchTags/searchTags',
    });
  };
  const onNextPage = () => {
    onPaginationChange(searchTags.page + 1);
  };
  const onPrevious = () => {
    onPaginationChange(searchTags.page - 1);
  };
  const onSelectPage = (currentPage: number) => {
    onPaginationChange(currentPage);
  };
  return (
    <div className={layout.isDrawerOpen?classes.mainExpand:classes.main}>
      <TagsCollection tags={tags} />
      <div className={classes.paginationWrap}>
        <Pagination
          count={searchTags.count}
          page={searchTags.page}
          pageSize={searchTags.pageSize}
          onNextPage={onNextPage}
          onPreviousPage={onPrevious}
          onSelectPage={onSelectPage}
        />
      </div>
    </div>
  );
}

export default connect(({layout,searchTags}:ConnectType) => ({searchTags,layout}))(SearchTagsPage);
