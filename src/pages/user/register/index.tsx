import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect, Dispatch } from 'dva';


const useStyles = makeStyles({
  main: {},

});

interface RegisterPagePropsType {
  dispatch: Dispatch,
}

function RegisterPage({ dispatch }: RegisterPagePropsType) {
  const classes = useStyles();

  return (
    <div className={classes.main}>

    </div>
  );
}

export default connect(({}) => ({}))(RegisterPage);
