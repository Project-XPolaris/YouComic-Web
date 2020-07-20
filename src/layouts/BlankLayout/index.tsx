import React from 'react';
import { SnackbarProvider } from 'notistack';
import ThemeLayout from '@/layouts/ThemeLayout';
import { connect } from '@@/plugin-dva/exports';
import NotificationProvider from '@/layouts/components/NotificationProvider';

export interface BlankPagePropsTypes {
  dispatch: any
  children:any
}

const BlankPage = ({ dispatch,children }: BlankPagePropsTypes) => {
  return (
    <ThemeLayout>
      <SnackbarProvider maxSnack={3}>
        <NotificationProvider />
        {children}
      </SnackbarProvider>
    </ThemeLayout>
  );
};

export default connect(({}) => ({}))(BlankPage);
