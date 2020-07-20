import React from 'react';
import { connect, Dispatch } from 'dva';
import { Box, Button, isWidthDown, Paper, TextField, withWidth } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { ConnectType } from '@/global/connect';
import { LoginModelStateType } from '@/pages/user/login/model';
import LoginMobilePage from '@/pages/user/login/mobile';
import ThemeLayout from '@/layouts/ThemeLayout';
import StatusBar from '@/layouts/ApplicationLayout/parts/ApplicationHeaderBar/parts/StatusBar';
import ApplicationConfig from '@/config';
import createStyle from './style';
import { getFormErrorString } from '@/util/message';


interface LoginPagePropsType {
  dispatch: Dispatch,
  login: LoginModelStateType,
  width: any
}


function LoginPage({ dispatch, width }: LoginPagePropsType) {
  const classes = createStyle();
  const { control, handleSubmit, errors } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const onSubmit: any = ({ username, password }: { username: string, password: string }) => dispatch({
    type: 'login/login',
    payload: { username, password },
  });
  if (isWidthDown('md', width)) {
    return (
      <LoginMobilePage/>
    );
  }
  return (
    <ThemeLayout>
      {
        ApplicationConfig.useElectron &&
        <div className={classes.statusBarWrap}>
          <StatusBar/>
        </div>
      }


      <div className={classes.main}>
        <div className={classes.gapArea}/>
        <div>
          <Paper className={classes.loginContainer} elevation={0}>
            <div className={classes.loginContent}>
              <Box fontWeight="fontWeightBold" fontSize={'h5.fontSize'}>You Comic</Box>
              <Box fontWeight="fontWeightRegular" fontSize={'h5.fontSize'} className={classes.title}>登录</Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  as={<TextField/>}
                  variant="outlined"
                  className={classes.usernameInput}
                  label={'用户名'}
                  name={'username'}
                  rules={{ required: true, minLength: 4, maxLength: 16 }}
                  control={control}
                  helperText={getFormErrorString(errors?.username?.type, {
                    fieldName: '用户名',
                    minLength: 4,
                    maxLength: 16,
                  })}
                  error={Boolean(errors?.username?.type)}
                />
                <Controller
                  as={
                    <TextField
                      variant="outlined"
                      className={classes.passwordInput}
                      type={'password'}
                      label={'密码'}
                    />}
                  rules={{ required: true, minLength: 4, maxLength: 16 }}
                  name={'password'}
                  control={control}
                  helperText={getFormErrorString(errors?.password?.type, {
                    fieldName: '密码',
                    minLength: 4,
                    maxLength: 16,
                  })}
                  error={Boolean(errors?.password?.type)}
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

export default connect(({ login }: ConnectType) => ({ login }))(withWidth()(LoginPage));
