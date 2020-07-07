import useStyles from './style';
import { Book } from '@/services/book';
import { getBookTagInfo } from '@/util/book';
import { history } from '@@/core/umiExports';
import { Box, Card, CardActionArea, CardContent, IconButton, Link, Menu, MenuItem } from '@material-ui/core';
import React from 'react';
import { Skeleton } from '@material-ui/lab';
import ImageLoader from '@/components/ImageLoader';
import { MoreVert } from '@material-ui/icons';

export interface BookCardAction {
  key: string
  onAction: (book: Book) => void
  title: (book: Book) => any
}

interface BookCardPropsType {
  book?: Book
  loading: boolean
  menuAction?: BookCardAction[]
}


export default function BookCard({ book, loading = false, menuAction }: BookCardPropsType) {
  const classes = useStyles();
  const { series, author } = getBookTagInfo(book);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const onCardClick = () => {
    history.push(`/book/${book?.id}`);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className={classes.main}>
      {
        (menuAction && book) && (
          <>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted={true}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {menuAction.map((item: BookCardAction) => {
                const onMenuClick = () => {
                  item.onAction(book)
                  handleClose()
                };
                return (
                  <MenuItem onClick={onMenuClick} key={item.key}>{item.title(book)}</MenuItem>);
              })}
            </Menu>
            <IconButton
              aria-label="more"
              className={classes.menuButton}
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              size={'small'}
            >
              <MoreVert className={classes.menuIcon}/>
            </IconButton>
          </>
        )}
      <CardActionArea onClick={onCardClick}>
        {loading ? <Skeleton variant="rect" width={160} height={230} animation="wave"/> :
          <ImageLoader url={book?.cover} className={classes.cover} loadingHeight={230} loadingWidth={160}/>}
      </CardActionArea>
      <CardContent className={classes.content}>
        <Link href={`/book/${book?.id}`} className={classes.link}>
          {loading || !book ? <Skeleton variant="text"/> :
            <Box overflow="hidden" width={1} maxWidth={1} className={classes.title}>{book?.name}</Box>}
        </Link>
        {
          loading || !book ? <Skeleton variant="text"/> : (author ?
              <Link href={`/tag/${author?.id}`} className={classes.link}>
                <Box className={classes.author}>{author?.name || '未知'}</Box>
              </Link> :
              <Box className={classes.author}>未知</Box>
          )
        }
        {
          loading || !book ? <Skeleton variant="text"/> : (series ?
              <Link href={`/tag/${series?.id}`} className={classes.link}>
                <Box className={classes.series}>{series?.name || '未知'}</Box>
              </Link> :
              <Box className={classes.series}>未知</Box>
          )
        }

      </CardContent>
    </Card>
  );
}
