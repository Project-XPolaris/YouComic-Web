import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  main: {},
  header: {
    paddingBottom: 15,
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
  },
});

interface MobileRowPropsType {
  children: any
  title: string
  onMore?: () => void
}


export default function MobileRow({ children, title, onMore }: MobileRowPropsType) {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <div className={classes.title}>
          {title}
        </div>
        <div>
          {
            onMore &&
            <Button
              disableElevation={true}
              onClick={onMore}
              color={'primary'}
              variant="contained"
              size={'small'}
            >
              查看更多
            </Button>
          }
        </div>
      </div>
      {children}
    </div>
  );
}
