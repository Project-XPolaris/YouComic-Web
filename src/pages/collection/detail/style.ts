import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    backgroundColor: '#EEEEEE',
    paddingTop: 120,
    minHeight:960,
    [theme.breakpoints.only('xs')]: {
      paddingLeft: 12,
      paddingRight: 12,
    },
    [theme.breakpoints.only('sm')]: {
      paddingLeft: 24,
      paddingRight: 24,
    },
    [theme.breakpoints.only('md')]: {
      paddingLeft: 32,
      paddingRight: 32,
    },
    [theme.breakpoints.only('lg')]: {
      paddingLeft: 72,
      paddingRight: 72,
    },
    [theme.breakpoints.only('xl')]: {
      paddingLeft: theme.spacing(30),
      paddingRight: theme.spacing(30),
    },
    paddingBottom: 48,
  },
  mainExpand: {
    paddingTop: 120,
    backgroundColor: '#EEEEEE',
    minHeight:960,
    [theme.breakpoints.only('xs')]: {
      paddingLeft: 12,
      paddingRight: 12,
    },
    [theme.breakpoints.only('sm')]: {
      paddingLeft: 24,
      paddingRight: 24,
    },
    [theme.breakpoints.only('md')]: {
      paddingLeft: 48,
      paddingRight: 48,
    },
    [theme.breakpoints.only('lg')]: {
      paddingLeft: 72,
      paddingRight: 72,
    },
    [theme.breakpoints.only('xl')]: {
      transition: theme.transitions.create('padding', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      paddingLeft: theme.spacing(30),
      paddingRight: theme.spacing(30),
    },
  },
  paginationWrap: {
    textAlign: 'end',
    marginTop: 32,
  },
}));

export default useStyles;
