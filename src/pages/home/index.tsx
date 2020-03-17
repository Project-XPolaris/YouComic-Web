import React from 'react';
import { connect, Dispatch } from 'dva';
import BookRowCollection from '@/pages/home/components/BookRowCollection';
import useStyles from '@/pages/home/style';
import { ConnectType } from '@/global/connect';
import { HomeModelStateType } from '@/pages/home/model';


interface MainPagePropsType {
  dispatch: Dispatch,
  home: HomeModelStateType,
}

function MainPage({ dispatch, home }: MainPagePropsType) {
  const classes = useStyles();
  const {books} = home;
  return (
    <div className={classes.main}>
      {books.recentAdd && <BookRowCollection title={'最近添加'} books={books.recentAdd}/>}
    </div>
  );
}

export default connect(({ home }: ConnectType) => ({ home }))(MainPage);
