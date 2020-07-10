import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect, Dispatch } from 'dva';
import { encodeOrderToUrl, updateQueryParamAndReplaceURL } from '@/util/url';
import { Moment } from 'moment';
import BooksTool from '@/layouts/ApplicationLayout/parts/ApplicationHeaderBar/components/BooksTool';
import { BookListModelStateType } from '@/pages/book/list/model';
import { ConnectType } from '@/global/connect';
import { TimeRangeFilterPropsType } from '@/layouts/ApplicationLayout/parts/ApplicationHeaderBar/components/TimeRangePick';


const useStyles = makeStyles({
  main: {},

});

interface BookListToolPropsType {
  dispatch: Dispatch,
  bookList:BookListModelStateType
}
//book list toolbar
function BookListTool({ dispatch,bookList }: BookListToolPropsType) {
  const classes = useStyles();
  const onFilterChange = (isActive: boolean, isAsc: boolean, item: any) => {
    const {order} = bookList
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
    startTime:bookList?.startTime,
    endTime:bookList?.endTime,
    timeRange:bookList?.timeRange
  }
  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <BooksTool
        dispatch={dispatch}
        onOrderChange={onFilterChange}
        timeFilter={timeFilter}
        orderFilter={bookList?.order}
      />
    </div>
  );
}

export default connect(({bookList}:ConnectType) => ({bookList}))(BookListTool);
