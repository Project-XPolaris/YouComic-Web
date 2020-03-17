import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button, Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem, ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { Collection } from '@/services/collection';

const useStyles = makeStyles({
  main: {},
});

interface SelectCollectionDialogPropsType {
  isOpen: boolean
  onDialogClose: () => void
  collections?: Collection[]
  onOk: (selectedOptions: number[]) => void
}


export default function SelectCollectionDialog({ isOpen, onDialogClose, collections = [], onOk }: SelectCollectionDialogPropsType) {
  const classes = useStyles();
  const [selectedOption, setSelectedOption] = useState<number[]>([]);
  const onCancel = () => {
    setSelectedOption([]);
    onDialogClose();
  };
  const onOkClick = () => {
    onOk(selectedOption);
  };
  const renderOption = () => {
    return collections.map((collection: Collection) => {
      const onOptionSelect = () => {
        if (selectedOption.find(id => id === collection.id) !== undefined) {
          setSelectedOption(selectedOption.filter(value => value !== collection.id));
        } else {
          setSelectedOption([
            ...selectedOption,
            collection.id,
          ]);
        }

      };
      return (
        <ListItem key={collection.id} button={true} onClick={onOptionSelect}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              tabIndex={-1}
              checked={selectedOption.find(id => id === collection.id) !== undefined}
              disableRipple={true}
            />
          </ListItemIcon>
          <ListItemText primary={collection.name}/>
        </ListItem>
      );
    });
  };
  return (
    <Dialog
      open={isOpen}
      onClose={onDialogClose}
      maxWidth="xs"
      fullWidth={true}
      disableBackdropClick={true}
    >
      <DialogTitle id="confirmation-dialog-title">添加至收藏</DialogTitle>

      <List>
        {renderOption()}
      </List>

      <DialogActions>
        <Button autoFocus={true} onClick={onCancel} color="primary">
          取消
        </Button>
        <Button color="primary" onClick={onOkClick}>
          添加
        </Button>
      </DialogActions>
    </Dialog>
  );
}
