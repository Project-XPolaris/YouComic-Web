import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect, Dispatch } from 'dva';
import CollectionsCollection from '@/pages/search/components/CollectionsCollection';
import { ConnectType } from '@/global/connect';
import { SearchCollectionsModelStateType } from '@/pages/search/collections/model';


import useStyles from './style';
import { LayoutModelStateType } from '@/models/layout';
import Pagination from '@/layouts/components/Pagination';

interface SearchCollectionsPagePropsType {
  dispatch: Dispatch,
  searchCollections: SearchCollectionsModelStateType,
  layout: LayoutModelStateType
}

function SearchCollectionsPage({ dispatch, searchCollections, layout }: SearchCollectionsPagePropsType) {
  const classes = useStyles();
  const onPaginationChange = (page = searchCollections.page, pageSize = searchCollections.pageSize) => {
    dispatch({
      type: 'searchCollections/setPage',
      payload: {
        page,
        pageSize,
      },
    });
    dispatch({
      type: 'searchCollections/searchCollections',
    });
  };
  const onNextPage = () => {
    onPaginationChange(searchCollections.page + 1);
  };
  const onPrevious = () => {
    onPaginationChange(searchCollections.page - 1);
  };
  const onSelectPage = (currentPage: number) => {
    onPaginationChange(currentPage);
  };
  return (
    <div className={layout.isDrawerOpen ? classes.mainExpand : classes.main}>
      <CollectionsCollection title={''} collections={searchCollections.collections}/>
      <div className={classes.paginationWrap}>
        <Pagination
          count={searchCollections.count}
          page={searchCollections.page}
          pageSize={searchCollections.pageSize}
          onNextPage={onNextPage}
          onPreviousPage={onPrevious}
          onSelectPage={onSelectPage}
        />
      </div>
    </div>
  );
}

export default connect(({ searchCollections, layout }: ConnectType) => ({
  searchCollections,
  layout,
}))(SearchCollectionsPage);
