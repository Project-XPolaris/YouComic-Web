import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ApplicationFooter from '@/layouts/ApplicationLayout/parts/ApplicationFooter';
import { connect, Dispatch } from 'dva';
import { ConnectType } from '@/global/connect';
import { LayoutModelStateType } from '@/models/layout';
import { withWidth } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { UserStateType } from '@/models/user';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import ThemeLayout from '@/layouts/ThemeLayout';
import ApplicationLayout from '@/layouts/ApplicationLayout';
import { electron } from '@/electron';


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
  const content = (
    <div>
      <div>
        {props.children}
      </div>
      <ApplicationFooter/>
    </div>
  );
  console.log(electron)
  return (
    <ThemeLayout>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <ApplicationLayout>
          {content}
        </ApplicationLayout>
      </MuiPickersUtilsProvider>
    </ThemeLayout>
  );
};


export default connect(({ layout, user }: ConnectType) => ({ layout, user }))(withWidth()(BasicLayout));
