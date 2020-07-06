import { ConnectType } from '@/global/connect';
import { DetailModelStateType } from '@/pages/book/detail/model';
import { Tag } from '@/services/tag';
import { Book } from '@/services/book';
import { getBookTagInfo } from '@/util/book';
import SelectCollectionDialog from '@/pages/book/detail/components/SelectCollectionDialog';
import { UserStateType } from '@/models/user';
import SideBooks from '@/pages/book/detail/components/SideBooks';
import useStyles from '@/pages/book/detail/style';
import BookDetailMobile from '@/pages/book/detail/mobile';
import { ScrollToTopOnMount } from '@/util/scroll';
import ImageLoader from '@/components/ImageLoader';
import { Dispatch, history, Loading } from '@@/core/umiExports';
import React from 'react';
import { Box, Button, Chip, Divider, Grid, isWidthDown, Paper, withWidth, WithWidthProps } from '@material-ui/core';
import { connect } from '@@/plugin-dva/exports';
import moment from 'moment';
import { Skeleton } from '@material-ui/lab';
import BookCard from '@/components/BookCard';
import { getBooleanWithDefault } from '@/util/function';


interface BookDetailPropsType {
  bookDetail: DetailModelStateType
  dispatch: Dispatch
  user: UserStateType
  width: any
  loading: Loading
}

