import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect, Dispatch } from 'dva';
import BookHorizonCollection from '@/pages/home/mobile/BookHorizonCollection';
import { HomeModelStateType } from '@/pages/home/model';
import { ConnectType } from '@/global/connect';
import { ScrollToTopOnMount } from '@/util/scroll';
import { history } from '@@/core/umiExports';


const useStyles = makeStyles({
  main: {
    backgroundColor: '#EEEEEE',
    paddingTop: 120,
    minHeight:"100vh",
    paddingBottom: 48,
  },
  row:{
    paddingLeft:8,
    paddingRight:8
  }
});

interface HomeMobilePagePropsType {
  dispatch: Dispatch,
  home:HomeModelStateType
}

function HomeMobilePage({ dispatch,home }: HomeMobilePagePropsType) {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <ScrollToTopOnMount/>
      <div className={classes.row}>
        <BookHorizonCollection books={home.books.recentAdd} title={"最近添加"} onMore={() => history.push("/books")}/>
      </div>

    </div>
  );
}

export default connect(({home}:ConnectType) => ({home}))(HomeMobilePage);
