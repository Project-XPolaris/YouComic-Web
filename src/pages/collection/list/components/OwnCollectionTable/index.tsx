import React from 'react';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Paper, Table, Toolbar } from '@material-ui/core';

const useStyles = makeStyles({
  main: {},
});

interface OwnCollectionTablePropsType {

}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
        : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
    title: {
      flex: '1 1 100%',
    },
  }),
);

interface EnhancedTableToolbarProps {
  numSelected: number;
}


export default function OwnCollectionTable({}: OwnCollectionTablePropsType) {
  const classes = useStyles();

  return (
    <Paper className={classes.main} square={true}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>名称</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </Paper>
  );
}
