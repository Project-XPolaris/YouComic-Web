import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import LocalIcon from '@material-ui/icons/Translate';
import { setLocale } from '@@/plugin-locale/localeExports';

const useStyles = makeStyles(theme => ({
  main: {},
  icon:{
    color:"#FFF"
  }
}));

interface LocalSelectPropsType {

}
interface LocalOption {
  title:string,
  name:string
}

const LocalOptions : LocalOption[] = [
  {
    title:"简体中文",
    name:"zh-CN"
  },
  {
    title:"English",
    name:"en-US"
  }
]
export default function LocalSelect({}: LocalSelectPropsType) {
  const classes = useStyles();
  const [menuAnchor,setMenuAnchor] = useState();
  const onCloseMenu = () => setMenuAnchor(undefined)
  const onButtonClick = (event:any) => {
    setMenuAnchor(event.currentTarget);
  };
  const onSwitchLocal = (local:string) => {
    setLocale(local);
    setMenuAnchor(undefined)
  }
  return (
    <>
      <Menu
        id="local-menu"
        anchorEl={menuAnchor}
        keepMounted={true}
        open={Boolean(menuAnchor)}
        onClose={onCloseMenu}
      >
        {
          LocalOptions.map(option => {
            const onClick = () => {
              onSwitchLocal(option.name)
            }
            return (
              <MenuItem onClick={onClick} key={option.name}>{option.title}</MenuItem>
            )
          })
        }
      </Menu>
      <IconButton onClick={onButtonClick} className={classes.icon}>
        <LocalIcon/>
      </IconButton>
    </>
  );
}
