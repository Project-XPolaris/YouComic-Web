import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  content:{
    marginTop:12
  },
  title:{
    fontSize:22,
    fontWeight:300,
    color:"#333"
  },
  subtitle:{
    fontSize:14,
    fontWeight:100,
    color:"#555"
  },
});

interface TitleSectionPropsType {
  mainClasses:any
  title:string
  children:any
  subtitle?:string
}


export default function TitleSection({children,mainClasses,title,subtitle}: TitleSectionPropsType) {
  const classes = useStyles();
  return (
    <div className={mainClasses}>
      <div className={classes.title}>
        {title}
      </div>
      {
        subtitle &&
        <div className={classes.subtitle}>
          {subtitle}
        </div>
      }

      <div className={classes.content}>
        {children}
      </div>
    </div>
  );
}