function BookDetailPage({ bookDetail, dispatch, width, user, loading }: BookDetailPropsType & WithWidthProps) {
  const classes = useStyles();
  const loadingBook = Boolean(loading.effects['bookDetail/queryBook']);
  const { book, tags, tagBooks, isSelectCollectionDialogOpen } = bookDetail;
  const { ownCollections } = user;
  const { series, author, theme } = getBookTagInfo(book);
  const renderTags = () => {
    if (loadingBook) {
      return [1, 2, 3, 4, 5].map(idx =>
        (
          <span key={idx} className={classes.bookTag}>
          <Skeleton
            variant={'text'}
            width={96}
            height={48}
          />
        </span>
        ),
      );
    }
    if (tags) {
      return tags.map((tag: Tag) => {
        const onTagClick = () => {
          history.push(`/tag/${tag.id}`);
        };
        return (
          <Chip className={classes.bookTag} label={tag.name} onClick={onTagClick} key={tag.id}/>
        );
      });

    } else {
      return undefined;
    }
  };
  const renderRelateAuthorBook = () => {
    let isRelateAuthorLoading = loading.effects['bookDetail/queryRelateAuthor'];
    if (isRelateAuthorLoading === undefined) {
      isRelateAuthorLoading = true;
    }
    if (isRelateAuthorLoading ||  !author?.id || !tagBooks[author.id]) {
      return [1, 2, 3].map(idx => (
        <Grid item={true} key={idx}>
          <BookCard book={undefined} loading={true}/>
        </Grid>
      ));
    }
    if (author && author.id in tagBooks) {
      return tagBooks[author.id].map((book: Book) => {
        if (book.id === bookDetail.id) {
          return undefined;
        }
        return (
          <Grid item={true} key={book.id}>
            <BookCard book={book} loading={false}/>
          </Grid>);
      });
    } else {
      return undefined;
    }
  };
  const onReadButtonClick = () => {
    if (book) {
      history.push(`/book/${book.id}/read`);
    }
  };
  const onAddToCollectionButton = () => {
    if (user.id) {
      dispatch({
        type: 'bookDetail/setSelectCollectionOpen',
        payload: {
          open: true,
        },
      });
    } else {
      history.push('/user/login');
    }

  };
  const onAddToCollectionClose = () => {
    dispatch({
      type: 'bookDetail/setSelectCollectionOpen',
      payload: {
        open: false,
      },
    });
  };
  const onSelectCollectionOK = (options: number[]) => {
    dispatch({
      type: 'bookDetail/addBookToCollection',
      payload: {
        collectionIds: options,
      },
    });
  };
  const onSeeMoreThemeClick = () => {
    if (theme) {
      history.push(`/tag/${theme.id}`);
    }

  };
  const onSeeMoreSeriesClick = () => {
    if (series) {
      history.push(`/tag/${series.id}`);
    }

  };
  const getSameThemeBookList = () => {
    if (!theme) {
      return undefined;
    }
    if (theme.id in tagBooks) {
      return tagBooks[theme.id].filter((book: Book) => book.id !== 999);
    } else {
      return undefined
    }
  };
  const getSameSeriesBookList = () => {
    if (!series) {
      return undefined
    }
    if (series.id in tagBooks) {
      return tagBooks[series.id].filter((book: Book) => book.id !== 9999);
    } else {
      return undefined;
    }
  };
  if (isWidthDown('md', width)) {
    return (
      <BookDetailMobile/>
    );
  } else {
    return (
      <div className={classes.main}>
        <ScrollToTopOnMount/>
        <SelectCollectionDialog
          isOpen={isSelectCollectionDialogOpen}
          onDialogClose={onAddToCollectionClose}
          collections={ownCollections}
          onOk={onSelectCollectionOK}
        />
        <div className={classes.left}>
          <Paper square={true} className={classes.mainContent}>
            <div className={classes.contentHeader}>
              <Box boxShadow={1} className={classes.coverWarp}>
                {loadingBook ? <Skeleton variant={'rect'} width={200} height={300}/> :
                  <ImageLoader className={classes.cover} url={book?.cover} loadingWidth={200} loadingHeight={300}/>}
              </Box>
              <div className={classes.headerInfoContainer}>
                <Box className={classes.title}>
                  {loadingBook ? <div><Skeleton variant={'text'}/><Skeleton variant={'text'}/></div> : book?.name}
                </Box>
                <Box fontWeight="fontWeightLight" fontSize="subtitle.fontSize">
                  {loadingBook ? <Skeleton variant={'text'}/> : series?.name}
                </Box>


                <div className={classes.authorAndTimeContainer}>
                  {author && <Box
                    fontWeight="fontWeightMedium"
                    fontSize="subtitle.fontSize"
                  >
                    {author?.name}
                  </Box>}

                  {book?.created_at &&
                  <Box
                    color="primary"
                    fontWeight="fontWeightLight"
                    fontSize="subtitle2.fontSize"
                    className={classes.createdTime}
                  >
                    {moment(book?.created_at).format('YYYY-MM-DD')}
                  </Box>
                  }

                </div>
                {theme &&
                <Box
                  color="primary"
                  fontWeight="fontWeightLight"
                  fontSize="subtitle.fontSize"
                  className={classes.theme}
                >
                  {theme?.name}
                </Box>
                }

                <div className={classes.headerAction}>
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation={true}
                    onClick={onAddToCollectionButton}
                    className={classes.addToCollectionButton}
                  >加入收藏
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation={true}
                    onClick={onReadButtonClick}
                  >开始阅读
                  </Button>
                </div>
              </div>
            </div>
            <div className={classes.tagsArea}>
              <Box color="primary" fontWeight="fontWeightRegular" fontSize="h6.fontSize" className={classes.theme}>
                标签
              </Box>
              <div className={classes.tagContainer}>
                {renderTags()}
              </div>
            </div>

            <Divider className={classes.divider}/>
            <div className={classes.authorArea}>
              <Box color="primary" fontWeight="fontWeightRegular" fontSize="h6.fontSize" className={classes.theme}>
                作者其他作品
              </Box>
              <div className={classes.authorContainer}>
                <Grid container={true} spacing={4}>
                  {renderRelateAuthorBook()}
                </Grid>
              </div>
            </div>
          </Paper>
        </div>
        <div className={classes.right}>
          <div className={classes.sideContainer}>
            <SideBooks
              onSeeMoreClick={onSeeMoreThemeClick}
              title={'相同主题'}
              tag={theme}
              books={getSameThemeBookList()}
              loading={getBooleanWithDefault(loading.effects['bookDetail/queryRelateTheme'], true)}
            />
          </div>
          <div className={classes.sideContainer}>
            <SideBooks
              onSeeMoreClick={onSeeMoreSeriesClick}
              title={'相同系列'}
              tag={series}
              books={getSameSeriesBookList()}
              loading={getBooleanWithDefault(loading.effects['bookDetail/queryRelateSeries'], true)}
            />
          </div>
        </div>
      </div>
    );
  }

}

export default connect(({ bookDetail, user, loading }: ConnectType) => ({
  bookDetail,
  user,
  loading,
}))(withWidth()(BookDetailPage));
