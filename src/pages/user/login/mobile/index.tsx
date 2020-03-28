import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect, Dispatch } from 'dva';
import { ConnectType } from '@/global/connect';
import { Button, Container, TextField } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import ThemeLayout from '@/layouts/ThemeLayout';


const useStyles = makeStyles({
  main: {},
  title: {
    width: '100%',
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 300,
  },
  form: {
    marginTop: 64,
  },
  input: {
    marginTop: 12,
    width: '100%',
  },
  content: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 175,
  },
  actionContainer: {
    marginTop: 24,
  },
  button: {
    width: '100%',
    marginTop: 12,
  },
});

interface LoginMobilePagePropsType {
  dispatch: Dispatch,
}

function LoginMobilePage({ dispatch }: LoginMobilePagePropsType) {
  const classes = useStyles();
  const { control, handleSubmit } = useForm();
  const onSubmit = ({username,password}:{username:string,password:string}) => dispatch({type:"login/login",payload:{username,password}});
  return (
    <ThemeLayout>
      <div className={classes.main}>
        <Container maxWidth="sm" className={classes.container}>
          <div className={classes.content}>
            <div className={classes.title}>登录</div>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
              <Controller
                as={
                  <TextField
                    className={classes.input}
                    label={'用户名'}
                    color={'primary'}

                  />
                }
                name={'username'}
                control={control}
              />
              <Controller
                as={
                  <TextField
                    className={classes.input}
                    type={'password'}
                    label={'密码'}
                    color={'primary'}
                  />}
                name={'password'}
                control={control}
              />
              <div className={classes.actionContainer}>
                <Button
                  color={'primary'}
                  variant={'contained'}
                  disableElevation={true}
                  type="submit"
                  className={classes.button}
                >登录
                </Button>
                <Button
                  color={'primary'}
                  variant={'contained'}
                  disableElevation={true}
                  className={classes.button}
                  href={"/user/register"}
                >
                  注册
                </Button>
              </div>

            </form>
          </div>
        </Container>
      </div>
    </ThemeLayout>
  );
}

export default connect(({ login }: ConnectType) => ({ login }))(LoginMobilePage);
