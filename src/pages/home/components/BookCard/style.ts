import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme:Theme) => ({
  main: {
    maxWidth:theme.spacing(20),
    borderRadius:2
  },
  cover:{
    maxHeight:230,
    width:160,
    height:230
  },
  title:{
    textOverflow:"ellipsis",
    fontWeight: 300,
    fontSize:16,
    maxHeight:theme.spacing(3),
    lineHeight:theme.spacing(3) + "px",
    color:"#333"
  },
  author:{
    maxWidth: 100,
    textOverflow:"ellipsis",
    fontSize:13,
    fontWeight: 300,
    overflow:"hidden",
    lineHeight:theme.spacing(2) + "px",
    maxHeight:theme.spacing(2),
  },
  content:{
    width:160,
    height:100,
    padding:"7px 10px"
  },
  link:{
    color:"#333"

  }
}));

export default useStyles;
