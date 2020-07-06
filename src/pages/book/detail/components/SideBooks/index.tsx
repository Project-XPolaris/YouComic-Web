import { Book } from '@/services/book';
import BookDetailHorizonCard from '@/pages/book/detail/components/DetailBookHorizonCard';
import { Tag } from '@/services/tag';
import React from 'react';
import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  main: {},
  sideCollectionContainer: {
    marginTop: 48,
  },
  sideCollectionHeader: {
    marginBottom: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  horizonCardWrap: {
    marginTop: 12,
  },
});

interface SideBooksPropsType {
  onSeeMoreClick: () => void
  title: string
  tag?: Tag
  books?: Book[]
  loading?: boolean
}


export default function SideBooks({ onSeeMoreClick, title, tag, books, loading = false }: SideBooksPropsType) {
  const classes = useStyles();
  const renderBooks = () => {
    console.log(books)
    if (loading || !tag || !books) {
      return [1, 2, 3, 4].map(idx =>
        (
          <div key={idx} className={classes.horizonCardWrap}>
            <BookDetailHorizonCard
              loading={true}
            />
          </div>
        ),
      );
    }
    return books.map((book: Book) => {
      return (
        <div key={book.id} className={classes.horizonCardWrap}>
          <BookDetailHorizonCard
            book={book}
            loading={false}
          />
        </div>
      );
    });
  };
  return (
    <div className={classes.sideCollectionContainer}>
      <div className={classes.sideCollectionHeader}>
        <Box color="primary" fontSize="h6.fontSize">
          {title}
        </Box>
        <Button color={'primary'} variant={'contained'} size={'small'} onClick={onSeeMoreClick}>查看更多</Button>
      </div>
      {renderBooks()}
    </div>
  );
}
