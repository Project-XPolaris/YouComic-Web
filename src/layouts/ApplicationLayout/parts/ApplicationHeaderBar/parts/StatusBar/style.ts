import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    statusBar: {
      height: 32,
      width: '100%',
      backgroundColor: '#0069c0',
      display:'flex',
      flexDirection:"row",
      alignItems:"center",
      position:"relative"
    },
    dragZone:{
      "-webkit-app-region": "drag",
      flexGrow:1,
      height: "100%"
    },
    actionIcon:{
      color:"#FFF"
    }
  }),
);
