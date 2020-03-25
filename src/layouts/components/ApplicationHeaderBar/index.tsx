import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Avatar, CssBaseline, withWidth,isWidthDown } from '@material-ui/core';
import ApplicationDrawer from '@/layouts/components/ApplicationDrawer';
import { UserStateType } from '@/models/user';
import { blue } from '@material-ui/core/colors';
import UserCard from '@/layouts/components/UserCardPopover/UserCard';
import { connect, Dispatch } from 'dva';
import router from 'umi/router';
import BooksTool from '@/layouts/components/ApplicationHeaderBar/components/BooksTool';
import SearchInput from '@/layouts/components/SearchInput';
import SearchBar from '@/layouts/components/ApplicationHeaderBar/components/SearchBar';
import { Moment } from 'moment';
import SearchBooksToolBar from '@/layouts/components/ApplicationHeaderBar/components/SearchBooksToolBar';
import SearchTagsToolBar from '@/layouts/components/ApplicationHeaderBar/components/SearchTagsToolBar';
import LocalSelect from '@/layouts/components/ApplicationHeaderBar/components/LocalSelect';
import { ConnectType } from '@/global/connect';
import { LayoutModelStateType } from '@/models/layout';
import { BookListModelStateType } from '@/pages/book/list/model';
import { encodeOrderToUrl, updateQueryParamAndReplaceURL } from '@/util/url';
import BookListTool from '@/layouts/components/ApplicationHeaderBar/components/BookListTool';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: 'flex',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
      flexGrow: 1,
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    content: {
      flexGrow: 1,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
      minHeight: '100vh',
    },
    contentShift: {
      width:"100%",
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    avatar: {
      color: theme.palette.getContrastText(theme.palette.secondary.main),
      backgroundColor: theme.palette.secondary.main,
    },
  }),
);

interface ApplicationHeaderBar {
  dispatch: Dispatch,
  user: UserStateType,
  child: any,
  location: any,
  layout:LayoutModelStateType,
  width:any
  bookList:BookListModelStateType
}

const ApplicationHeaderBar = (
  {
    child, location, user, dispatch,layout,width,bookList
  }: ApplicationHeaderBar,
) => {
  const classes = useStyles();
  const {isDrawerOpen} = layout
  const onMenuButtonClick = () => switchDrawer();
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
  const switchDrawer = () => {
    dispatch({
      type: 'layout/setDrawerOpen',
      payload: {
        open: !layout.isDrawerOpen,
      },
    });
  };
  const onLoginClick = () => {
    router.push('/user/login');
  };
  const getAppBarClasses = () => {
    if (isWidthDown("md",width)){
      return classes.appBar
    }else{
      return clsx(classes.appBar, { [classes.appBarShift]: isDrawerOpen })
    }
  }
  const getContentClasses = () => {
    if (isWidthDown("md",width)){
      return classes.contentShift
    }else{
      return clsx(classes.content, { [classes.contentShift]: isDrawerOpen })
    }
  }
  return (

    <div className={classes.root}>
      <CssBaseline/>
      <AppBar className={getAppBarClasses()} elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={onMenuButtonClick}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            You Comic
          </Typography>
          <SearchInput/>
          <UserCard onClose={onUserCardClose} anchor={userMenuAnchor} onLogout={onUserLogout} nickname={user.nickname}/>
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
          <LocalSelect/>
        </Toolbar>
        {location.pathname === "/books" && <BookListTool />}
        {location.pathname.match(/\/search\/.*?\/books$/) && <SearchBooksToolBar/>}
        {location.pathname.match(/\/search\/.*?\/tags$/) && <SearchTagsToolBar />}
      </AppBar>
      <ApplicationDrawer isOpen={isDrawerOpen} location={location}/>
      <main className={getContentClasses()}>
        {child}
      </main>
    </div>
  );
};

export default connect(({ layout, user,bookList }: ConnectType) => ({ layout, user,bookList }))(withWidth()(ApplicationHeaderBar));
