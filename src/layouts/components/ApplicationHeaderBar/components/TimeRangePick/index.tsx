import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Button, Chip, IconButton, Popover } from '@material-ui/core';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import {
  KeyboardDatePicker, MuiPickersUtilsProvider,
} from '@material-ui/pickers';
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

interface TimeRangeFilterPropsType {
  onApplyTimeRange: (startTime: Moment | null, endTime: Moment | null) => void
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
export default function TimeRangeFilter({ onApplyTimeRange }: TimeRangeFilterPropsType) {
  const classes = useStyles();
  const [activeQuickPick, setActiveQuickPick] = useState<string | undefined>(undefined);
  const [anchorEl, setAnchorEL] = useState(null);
  const [isAdvanceTimeRangeActive, setIsAdvanceTimeRangeActive] = useState(false);
  const onExpandButtonClick = (e: any) => {
    setAnchorEL(e.currentTarget);
  };
  const onPopoverCancel = () => {
    setAnchorEL(null);
  };
  const quickPickChips = quickPick.map(item => {
    const onQuickPickChipClick = () => {
      setIsAdvanceTimeRangeActive(false);
      setActiveQuickPick(item.timeKey);
      const { start, end } = item.getTime();
      onApplyTimeRange(start, end);
    };
    return (
      <Chip
        key={item.timeKey}
        label={item.title}
        onClick={onQuickPickChipClick}
        clickable={true}
        className={classes.quickPickItem}
        color={'primary'}
        variant={(!isAdvanceTimeRangeActive && activeQuickPick === item.timeKey) ? 'default' : 'outlined'}
      />
    );
  });
  const [selectedStartDate, setSelectedStartDate] = React.useState<Moment | null>(moment());
  const [selectedEndDate, setSelectedEndDate] = React.useState<Moment | null>(moment());
  const onSelectStartDate = (date: Moment | null) => {
    setSelectedStartDate(date);
  };
  const onSelectEndDate = (date: Moment | null) => {
    setSelectedEndDate(date);
  };
  const onApplyClick = () => {
    setActiveQuickPick(undefined);
    if (isAdvanceTimeRangeActive) {
      onApplyTimeRange(null, null);
      setIsAdvanceTimeRangeActive(false);
    } else {
      onApplyTimeRange(selectedStartDate, selectedEndDate);
    }
    setIsAdvanceTimeRangeActive(true);
  };
  const renderTimeRangeChip = () => {
    const onTimeRangeClick = () => {
      onApplyTimeRange(null, null);
      setIsAdvanceTimeRangeActive(false);
    };
    const text = `${selectedStartDate ? selectedStartDate.format('YYYY-MM-DD') : '任何'} 至 ${selectedEndDate ? selectedEndDate.format('YYYY-MM-DD') : '任何'}`;
    return (
      <Chip
        label={text}
        color={'primary'}
        variant={isAdvanceTimeRangeActive ? 'default' : 'outlined'}
        onClick={onTimeRangeClick}
        clickable={true}
      />
    );
  };
  return (
    <div className={classes.main}>
      {isAdvanceTimeRangeActive ? renderTimeRangeChip() : quickPickChips}
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
          {isAdvanceTimeRangeActive && quickPickChips}
          <KeyboardDatePicker
            variant="inline"
            format="YYYY-MM-DD"
            margin="normal"
            id="date-picker-inline"
            label="开始时间"
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            value={selectedStartDate}
            onChange={onSelectStartDate}
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
            value={selectedEndDate}
            onChange={onSelectEndDate}
          />
          <div className={classes.actionContainer}>
            <Button
              color={'primary'}
              variant={isAdvanceTimeRangeActive ? 'contained' : 'outlined'}
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
