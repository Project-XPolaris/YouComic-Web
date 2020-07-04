import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect, Dispatch } from 'dva';
import { Box, Button, isWidthDown, Paper, TextField, withWidth } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { ConnectType } from '@/global/connect';
import { LoginModelStateType } from '@/pages/user/login/model';
import LoginMobilePage from '@/pages/user/login/mobile';
import ThemeLayout from '@/layouts/ThemeLayout';


const useStyles = makeStyles({
  main: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
  },
  gapArea: {
    maxHeight: 175,
    width: '100%',
    flexGrow: 1,
  },
  loginContainer: {
    width: 448,
    height: 500,
    margin: '0 auto',
    border: '1px solid #dadce0',
    maxWidth: '100%',
    borderRadius: 8,
    textAlign: 'center',

  },
  loginContent: {
    marginTop: 64,
    marginBottom: 64,
    marginLeft: 48,
    marginRight: 48,
  },
  title: {
    marginTop: 36,
  },
  usernameInput: {
    width: '100%',
    marginTop: 48,
  },
  passwordInput: {
    width: '100%',
    marginTop: 24,
  },
  actionContainer: {
    marginTop: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

interface LoginPagePropsType {
  dispatch: Dispatch,
  login:LoginModelStateType,
  width:any
}

function LoginPage({ dispatch,width }: LoginPagePropsType) {
  const classes = useStyles();
  const { control, handleSubmit } = useForm();
  const onSubmit : any = ({username,password}:{username:string,password:string}) => dispatch({type:"login/login",payload:{username,password}});
  if (isWidthDown("md",width)){
    return (
      <LoginMobilePage />
    )
  }
  return (
    <ThemeLayout>
    <div className={classes.main}>
      <div className={classes.gapArea}/>
      <div>
      <Paper className={classes.loginContainer} elevation={0}>
        <div className={classes.loginContent}>
          <Box fontWeight="fontWeightBold" fontSize={'h5.fontSize'}>You Comic</Box>
          <Box fontWeight="fontWeightRegular" fontSize={'h5.fontSize'} className={classes.title}>登录</Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              as={
                <TextField
                  variant="outlined"
                  className={classes.usernameInput}
                  label={'用户名'}
                />
              }
              name={'username'}
              control={control}
            />
            <Controller
              as={
                <TextField
                  variant="outlined"
                  className={classes.passwordInput}
                  type={"password"}
                  label={'密码'}
                />}
              name={'password'}
              control={control}
            />
            <div className={classes.actionContainer}>
              <Button href="#text-buttons">创建账户</Button>
              <Button color={'primary'} variant={'contained'} disableElevation={true} type="submit">登录</Button>
            </div>
          </form>
        </div>
      </Paper>
      </div>
    </div>
    </ThemeLayout>
  );
}

export default connect(({login}:ConnectType) => ({login}))(withWidth()(LoginPage));
