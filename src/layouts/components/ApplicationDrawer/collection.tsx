import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import router from 'umi/router';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, Divider, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader,
  Menu,
  MenuItem, TextField,
} from '@material-ui/core';
import { Collection } from '@/services/collection';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import { redirectByURL } from '@/util/url';
import { Controller, useForm } from 'react-hook-form';
import AddIcon from '@material-ui/icons/Add';
import { UserStateType } from '@/models/user';
import { LayoutModelStateType } from '@/models/layout';
import { Dispatch } from 'dva';

const useStyles = makeStyles({
  main: {},
});

interface ApplicationDrawerCollectionPropsType {
  user: UserStateType,
  layout: LayoutModelStateType,
  dispatch: Dispatch,
  location: any
}

interface CreateCollectionFormData {
  name: string
}

export default function ApplicationDrawerCollection(
  {
    user,
    layout,
    dispatch,
    location,
  }: ApplicationDrawerCollectionPropsType) {
  const [collectionActionAnchor, setCollectionActionAnchor] = useState<null | HTMLElement>(null);
  const [collectionActionId, setCollectionActionId] = useState<null | number>(null);
  const [deleteCollectionDialogOpen, setDeleteCollectionDialogOpen] = useState<boolean>(false);
  const [createCollectionDialogOpen, setCreateCollectionDialogOpen] = useState(false);
  const { ownCollections, followCollections } = user;
  const { currentCollectionId } = layout;
  const { handleSubmit, control } = useForm();
  const onSubmit = ({ name }: any) => {
    dispatch({
      type: 'user/createCollection',
      payload: {
        name,
      },
    });
    setCreateCollectionDialogOpen(false);
  };
  //collection drawer switch
  const switchCollection = (id: number, name: string) => {
    const toURL = `/collection/${id}`;
    if (location.pathname === toURL) {
      return;
    }
    dispatch({
      type: 'layout/changeCollectionItem',
      payload: {
        id,
      },
    });
    const matchRegex = RegExp('^/collection/.*?$');
    if (matchRegex.test(location.pathname)) {
      router.replace(toURL);
    } else {
      router.push(toURL);
    }

  };
  //own collection action click handler
  const onCollectionActionClick = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    setCollectionActionId(id);
    setCollectionActionAnchor(event.currentTarget);
  };
  // own collection action cancel
  const onCollectionActionCancel = () => {
    setCollectionActionId(null);
    setCollectionActionAnchor(null);
  };
  //remove collection
  const removeCollection = () => {
    dispatch({
      type: 'user/removeCollection',
      payload: {
        collectionId: collectionActionId,
      },
    });
  };
  const renderMenu = () => {
    const onDeleteMenuClick = () => {
      setDeleteCollectionDialogOpen(true);
    };
    return (
      <Menu
        anchorEl={collectionActionAnchor}
        keepMounted={true}
        open={Boolean(collectionActionAnchor)}
        onClose={onCollectionActionCancel}
      >
        <MenuItem onClick={onDeleteMenuClick}>删除</MenuItem>
        <MenuItem>重命名</MenuItem>
      </Menu>
    );
  };
  const onDeleteConfirmDialogCancel = () => {
    removeCollection();
    setCollectionActionAnchor(null);
    setDeleteCollectionDialogOpen(false);
  };
  const renderDeleteConfirmDialog = () => {
    return (
      <Dialog
        open={deleteCollectionDialogOpen}
        onClose={onDeleteConfirmDialogCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">删除当前收藏夹</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            此操作不可逆，请确认
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDeleteConfirmDialogCancel} color="primary" autoFocus={true}>
            取消
          </Button>
          <Button onClick={onDeleteConfirmDialogCancel} color="primary">
            删除
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  const ownCollectionNavigationItems = ownCollections ? ownCollections.map((collection: Collection) => {
    const onNavigationItemClick = () => {
      switchCollection(collection.id, collection.name);
    };
    const onActionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onCollectionActionClick(e, collection.id);
    };
    return (
      <ListItem
        button={true}
        onClick={onNavigationItemClick}
        key={collection.id}
        selected={location.pathname === `/collection/${collection.id}`}
      >
        <ListItemIcon>
          <FavoriteIcon/>
        </ListItemIcon>
        <ListItemText primary={collection.name}/>
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" size={'small'} onClick={onActionClick}>
            <MoreVertIcon/>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }) : [];
  const followCollectionNavigationItems = followCollections ? followCollections.map((collection: Collection) => {
    const onNavigationItemClick = () => {
      switchCollection(collection.id, collection.name);
    };
    const onActionClick = () => {
      setCollectionActionId(collection.id);
      setDeleteCollectionDialogOpen(true);
    };
    return (
      <ListItem
        button={true}
        onClick={onNavigationItemClick}
        key={collection.id}
        selected={location.pathname === `/collection/${collection.id}`}
      >
        <ListItemIcon>
          <FavoriteIcon/>
        </ListItemIcon>
        <ListItemText primary={collection.name}/>
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" size={'small'} onClick={onActionClick}>
            <DeleteIcon/>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }) : [];
  const onManageCollectionsClick = () => {
    setCreateCollectionDialogOpen(true);
  };
  const renderCreateCollectionDialog = () => {
    const onCreateCollectionDialogClose = () => {
      setCreateCollectionDialogOpen(false);
    };
    return (
      <Dialog
        open={createCollectionDialogOpen}
        onClose={onCreateCollectionDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">创建新的收藏夹</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller as={<TextField style={{ width: 500 }}/>} name="name" control={control} defaultValue=""/>
            <DialogActions>
              <Button onClick={onCreateCollectionDialogClose} color="primary">
                取消
              </Button>
              <Button type={'submit'} color="primary">
                创建
              </Button>
            </DialogActions>
          </form>
        </DialogContent>

      </Dialog>
    );
  };
  const items = [];
  for (let idx = 0; idx < 100; idx++) {
    items.push((
      <ListItem button={true} key={idx}>
        <ListItemIcon>
          <AddIcon/>
        </ListItemIcon>
        <ListItemText primary={`收藏 ${idx}`}/>
      </ListItem>
    ));
  }
  return (
    <List>
      {renderCreateCollectionDialog()}
      {renderMenu()}
      {renderDeleteConfirmDialog()}
      <ListItem button={true} onClick={onManageCollectionsClick} selected={location.pathname === '/my/collections'}>
        <ListItemIcon>
          <AddIcon/>
        </ListItemIcon>
        <ListItemText primary={'添加收藏夹'}/>
      </ListItem>
      <ListSubheader style={{ backgroundColor: '#FFF' }}>我创建的</ListSubheader>
      {ownCollectionNavigationItems}
      {/*<ListSubheader style={{ backgroundColor: '#FFF' }}>我关注的</ListSubheader>*/}
      {/*{followCollectionNavigationItems}*/}
      {/*<Divider/>*/}
    </List>
  );
}
