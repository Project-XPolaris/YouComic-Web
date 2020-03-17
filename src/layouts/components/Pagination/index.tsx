import { Button } from '@material-ui/core';
import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { pagination } from '@/util/pagination';

interface PaginationProps {
  count: number,
  page: number,
  pageSize: number,
  onNextPage: () => void
  onPreviousPage: () => void
  onSelectPage: (page: number) => void
}

const Pagination = (props: PaginationProps) => {
  const classes = useStyles();
  const createPaginationButtons = () => {
    const { count, page, pageSize, onNextPage, onPreviousPage, onSelectPage } = props;
    let totalPage = Math.ceil(count / pageSize);
    return [
      <Button
        key={"prev"}
        color="primary"
        variant={'contained'}
        disabled={page === 1}
        className={classes.paginationButton}
        onClick={(e) => onPreviousPage()}
      >
        Prev
      </Button>,
      ...pagination(page, totalPage).map((button: any) => (
        <Button
          key={button.value}
          color="primary"
          variant={'contained'}
          className={classes.paginationButton}
          disabled={Number(button.value) === page}
          onClick={() => onSelectPage(Number(button.value))}
        >{button.text}
        </Button>
      )),
      <Button
        color="primary"
        variant='contained'
        key="next"
        className={classes.paginationButton}
        disabled={page === totalPage}
        onClick={_ => onNextPage()}
      >
        Next
      </Button>,
    ];
  };
  return (
    <div>
      {createPaginationButtons()}
    </div>
  );
};

const useStyles = makeStyles({
  paginationButton: {
    marginRight: 8,
  },
});


export default Pagination;
