import React from 'react';
import { connect, Dispatch } from 'dva';
import BookRowCollection from '@/pages/home/components/BookRowCollection';
import useStyles from '@/pages/home/style';
import { ConnectType } from '@/global/connect';
import { HomeModelStateType } from '@/pages/home/model';
import { LayoutModelStateType } from '@/models/layout';
import { withWidth,isWidthDown } from '@material-ui/core';
import HomeMobilePage from '@/pages/home/mobile';


interface MainPagePropsType {
  dispatch: Dispatch,
  home: HomeModelStateType,
  layout:LayoutModelStateType,
  width:any
}

function MainPage({ dispatch, home,layout:{isDrawerOpen},width }: MainPagePropsType) {
  const classes = useStyles();
  const {books} = home;
  if (isWidthDown("md",width)){
    return (
      <HomeMobilePage />
    )
  }else{
    return (
      <div className={classes.main}>

        {books.recentAdd &&
        <div className={classes.row}>
          <BookRowCollection title={'最近添加'} books={books.recentAdd}/>
        </div>
        }
      </div>
    );
  }

}

export default connect(({ home,layout }: ConnectType) => ({ home,layout }))(withWidth()(MainPage));
