import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Chip, IconButton, Popover } from '@material-ui/core';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { KeyboardDatePicker } from '@material-ui/pickers';
import moment, { Moment } from 'moment';

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    display: "flex"
  },
  quickPickItem: {
    marginRight: theme.spacing(1),
  },
  timeRangeChip: {
    marginRight: theme.spacing(1),
  },
  expandContent: {
    padding: theme.spacing(4),
    maxWidth: theme.spacing(35),
  },
  betweenText: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    color: theme.palette.text.primary,
  },
  actionContainer: {
    marginTop: theme.spacing(2),
    textAlign: 'end',
  },
  timeRangeChipContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export interface TimeRangeFilterPropsType {
  onApplyTimeRange: (timeRange?:string,startTime?: Moment, endTime?: Moment) => void
  timeRange?:string
  startTime?:string
  endTime?:string
}

const quickPick = [
  {
    title: '7天',
    timeKey: '7d',
    getTime: () => ({
      start: moment().endOf('day').subtract(7, 'days'),
      end: moment(),
    }),
  }, {
    title: '30天',
    timeKey: '30d',
    getTime: () => ({
      start: moment().endOf('day').subtract(30, 'days'),
      end: moment(),
    }),
  },
  {
    title: '90天',
    timeKey: '90d',
    getTime: () => ({
      start: moment().endOf('day').subtract(90, 'days'),
      end: moment(),
    }),
  },
];
export default function TimeRangeFilter({ onApplyTimeRange,timeRange }: TimeRangeFilterPropsType) {
  const classes = useStyles();
  const [anchorEl, setAnchorEL] = useState(null);
  const [inputStartTime,setInputStartTime] = useState<Moment | undefined>(moment())
  const [inputEndTime,setInputEndTime] = useState<Moment | undefined>(moment())
  const setStartTime = (time : Moment | null) => {
    if (time === null || time === undefined){
      setInputStartTime(undefined)
    }else{
      setInputStartTime(time)
    }
  }
  const setEndTime = (time : Moment | null) => {
    if (time === null || time === undefined){
      setInputEndTime(undefined)
    }else{
      setInputEndTime(time)
    }
  }
  const onExpandButtonClick = (e: any) => {
    setAnchorEL(e.currentTarget);
  };
  const onPopoverCancel = () => {
    setAnchorEL(null);
  };
  const quickPickChips = quickPick.map(item => {
    const onQuickPickChipClick = () => {
      const { start, end } = item.getTime();
      if (timeRange === item.timeKey){
        onApplyTimeRange(undefined,undefined, undefined);
      }else{
        onApplyTimeRange(item.timeKey,start, end);

      }

    };
    return (
      <Chip
        key={item.timeKey}
        label={item.title}
        onClick={onQuickPickChipClick}
        clickable={true}
        className={classes.quickPickItem}
        color={'primary'}
        variant={(timeRange && timeRange === item.timeKey) ? 'default' : 'outlined'}
      />
    );
  });
  const onApplyClick = () => {
    onApplyTimeRange("custom",inputStartTime,inputEndTime)
  };
  const renderTimeRangeChip = () => {
    const onTimeRangeClick = () => {
      if (timeRange === "custom"){
        onApplyTimeRange(undefined,undefined, undefined);
      }else{
        onApplyTimeRange("custom",inputStartTime,inputEndTime)
      }

    };
    const text = `${inputStartTime ? inputStartTime.format('YYYY-MM-DD') : '任何'} 至 ${inputEndTime ? inputEndTime.format('YYYY-MM-DD') : '任何'}`;
    return (
      <Chip
        label={text}
        color={'primary'}
        variant={timeRange === "custom" ? 'default' : 'outlined'}
        onClick={onTimeRangeClick}
        clickable={true}
      />
    );
  };
  return (
    <div className={classes.main}>
      {timeRange && timeRange === "custom" ? renderTimeRangeChip() : quickPickChips}
      <IconButton onClick={onExpandButtonClick} size={'small'} color={'primary'}>
        {Boolean(anchorEl) ? <KeyboardArrowDownIcon/> : <KeyboardArrowLeftIcon/>}
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onPopoverCancel}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        style={{ marginTop: 16 }}
        elevation={1}
      >
        <div className={classes.expandContent}>
          {timeRange && timeRange === "custom" && quickPickChips}
          <KeyboardDatePicker
            variant="inline"
            format="YYYY-MM-DD"
            margin="normal"
            id="date-picker-inline"
            label="开始时间"
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            value={inputStartTime}
            onChange={setStartTime}
          />
          <KeyboardDatePicker
            variant="inline"
            format="YYYY-MM-DD"
            margin="normal"
            id="date-picker-inline"
            label="结束时间"
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            value={inputEndTime}
            onChange={setEndTime}
          />
          <div className={classes.actionContainer}>
            <Button
              color={'primary'}
              variant={timeRange && timeRange === "custom" ? 'contained' : 'outlined'}
              disableElevation={true}
              onClick={onApplyClick}
            >设置
            </Button>
          </div>
        </div>
      </Popover>
    </div>
  );
}
