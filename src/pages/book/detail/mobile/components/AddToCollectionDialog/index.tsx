import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: 16,
    flex: 1,
  },
});

interface AddToCollectionDialogPropsType {
  onCloseDialog:() => void
  isOpen:boolean
}


export default function AddToCollectionDialog({onCloseDialog,isOpen}: AddToCollectionDialogPropsType) {
  const classes = useStyles();

  return (
    <Dialog fullScreen={true} open={isOpen} onClose={onCloseDialog}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onCloseDialog} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Sound
          </Typography>
          <Button autoFocus color="inherit" onClick={onCloseDialog}>
            save
          </Button>
        </Toolbar>
      </AppBar>
    </Dialog>
  );
}
