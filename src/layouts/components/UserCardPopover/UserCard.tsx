import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Button, Divider, Popover, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';


interface UserCardPropsType {
  anchor?: any
  nickname?:string
  onClose: () => void
  onLogout: () => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      minWidth: theme.spacing(40),
    },
    userInfoContainer: {
      padding: theme.spacing(3),
      minHeight: theme.spacing(20),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatar: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      fontSize: theme.spacing(5),
      color: theme.palette.getContrastText(theme.palette.primary.main),
      backgroundColor: theme.palette.primary.main,
    },
    userInfoContent: {
      textAlign: 'center',
    },
    userNickname: {
      marginTop: theme.spacing(2),
      fontSize: theme.spacing(2)
    },
    actionSection:{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(2)
    }
  }),
);

export default function UserCard({ anchor, onClose, onLogout,nickname = "未知" }: UserCardPropsType) {
  const classes = useStyles();
  return (
    <Popover
      open={Boolean(anchor)}
      anchorEl={anchor}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      elevation={3}
    >
      <div className={classes.main}>

        <div className={classes.userInfoContainer}>
          <div className={classes.userInfoContent}>
            <Avatar className={classes.avatar}>{nickname[0]}</Avatar>
            <Box fontWeight="fontWeightBold" className={classes.userNickname}>
              {nickname}
            </Box>
          </div>
        </div>
        <Divider/>
        <div className={classes.actionSection}>
        <Button onClick={onLogout} variant={'outlined'}>登出当前账户</Button>
        </div>
      </div>
    </Popover>
  );
}
