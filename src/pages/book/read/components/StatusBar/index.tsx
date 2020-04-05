import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  main: {
    backgroundColor:"#00000088",
    width:"100%",
    paddingLeft:16,
    paddingRight:16,
    textAlign:"right",
    color:"#FFF"
  },
});

interface StatusBarPropsType {
  currentPage:number
  totalPage:number
}


export default function StatusBar({currentPage,totalPage}: StatusBarPropsType) {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      第{currentPage}页，共{totalPage}页
    </div>
  );
}
