import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  main: {
    backgroundColor: '#EEEEEE',
    paddingTop: 120,
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
      paddingLeft: 300,
      paddingRight: 300,
    },
    paddingBottom: 48,

  },
  mainContent: {
    paddingBottom: 48,
  },
  contentHeader: {
    display: 'flex',
  },
  cover: {
    maxWidth: 200,
    maxHeight: 285,
    [theme.breakpoints.down('sm')]: {
      maxWidth: 120,
      maxHeight: 170,
    },
  },
  coverWarp: {
    display: 'flex',
    maxWidth: 200,
    maxHeight: 285,
    [theme.breakpoints.down('sm')]: {
      maxWidth: 120,
      maxHeight: 170,
    },
  },
  headerInfoContainer: {
    paddingRight: 48,
    marginLeft: 24,
    width: '100%',
  },
  title: {
    marginTop: 24,
  },
  theme: {
    marginTop: 12,
  },
  authorAndTimeContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 12,
  },
  createdTime: {
    marginLeft: 12,
  },
  headerAction: {
    marginTop: 48,
    textAlign: 'end',
  },
  divider: {
    marginTop: 12,
    marginBottom: 12,
    marginRight: 48,
    marginLeft: 48,
  },
  tagsArea: {
    marginRight: 48,
    marginLeft: 48,
    paddingBottom: 48,
    marginTop: 48,
  },

  tagContainer: {
    marginTop: 24,
  },
  bookTag: {
    marginRight: 16,
    marginBottom: 12,
  },
  authorArea: {
    marginRight: 48,
    marginLeft: 48,
  },
  authorContainer: {
    marginTop: 24,
  },
  addToCollectionButton: {
    marginRight: 24,
  },
}));
export default useStyles
