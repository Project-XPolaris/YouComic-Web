import * as React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Toolbar, withWidth } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { connect, Dispatch } from 'dva';
import { ConnectType } from '@/global/connect';
import { LayoutModelStateType } from '@/models/layout';
import { UserStateType } from '@/models/user';
import ApplicationDrawerCollection from '@/layouts/ApplicationLayout/parts/ApplicationDrawer/collection';
import AppsIcon from '@material-ui/icons/Apps';
// @ts-ignore
import isMobile from 'ismobilejs';
import { history } from '@@/core/umiExports';
import { useIntl } from '@@/plugin-locale/localeExports';
import ApplicationConfig from '@/config';

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
    paddingTop: ApplicationConfig.useElectron ? theme.spacing(4) : theme.spacing(4),
  },
  drawerHeader: {},

}));

export interface ApplicationDrawerPropsType {
  isOpen?: boolean
  dispatch: Dispatch
  layout: LayoutModelStateType
  user: UserStateType,
  location?: any,
  width: any
}

interface DrawerNavigationItem {
  title: string
  link: string
  icon: any
  onClickItem?: () => void,
  needLogin: boolean
}

// interface CollectionListI {
//   title: string
//   onClick: () => void
// }

const ApplicationDrawer = ({
                             isOpen = false,
                             dispatch,
                             layout,
                             user,
                             location,
                             width,
                             ...props
                           }: ApplicationDrawerPropsType) => {
  const classes = useStyles();
  const { drawerMode } = layout;
  // @ts-ignore
  const intl = useIntl();
  const items: DrawerNavigationItem[] = [
    {
      title: intl.formatMessage({ id: 'nav.home' }),
      link: '/',
      icon: <HomeIcon/>,
      needLogin: false,
    },
    {
      title: '书籍列表',
      link: '/books',
      icon: <AppsIcon/>,
      needLogin: false,
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
    return undefined;
  };
  const renderNavigationItems = () => {
    const navs = items.map(item => {
      if (item.needLogin && !user.id) {
        return undefined;
      }
      const onNavigationItemClick = () => {
        if (isMobile(window.navigator.userAgent).any) {
          dispatch({
            type: 'layout/setDrawerOpen',
            payload: {
              isOpen: false,
            },
          });
        }
        history.push(item.link);
      };
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
        <>
        </>
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
        classes={{
          paper: classes.drawerPaper,
        }}
        variant="permanent"
      >

        <Toolbar/>
        <div className={classes.drawerHeader}>
          {renderDrawerHeader()}
        </div>
        {renderDrawerNav()}
      </Drawer>
    </div>
  );
};

export default connect(({ layout, user }: ConnectType) => ({ layout, user }))(withWidth()(ApplicationDrawer));
