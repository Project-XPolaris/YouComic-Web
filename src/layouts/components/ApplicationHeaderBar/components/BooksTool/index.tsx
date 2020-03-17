import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import OrderFilterButton from '@/layouts/components/ApplicationHeaderBar/components/OrderFilterButton';
import { Dispatch } from 'dva';
import TimeRangeFilter from '@/layouts/components/ApplicationHeaderBar/components/TimeRangePick';
import { Moment } from 'moment';

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    backgroundColor: '#FFF',
    overflowX: 'scroll',
    msOverflowStyle: 'none',
    overflow: '-moz-scrollbars-none',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  filterButton: {
    marginRight: theme.spacing(1),
  },
  timeRangePickWrap: {
    marginLeft: theme.spacing(3),

  },
}));

interface BooksToolPropsType {
  dispatch: Dispatch,
  onOrderChange: (isActive: boolean, isAsc: boolean, item: any) => void
  onTimeRangeChange: (startTime: Moment | null, endTime: Moment | null) => void

}

const filterGroup = [
  {
    text: '编号',
    orderKey: 'id',
    defaultAes: false,
    defaultActive: true,
  },
  {
    text: '创建时间',
    orderKey: 'created_at',
    defaultAes: false,
    defaultActive: false,
  },
  {
    text: '名称',
    orderKey: 'name',
    defaultAes: false,
    defaultActive: false,
  },
];
export default function BooksTool({ dispatch, onOrderChange,onTimeRangeChange }: BooksToolPropsType) {
  const classes = useStyles();
  const filterItems = filterGroup.map(item => {
    const onChange = (isActive: boolean, isAsc: boolean) => {
      onOrderChange(isActive, isAsc, item);
    };
    return (
      <div key={item.orderKey} className={classes.filterButton}>
        <OrderFilterButton
          text={item.text}
          onFilterChange={onChange}
          defaultActive={item.defaultActive}
          defaultAsc={item.defaultAes}
        />
      </div>
    );
  });
  return (
    <Toolbar className={classes.main}>
      {filterItems}
      <div className={classes.timeRangePickWrap}>
        <TimeRangeFilter onApplyTimeRange={onTimeRangeChange}/>
      </div>
    </Toolbar>
  );
}
