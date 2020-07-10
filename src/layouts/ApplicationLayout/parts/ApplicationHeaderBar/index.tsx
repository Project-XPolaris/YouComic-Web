import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Avatar, isWidthDown, withWidth } from '@material-ui/core';
import { UserStateType } from '@/models/user';
import UserCard from '@/layouts/components/UserCardPopover/UserCard';
import { connect, Dispatch } from 'dva';
import SearchInput from '@/layouts/components/SearchInput';
import SearchBooksToolBar from '@/layouts/ApplicationLayout/parts/ApplicationHeaderBar/components/SearchBooksToolBar';
import SearchTagsToolBar from '@/layouts/ApplicationLayout/parts/ApplicationHeaderBar/components/SearchTagsToolBar';
import LocalSelect from '@/layouts/ApplicationLayout/parts/ApplicationHeaderBar/components/LocalSelect';
import { ConnectType } from '@/global/connect';
import { history, LayoutModelStateType } from '@@/core/umiExports';
import ApplicationConfig from '@/config';
import StatusBar from '@/layouts/ApplicationLayout/parts/ApplicationHeaderBar/parts/StatusBar';
import MenuIcon from '@material-ui/icons/Menu';
import BookListTool from '@/layouts/ApplicationLayout/parts/ApplicationHeaderBar/components/BookListTool';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: 'flex',
    },
    title: {
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
      flexGrow: 1,
      color: '#FFFFFF',
    },
    avatar: {
      color: '#FFF',
      backgroundColor: theme.palette.primary.dark,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  }),
);

interface ApplicationHeaderBar {
  dispatch: Dispatch,
  user: UserStateType,
  layout:LayoutModelStateType
  width:any
}

const ApplicationHeaderBar = (
  { user, dispatch,layout,width }: ApplicationHeaderBar,
) => {
  const classes = useStyles();
  const { nickname } = user;
  const [userMenuAnchor, setUserMenuAnchor] = useState<HTMLElement | null>(null);
  const onUserCardClose = () => {
    setUserMenuAnchor(null);
  };
  const onUserAvatarClick = (e: any) => {
    setUserMenuAnchor(e.currentTarget);
  };
  const onUserLogout = () => {
    setUserMenuAnchor(null);
    dispatch({
      type: 'user/logout',
    });
  };

  const onLoginClick = () => {
    history.push('/user/login');
  };

  const switchDrawer = () => {
    dispatch({
      type: 'layout/setDrawerOpen',
      payload: {
        open: !layout.isDrawerOpen,
      },
    });
  };

  const renderAppBar = () => {
    return (
      <AppBar elevation={1}>
        {
          ApplicationConfig.useElectron &&
          <StatusBar/>

        }
        <Toolbar>
          {isWidthDown("md",width) &&  <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={switchDrawer}
          >
            <MenuIcon/>
          </IconButton>}

          <Typography variant="h6" className={classes.title}>
            You Comic {ApplicationConfig.useElectron && 'Desktop'}
          </Typography>
          <SearchInput/>
          <LocalSelect/>
          <UserCard
            onClose={onUserCardClose}
            anchor={userMenuAnchor}
            onLogout={onUserLogout}
            nickname={user.nickname}
          />
          {nickname ? <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            onClick={onUserAvatarClick}

          >
            <Avatar className={classes.avatar}>{nickname[0].toUpperCase()}</Avatar>

          </IconButton> : <Button color="inherit" onClick={onLoginClick}>Login</Button>
          }
        </Toolbar>
        {history.location.pathname === '/books' && isWidthDown("md",width) && <BookListTool/>}
        {history.location.pathname.match(/\/search\/.*?\/books$/) && <SearchBooksToolBar/>}
        {history.location.pathname.match(/\/search\/.*?\/tags$/) && <SearchTagsToolBar/>}
      </AppBar>
    );
  };
  return (
    <div className={classes.root}>
      {renderAppBar()}
    </div>
  );
};

export default connect(({ layout, user, bookList }: ConnectType) => ({
  layout,
  user,
  bookList,
}))(withWidth()(ApplicationHeaderBar));
