import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStyles from './style';
import { Toolbar } from '@material-ui/core';
import { Dispatch } from 'dva';

interface SearchBarPropsType {
  dispatch:Dispatch
}


export default function SearchBar({dispatch}: SearchBarPropsType) {
  const classes = useStyles();

  return (
    <Toolbar className={classes.main}>
    </Toolbar>
  );
}
