import React from 'react';
import { connect, Dispatch } from 'dva';
import useStyles from './style';
import { ConnectType } from '@/global/connect';
import { SearchTagsModelStateType } from '@/pages/search/tags/model';
import { LayoutModelStateType } from '@/models/layout';
import TagsCollection from '@/pages/search/tags/components/TagCollection';
import MaterialPagination from '@material-ui/lab/Pagination';
import { updateQueryParamAndReplaceURL } from '@/util/url';


interface SearchTagsPropsType {
  dispatch: Dispatch,
  searchTags:SearchTagsModelStateType
  layout:LayoutModelStateType
}

function SearchTagsPage({ dispatch ,layout,searchTags}: SearchTagsPropsType) {
  const classes = useStyles();
  const {tags} = searchTags;
  const onPaginationChange = (e:any,page = searchTags.page) => {
    updateQueryParamAndReplaceURL({
      page
    })
  };
  return (
    <div className={layout.isDrawerOpen?classes.mainExpand:classes.main}>
      <TagsCollection tags={tags} />
      <div className={classes.paginationWrap}>
        <MaterialPagination
          count={Math.ceil(searchTags.count / searchTags.pageSize)}
          color="primary"
          page={searchTags.page}
          onChange={onPaginationChange}
        />
      </div>
    </div>
  );
}

export default connect(({layout,searchTags}:ConnectType) => ({searchTags,layout}))(SearchTagsPage);
