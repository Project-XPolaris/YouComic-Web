import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    backgroundColor: '#EEEEEE',
    paddingTop: 120,
    minHeight:"100vh",
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
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
    },
    paddingBottom: 48,
  },
  mainExpand: {
    paddingTop: 120,
    backgroundColor: '#EEEEEE',
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
      paddingLeft: 250,
      paddingRight: 250,
    },
    paddingBottom: 48,
  },
}));

export default useStyles
