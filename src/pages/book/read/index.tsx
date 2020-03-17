import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect, Dispatch } from 'dva';
import { ConnectType } from '@/global/connect';
import { ReadPageModelStateType } from '@/pages/book/read/model';
import { Page } from '@/services/page';

const useStyles = makeStyles({
  main: {},
  pageImg:{
    width:"100%"
  }
});

interface ReadPagePropsType {
  dispatch: Dispatch,
  bookRead: ReadPageModelStateType
}

function ReadPage({ dispatch, bookRead }: ReadPagePropsType) {
  const classes = useStyles();
  const {pages} = bookRead;
  const renderPages = () => {
    if (pages){
      return pages.map((page:Page) => (
        <img src={page.path} className={classes.pageImg}/>
      ))
    }else{
      return undefined
    }
  }
  return (
    <div className={classes.main}>
      {renderPages()}
    </div>
  );
}

export default connect(({ bookRead }: ConnectType) => ({ bookRead }))(ReadPage);
