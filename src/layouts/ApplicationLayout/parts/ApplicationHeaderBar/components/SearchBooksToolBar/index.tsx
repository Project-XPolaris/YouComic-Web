import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Moment } from 'moment';
import BooksTool from '@/layouts/ApplicationLayout/parts/ApplicationHeaderBar/components/BooksTool';
import { connect, Dispatch } from 'dva';
import { encodeOrderToUrl, updateQueryParamAndReplaceURL } from '@/util/url';
import { TimeRangeFilterPropsType } from '@/layouts/ApplicationLayout/parts/ApplicationHeaderBar/components/TimeRangePick';
import { ConnectType } from '@/global/connect';
import { SearchBooksModelStateType } from '@/pages/search/books/model';

const useStyles = makeStyles({
  main: {},
});

interface SearchBooksToolBarPropsType {
  dispatch:Dispatch
  searchBooks:SearchBooksModelStateType
}


function SearchBooksToolBar({dispatch,searchBooks}: SearchBooksToolBarPropsType) {
  const classes = useStyles();
  const onFilterChange = (isActive: boolean, isAsc: boolean, item: any) => {
    const {order} = searchBooks
    if (isActive) {
      updateQueryParamAndReplaceURL({
        order:encodeOrderToUrl([
          ...order.filter(activeOrder => activeOrder.orderKey !== item.orderKey),
          {orderKey:item.orderKey,order:isAsc?"asc":"desc"}
        ])
      })
    }else{
      updateQueryParamAndReplaceURL({
        order:encodeOrderToUrl([
          ...order.filter(activeOrder => activeOrder.orderKey !== item.orderKey),
        ])
      })
    }
  };
  const onTimeRangeFilterChange = (timeRange?:string,startTime?: Moment, endTime?: Moment) => {
    updateQueryParamAndReplaceURL({
      startTime: startTime?.subtract(1, 'day').format('YYYY-MM-DD'),
      endTime:  endTime?.add(1, 'day').format('YYYY-MM-DD'),
      timeRange:timeRange
    })
  };
  const timeFilter : TimeRangeFilterPropsType = {
    onApplyTimeRange:onTimeRangeFilterChange,
    startTime:searchBooks?.startTime,
    endTime:searchBooks?.endTime,
    timeRange:searchBooks?.timeRange
  }
  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <BooksTool
        dispatch={dispatch}
        onOrderChange={onFilterChange}
        timeFilter={timeFilter}
        orderFilter={searchBooks?.order}
      />
    </div>
  );
}

export default connect(({searchBooks}:ConnectType) => ({searchBooks}))(SearchBooksToolBar);
