import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Book } from '@/services/book';
import BookCard from '@/components/BookCard';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  main: {},
  collection: {
    display: 'flex',
  },
  container: {
    overflowX: 'scroll',
    overflowY: 'hidden',
    display: 'flex',
  },
  item: {
    paddingRight:6,
    paddingBottom:8
  },
  header:{
    paddingBottom:15,
    display:"flex",
    justifyContent:"space-between"
  },
  title: {
    fontSize: 28,
  },
});

interface BookHorizonCollectionPropsType {
  books?: Book[],
  title: string,
  onMore?:() => void
}


export default function BookHorizonCollection({ books = [], title,onMore }: BookHorizonCollectionPropsType) {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <div className={classes.title}>
          {title}
        </div>
        <div>
        {
          onMore &&
          <Button
            disableElevation={true}
            onClick={onMore}
            color={"primary"}
            variant="contained"
            size={"small"}
          >
            查看更多
          </Button>
        }
        </div>

      </div>
      <div className={classes.container}>
        <div className={classes.collection}>
          {
            books.map(book => {
              return (
                <div className={classes.item} key={book.id}>
                  <BookCard book={book}/>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}
