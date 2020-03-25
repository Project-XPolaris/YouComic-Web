import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStyles from './style';
import { connect, Dispatch } from 'dva';
import { ConnectType } from '@/global/connect';
import { LayoutModelStateType } from '@/models/layout';
import { SearchModelStateType } from '@/pages/search/model';
import BookRowCollection from '@/pages/home/components/BookRowCollection';
import TagCollection from '@/pages/search/components/TagCollection';
import { router } from 'umi';
import CollectionsCollection from '@/pages/search/components/CollectionsCollection';
import { withWidth,isWidthDown } from '@material-ui/core';
import SearchMobilePage from '@/pages/search/mobile';

interface SearchPagePropsType {
  dispatch: Dispatch
  layout: LayoutModelStateType
  search: SearchModelStateType
  width:any
}

function SearchPage({ dispatch, layout, search,width }: SearchPagePropsType) {
  const classes = useStyles();
  const { isDrawerOpen } = layout;
  const { summaryBooks, summaryCollections } = search;
  const { artist, theme, series } = search.summaryTags;
  const onShowMoreBook = () => {
    router.push(`/search/${search.searchKey}/books`);
  };
  const onShowMoreTags = () => {
    router.push(`/search/${search.searchKey}/tags`);
  };
  const onShowMoreCollections = () => {
    router.push(`/search/${search.searchKey}/collections`);
  };
  if (isWidthDown("md",width)){
    return <SearchMobilePage />
  }
  return (
    <div className={isDrawerOpen ? classes.mainExpand : classes.main}>
      {
        summaryBooks && summaryBooks.length > 0 &&
        <div className={classes.resultsWrap}>
          <BookRowCollection title={'相关书籍'} books={summaryBooks} onShowMore={onShowMoreBook}/>
        </div>
      }
      {
        artist && artist.length > 0 &&
        <div className={classes.resultsWrap}>
          <TagCollection title={'相关作者'} tags={artist} onShowMoreTag={onShowMoreTags}/>
        </div>
      }
      {
        theme && theme.length > 0 &&
        <div className={classes.resultsWrap}>
          <TagCollection title={'相关主题'} tags={theme} onShowMoreTag={onShowMoreTags}/>
        </div>
      }
      {
        series && series.length > 0 &&
        <div className={classes.resultsWrap}>
          <TagCollection title={'相关系列'} tags={series} onShowMoreTag={onShowMoreTags}/>
        </div>
      }
      {
        summaryCollections && summaryCollections.length > 0 &&
        <div className={classes.resultsWrap}>
          <CollectionsCollection title={'相关收藏夹'} collections={summaryCollections}
                                 onShowMoreCollection={onShowMoreCollections}/>
        </div>
      }
    </div>
  );
}

export default connect(({ layout, search }: ConnectType) => ({ layout, search }))(withWidth()(SearchPage));
