import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    padding:theme.spacing(2)
  },
  tagType:{
    color:theme.palette.text.secondary
  }
}));
export default useStyles;
