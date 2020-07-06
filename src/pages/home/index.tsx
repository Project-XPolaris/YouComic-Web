import BookRowCollection from '@/pages/home/components/BookRowCollection';
import useStyles from '@/pages/home/style';
import { ConnectType } from '@/global/connect';
import { HomeModelStateType } from '@/pages/home/model';
import { LayoutModelStateType } from '@/models/layout';
import HomeMobilePage from '@/pages/home/mobile';
import { ScrollToTopOnMount } from '@/util/scroll';
import { Dispatch, Loading } from '@@/plugin-dva/connect';
import { isWidthDown, withWidth } from '@material-ui/core';
import { connect } from '@@/plugin-dva/exports';
import React from 'react';


interface MainPagePropsType {
  dispatch: Dispatch,
  home: HomeModelStateType,
  layout:LayoutModelStateType,
  width:any,
  loading:Loading
}

function MainPage({ dispatch, home,layout:{isDrawerOpen},width,loading }: MainPagePropsType) {
  const classes = useStyles();
  const {books} = home;
  if (isWidthDown("md",width)){
    return (
      <HomeMobilePage />
    )
  }else{
    return (
      <div className={classes.main}>
        <ScrollToTopOnMount/>
        {books.recentAdd &&
        <div className={classes.row}>
          <BookRowCollection title={'最近添加'} books={books.recentAdd} loading={Boolean(loading.effects["home/queryRecentAddBooks"])}/>
        </div>
        }
      </div>
    );
  }

}

export default connect(({ home,layout,loading }: ConnectType) => ({ home,layout,loading }))(withWidth()(MainPage));
