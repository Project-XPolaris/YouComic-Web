import * as React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, useTheme } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import router from 'umi/router';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { connect, Dispatch } from 'dva';
import { ConnectType } from '@/global/connect';
import { LayoutModelStateType } from '@/models/layout';
import { UserStateType } from '@/models/user';
import ApplicationDrawerCollection from '@/layouts/components/ApplicationDrawer/collection';
import AppsIcon from '@material-ui/icons/Apps';
import { formatMessage } from 'umi/locale';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {},
}));

export interface ApplicationDrawerPropsType {
  isOpen?: boolean
  dispatch: Dispatch
  layout: LayoutModelStateType
  user: UserStateType,
  location: any
}

interface DrawerNavigationItem {
  title: string
  link: string
  icon: any
  onClickItem?: () => void,
  needLogin:boolean
}

interface CollectionListI {
  title: string
  onClick: () => void
}

const ApplicationDrawer = ({
                             isOpen = false,
                             dispatch,
                             layout,
                             user,
                             location,
                             ...props
                           }: ApplicationDrawerPropsType) => {
  const classes = useStyles();
  const theme = useTheme();
  const { drawerMode } = layout;
  // @ts-ignore
  const items: DrawerNavigationItem[] = [
    {
      title:  formatMessage({id:"nav.home"}),
      link: '/',
      icon: <HomeIcon/>,
      needLogin:false
    },
    {
      title: '书籍列表',
      link: '/books',
      icon: <AppsIcon/>,
      needLogin:false
    },
    {
      title: '收藏夹',
      link: '/my/collections',
      icon: <FavoriteIcon/>,
      needLogin: true,
      onClickItem: () => {
        dispatch({
          type: 'layout/changeDrawerMode',
          payload: {
            mode: 'collection',
          },
        });
      },
    },
  ];

  const renderDrawerNav = () => {
    if (drawerMode === 'normal') {
      return renderNavigationItems();
    } else if (drawerMode === 'collection') {
      return (
        <ApplicationDrawerCollection
          dispatch={dispatch}
          user={user}
          layout={layout}
          location={location}
        />
      );
    }
  };
  const renderNavigationItems = () => {
    const navs = items.map(item => {
      if (item.needLogin && !user.id) {
        return undefined
      }
      const onNavigationItemClick = () => router.push(item.link);
      return (
        <ListItem button={true} onClick={item.onClickItem ? item.onClickItem : onNavigationItemClick} key={item.title}>
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.title}/>
        </ListItem>
      );
    });
    return (
      <List>
        {navs}
      </List>
    );
  };
  const renderDrawerHeader = () => {
    const onBackButtonClick = () => {
      dispatch({
        type: 'layout/changeDrawerMode',
        payload: {
          mode: 'normal',
        },
      });
    };
    if (drawerMode === 'normal') {
      return (
        <List>
          <ListItem/>
        </List>
      );
    } else {
      return (
        <List>
          <ListItem button={true} onClick={onBackButtonClick}>
            <ListItemIcon>
              <ArrowBackIcon/>
            </ListItemIcon>
            <ListItemText primary={'返回'}/>
          </ListItem>
        </List>
      );
    }
  };

  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={isOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          {renderDrawerHeader()}
        </div>
        {renderDrawerNav()}
      </Drawer>
    </div>
  );
};

export default connect(({ layout, user }: ConnectType) => ({ layout, user }))(ApplicationDrawer);
