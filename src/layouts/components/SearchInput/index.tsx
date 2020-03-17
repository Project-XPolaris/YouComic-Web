import React, { FormEvent, useState,KeyboardEvent } from 'react';
import useStyles from './style';
import { InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import router from 'umi/router';


interface SearchInputPropsType {

}


export default function SearchInput({}: SearchInputPropsType) {
  const classes = useStyles();
  const [searchKey,setSearchKey] = useState<string | undefined>(undefined);
  const onSearchKeyChange = (e:FormEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchKey(e.currentTarget.value)
  };
  const onSearchKeyPress = (e:KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" && searchKey !== undefined && searchKey.length !== 0 && window.location.pathname !== `/search/${searchKey}`){
      router.push(`/search/${searchKey}`)
    }
  };
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={onSearchKeyChange}
        onKeyPress={onSearchKeyPress}
      />
    </div>
  );
}
