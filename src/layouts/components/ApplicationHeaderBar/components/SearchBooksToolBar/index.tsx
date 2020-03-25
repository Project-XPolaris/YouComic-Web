import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Moment } from 'moment';
import BooksTool from '@/layouts/components/ApplicationHeaderBar/components/BooksTool';
import { Dispatch } from 'dva';

const useStyles = makeStyles({
  main: {},
});

interface SearchBooksToolBarPropsType {
  dispatch:Dispatch
}


export default function SearchBooksToolBar({dispatch}: SearchBooksToolBarPropsType) {
  const classes = useStyles();
  const [orderFilter, setOrderFilter] = useState({ id: 'desc' });
  const onFilterChange = (isActive: boolean, isAsc: boolean, item: any) => {
    const filter: any = orderFilter;
    if (isActive) {
      filter[item.orderKey] = isAsc ? 'asc' : 'desc';
    } else {
      if (item.orderKey in orderFilter) {
        delete filter[item.orderKey];
      }
    }
    setOrderFilter(filter);
    dispatch({
      type: 'searchBooks/setOrder',
      payload: {
        order: orderFilter,
      },
    });
    dispatch({
      type: 'searchBooks/searchBooks',
    });
  };
  const onTimeRangeFilterChange = (startTime: Moment | null, endTime: Moment | null) => {
    dispatch({
      type: 'searchBooks/setTimeRange',
      payload: {
        startTime: startTime === null ? undefined : startTime.subtract(1, 'day').format('YYYY-MM-DD'),
        endTime: endTime === null ? undefined : endTime.add(1, 'day').format('YYYY-MM-DD'),
      },
    });
    dispatch({
      type: 'searchBooks/searchBooks',
    });
  };

    return (
      <div style={{ width: '100%', overflow: 'hidden' }}>
        {/*<BooksTool dispatch={dispatch} onOrderChange={onFilterChange} onTimeRangeChange={onTimeRangeFilterChange}/>*/}
      </div>
    );

}
