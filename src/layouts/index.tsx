import React from 'react';
import ApplicationHeaderBar from '@/layouts/components/ApplicationHeaderBar';
import { createMuiTheme, createStyles, makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import { blue, orange } from '@material-ui/core/colors';
import ApplicationFooter from '@/layouts/components/ApplicationFooter';
import { connect, Dispatch } from 'dva';
import { ConnectType } from '@/global/connect';
import { LayoutModelStateType } from '@/models/layout';
import { withWidth } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { UserStateType } from '@/models/user';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import ThemeLayout from '@/layouts/ThemeLayout';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      backgroundColor: '#F7F9FA',
    },
  }),
);

interface LayoutPropsType {
  layout: LayoutModelStateType
  location: any
  children: any
  dispatch: Dispatch
  width: Breakpoint
  user: UserStateType
}

const BasicLayout = ({
                       layout,
                       location,
                       dispatch,
                       width,
                       user,
                       ...props
                     }: LayoutPropsType) => {
  console.log(props);
  const classes = useStyles();
  const content = (
    <div>
      <div className={classes.main}>
        {props.children}
      </div>
      <ApplicationFooter/>
    </div>
  );
  const switchDrawer = () => {
    dispatch({
      type: 'layout/setDrawerOpen',
      payload: {
        open: !layout.isDrawerOpen,
      },
    });
  };
  const { isDrawerOpen } = layout;
  return (
    <ThemeLayout>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <ApplicationHeaderBar
          child={content}
          location={location}
        />
      </MuiPickersUtilsProvider>
    </ThemeLayout>
  );
};


export default connect(({ layout, user }: ConnectType) => ({ layout, user }))(withWidth()(BasicLayout));
