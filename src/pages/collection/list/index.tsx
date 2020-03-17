import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect, Dispatch } from 'dva';
import OwnCollectionTable from '@/pages/collection/list/components/OwnCollectionTable';


const useStyles = makeStyles({
  main: {},

});

interface CollectionListPagePropsType {
  dispatch: Dispatch,
}

function CollectionListPage({ dispatch }: CollectionListPagePropsType) {
  const classes = useStyles();
  const [firstLoadOwnCollection, setFirstLoadOwnCollection] = useState(true);

  return (
    <div className={classes.main}>
      <OwnCollectionTable/>
    </div>
  );
}

export default connect(({}) => ({}))(CollectionListPage);
