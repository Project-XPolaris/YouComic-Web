import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  main: {},
  title:{
    fontSize:28,
    fontWeight:400,
    marginBottom:theme.spacing(2)
  },
  header:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
  }
}));
export default useStyles
