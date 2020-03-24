import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  main: {
    backgroundColor: '#EEEEEE',
    paddingTop: 120,
    paddingBottom: 48,
    display:"flex",
    justifyContent:"center"
  },
  left:{
    justifyContent:"center",
    display:"flex",
    marginRight:16
  },
  right:{

  },
  mainContent: {
    paddingBottom: 48,
    maxWidth:720
  },
  contentHeader: {
    display: 'flex',
  },
  cover: {
    maxWidth: 200,
    maxHeight: 300,
    [theme.breakpoints.down('sm')]: {
      maxWidth: 120,
      maxHeight: 170,
    },
    alignSelf:"center"
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
    fontSize:30,
    color:"#212121",
    marginTop:16
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
