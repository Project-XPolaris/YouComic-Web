import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme:Theme) => ({
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
    minWidth:330
  },
  mainContent: {
    paddingBottom: 48,
    maxWidth:720,
    minWidth:720
  },
  contentHeader: {
    display: 'flex',
    position:"relative"
  },
  cover: {
    objectFit:"cover",
    width: 200,
    height: 300,
    [theme.breakpoints.down('sm')]: {
      maxWidth: 120,
      maxHeight: 170,
    },
  },
  coverWarp: {
    display: 'flex',
    width: 200,
    height: 300,
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
    textAlign: 'end',
    position:"absolute",
    bottom:0,
    right:32
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
    minHeight:160
  },

  tagContainer: {
    marginTop: 24,
    display:'flex'

  },
  bookTag: {
    marginRight: 16,
    marginBottom: 12,
  },
  authorArea: {
    marginRight: 48,
    marginLeft: 48,
    minHeight:656
  },
  authorContainer: {
    marginTop: 24,
  },
  addToCollectionButton: {
    marginRight: 24,
  },
  sideContainer:{
    minHeight:730
  }
}));
export default useStyles
