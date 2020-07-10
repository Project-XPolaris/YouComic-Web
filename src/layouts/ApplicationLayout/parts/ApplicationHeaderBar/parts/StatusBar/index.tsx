import { connect } from '@@/plugin-dva/exports';
import React from 'react';
import { useStyles } from './style';
import { Button, IconButton } from '@material-ui/core';
import { Close, Fullscreen, Minimize, ArrowBack,Refresh } from '@material-ui/icons';
import { electronApp, electronRemote } from '@/electron';
import { history } from '@@/core/history';

export interface StatusBarPropsTypes {
  dispatch: any
}

const StatusBar = ({ dispatch }: StatusBarPropsTypes) => {
  const classes = useStyles();
  const onClose = () => {
    console.log(electronApp);
    electronApp.exit();
  };
  const onMin = () => {
    electronRemote.BrowserWindow.getFocusedWindow().minimize();
  };
  const onMax = () => {
    const currentWindow = electronRemote.BrowserWindow.getFocusedWindow();
    if (currentWindow.isMaximized()) {
      currentWindow.unmaximize();
    } else {
      currentWindow.maximize();
    }

  };
  const onReload = () => {
    electronRemote.BrowserWindow.getFocusedWindow().reload()
  }
  const onBack = () => {
    history.goBack();
  };
  return (
    <div className={classes.statusBar}>
      <IconButton
        aria-label="back"
        className={classes.actionIcon}
        size={'small'}
        onClick={onBack}
      >
        <ArrowBack/>
      </IconButton>
      <div className={classes.dragZone}>

      </div>
      <div>
        <IconButton
          aria-label="min"
          className={classes.actionIcon}
          size={'small'}
          onClick={onReload}
        >
          <Refresh/>
        </IconButton>
        <IconButton
          aria-label="min"
          className={classes.actionIcon}
          size={'small'}
          onClick={onMin}
        >
          <Minimize/>
        </IconButton>
        <IconButton
          aria-label="max"
          className={classes.actionIcon}
          size={'small'}
          onClick={onMax}
        >
          <Fullscreen/>
        </IconButton>
        <IconButton
          aria-label="close"
          className={classes.actionIcon}
          size={'small'}
          onClick={onClose}
        >
          <Close/>
        </IconButton>
      </div>
    </div>
  );
};

export default connect(({}) => ({}))(StatusBar);
