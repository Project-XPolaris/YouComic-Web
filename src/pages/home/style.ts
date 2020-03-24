import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    backgroundColor: '#EEEEEE',
    paddingTop: 120,
    minHeight:"100vh",
    paddingBottom: 48,
    display:"flex",
    justifyContent:'center'
  },
  row:{
    width:"90%"
  }
}));

export default useStyles
