import { Divider, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  main:{
    minHeight:"120px",
    position:"relative"
  },
  content:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    height:"100%",
    width:"100%",
    position: "absolute"
  },
});
const ApplicationFooter = () => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <Divider/>
      <div className={classes.content}>
        <span>Project Polaris | YouComic</span>
      </div>
    </div>
  );
};
export default ApplicationFooter;

