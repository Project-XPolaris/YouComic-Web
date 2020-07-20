import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    main: {
      display: 'flex',
      minHeight: '100vh',
      flexDirection: 'column',
    },
    gapArea: {
      maxHeight: 175,
      width: '100%',
      flexGrow: 1,
    },
    loginContainer: {
      width: 448,
      height: 500,
      margin: '0 auto',
      border: '1px solid #dadce0',
      maxWidth: '100%',
      borderRadius: 8,
      textAlign: 'center',

    },
    loginContent: {
      marginTop: 64,
      marginBottom: 64,
      marginLeft: 48,
      marginRight: 48,
    },
    title: {
      marginTop: 36,
    },
    usernameInput: {
      width: '100%',
      marginTop: 48,
    },
    passwordInput: {
      width: '100%',
      marginTop: 24,
    },
    actionContainer: {
      marginTop: 48,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    statusBarWrap:{
      position:"fixed",
      width:"100%"
    }
  }),
);
