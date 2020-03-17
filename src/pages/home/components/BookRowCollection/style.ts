import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  main: {},
  title:{
    fontSize:28,
    fontWeight:400
  },
  header:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center"
  }
}));
export default useStyles
