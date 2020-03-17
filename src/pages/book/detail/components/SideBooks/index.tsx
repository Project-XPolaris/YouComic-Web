import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';
import { Book } from '@/services/book';
import { getBookTagInfo } from '@/util/book';
import BookDetailHorizonCard from '@/pages/book/detail/components/DetailBookHorizonCard';
import { Tag } from '@/services/tag';

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
  title:string
  tag?:Tag
  books:Book[]
}


export default function SideBooks({onSeeMoreClick,title,tag,books}: SideBooksPropsType) {
  const classes = useStyles();
  const renderBooks = () => {
    if (tag) {
      return books.map((book: Book) => {
        const bookMeta = getBookTagInfo(book);
        return (
          <div key={book.id} className={classes.horizonCardWrap}>
            <BookDetailHorizonCard
              title={book.name}
              cover={book.cover}
              author={{ text: bookMeta.author?.name, link: bookMeta.author ? `/tag/${bookMeta.author.id}` : undefined }}
              series={{ text: bookMeta.series?.name, link: bookMeta.series ? `/tag/${bookMeta.series.id}` : undefined }}
              theme={{ text: bookMeta.theme?.name, link: bookMeta.theme ? `/tag/${bookMeta.theme.id}` : undefined }}
              link={`/book/${book.id}`}
            />
          </div>
        );
      });
    } else {
      return undefined;
    }
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
