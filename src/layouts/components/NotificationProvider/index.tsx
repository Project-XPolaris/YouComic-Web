import { connect } from '@@/plugin-dva/exports';
import React, { useEffect } from 'react';
import { ConnectType } from '@/global/connect';
import { NoticeModelStateType } from '@/models/notice';
import { SnackbarKey, useSnackbar } from 'notistack';
import { Dispatch } from '@@/plugin-dva/connect';

let displayed: SnackbarKey[] = [];

const NotificationProvider = ({ notice,dispatch }: { notice: NoticeModelStateType,dispatch:Dispatch }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const storeDisplayed = (id: SnackbarKey) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id?: SnackbarKey) => {
    displayed = [...displayed.filter((key: SnackbarKey) => id !== key)];
  };

  useEffect(() => {
    notice.notices.forEach(({ dismiss, key, message, options }) => {
      if (dismiss) {
        // dismiss snackbar using notistack
        closeSnackbar(key);
        return;
      }
      if (displayed.includes(key!!)) return;

      // display snackbar using notistack
      enqueueSnackbar(message, {
        key,
        ...options,
        onClose: (event, reason, myKey) => {
          if (options.onClose) {
            options.onClose(event, reason, myKey);
          }
        },
        onExited: (event, myKey) => {
          // remove this snackbar from redux store
          dispatch({
            type:"notice/removeNotification",
            payload:{
              key:myKey
            }
          });
          removeDisplayed(myKey);
        },
      });

      // keep track of snackbars that we've displayed
      storeDisplayed(key!!);
    });
  });
  return (
    <>

    </>
  );
};

export default connect(({ notice }: ConnectType) => ({ notice }))(NotificationProvider);
