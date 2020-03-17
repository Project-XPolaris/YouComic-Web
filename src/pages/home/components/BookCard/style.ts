import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme:Theme) => ({
  main: {
    maxWidth:theme.spacing(16)
  },
  cover:{
    maxHeight:theme.spacing(24)
  },
  title:{
    maxWidth: 100,
    textOverflow:"ellipsis",
    fontWeight: 600,
    height:theme.spacing(2)
  },
  author:{
    maxWidth: 100,
    textOverflow:"ellipsis",
    marginTop:theme.spacing(1),
    fontSize:12,
    overflow:"hidden",
    height:theme.spacing(2)
  }
}));

export default useStyles;
