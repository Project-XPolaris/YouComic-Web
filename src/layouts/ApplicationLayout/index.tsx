import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ApplicationDrawer from '@/layouts/ApplicationLayout/parts/ApplicationDrawer';
import ApplicationHeaderBar from '@/layouts/ApplicationLayout/parts/ApplicationHeaderBar';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'scroll',
      overflowX: 'hidden',
      '&::-webkit-scrollbar': {
        width: 12,
        backgroundColor: '#dbdbdb',
        height: 12,
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#2196f3',
        '&:hover': {
          width: 12,
        },
      },
    },

  }),
);

export default function ApplicationLayout({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <div style={{ zIndex: 10 }}>
        <ApplicationHeaderBar/>
      </div>
      <div style={{ zIndex: 1 }}>
        <ApplicationDrawer/>
      </div>
      <main className={classes.content}>
        {children}
      </main>
    </div>
  );
}
