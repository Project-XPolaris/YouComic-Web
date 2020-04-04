import React, { useState } from 'react';
import { connect, Dispatch } from 'dva';
import { ConnectType } from '@/global/connect';
import { Box, Button, Chip, Divider, Grid, isWidthDown, Paper, withWidth, WithWidthProps } from '@material-ui/core';
import coverImage from '../../../assets/no-cover.png';
import BookDetailCard from '@/pages/book/detail/components/DetailBookCard';
import { DetailModelStateType } from '@/pages/book/detail/model';
import moment from 'moment';
import { Tag } from '@/services/tag';
import { Book } from '@/services/book';
import { getBookTagInfo } from '@/util/book';
import router from 'umi/router';
import SelectCollectionDialog from '@/pages/book/detail/components/SelectCollectionDialog';
import { UserStateType } from '@/models/user';
import SideBooks from '@/pages/book/detail/components/SideBooks';
import useStyles from '@/pages/book/detail/style';
import BookDetailMobile from '@/pages/book/detail/mobile';
import { ScrollToTopOnMount } from '@/util/scroll';


interface BookDetailPropsType {
  bookDetail: DetailModelStateType
  dispatch: Dispatch
  user: UserStateType
  width:any
}

function BookDetailPage({ bookDetail, dispatch, width, user }: BookDetailPropsType & WithWidthProps) {
  const classes = useStyles();
  const { book, tags, tagBooks, isSelectCollectionDialogOpen } = bookDetail;
  const { ownCollections } = user;
  const { series, author, theme } = getBookTagInfo(book);
  const renderTags = () => {
    if (tags) {
      return tags.map((tag: Tag) => {
        const onTagClick = () => {
          router.push(`/tag/${tag.id}`);
        };
        return (
          <Chip className={classes.bookTag} label={tag.name} onClick={onTagClick} key={tag.id}/>
        );
      });

    } else {
      return undefined;
    }
  };
  //query relate artist
  const [isFirstQueryAuthor, setIsFirstQueryAuthor] = useState(true);
  if (author && !(author.id in tagBooks) && isFirstQueryAuthor) {
    setIsFirstQueryAuthor(false);
    dispatch({
      type: 'bookDetail/queryTagBooks',
      payload: {
        page: 1,
        pageSize: 5,
        id: author.id,
      },
    });
  }
  const renderRelateAuthorBook = () => {
    if (author && author.id in tagBooks) {
      return tagBooks[author.id].map((book: Book) => {
        if (book.id === bookDetail.id) {
          return undefined;
        }
        const bookMeta = getBookTagInfo(book);
        return (
          <Grid item={true} xs={3} key={book.id}>
            <BookDetailCard
              title={book.name}
              cover={book.cover}
              author={{ text: bookMeta.author?.name, link: bookMeta.author ? `/tag/${bookMeta.author.id}` : undefined }}
              series={{ text: bookMeta.series?.name, link: bookMeta.series ? `/tag/${bookMeta.series.id}` : undefined }}
              theme={{ text: bookMeta.theme?.name, link: bookMeta.theme ? `/tag/${bookMeta.theme.id}` : undefined }}
              link={`/book/${book.id}`}
            />
          </Grid>);
      });
    } else {
      return undefined;
    }
  };
  const [isFirstQuerySeries, setIsFirstQuerySeries] = useState(true);
  if (series && !(series.id in tagBooks) && isFirstQuerySeries) {
    setIsFirstQuerySeries(false);
    dispatch({
      type: 'bookDetail/queryTagBooks',
      payload: {
        page: 1,
        pageSize: 5,
        id: series.id,
      },
    });
  }
  const [isFirstQueryTheme, setIsFirstQueryTheme] = useState(true);
  if (theme && !(theme.id in tagBooks) && isFirstQueryTheme) {
    setIsFirstQueryTheme(false);
    dispatch({
      type: 'bookDetail/queryTagBooks',
      payload: {
        page: 1,
        pageSize: 5,
        id: theme.id,
      },
    });
  }
  const onReadButtonClick = () => {
    if (book) {
      router.push(`/book/${book.id}/read`);
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
      router.push('/user/login');
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
      router.push(`/tag/${theme.id}`);
    }

  };
  const onSeeMoreSeriesClick = () => {
    if (series) {
      router.push(`/tag/${series.id}`);
    }

  };
  const getSameThemeBookList = () => {
    if (!theme) {
      return [];
    }
    if (theme.id in tagBooks) {
      return tagBooks[theme.id].filter((book: Book) => book.id !== bookDetail.id);
    } else {
      return [];
    }
  };
  const getSameSeriesBookList = () => {
    if (!series) {
      return [];
    }
    if (series.id in tagBooks) {
      return tagBooks[series.id].filter((book: Book) => book.id !== bookDetail.id);
    } else {
      return [];
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
                <img src={book?.cover || coverImage} className={classes.cover}/>
              </Box>
              <div className={classes.headerInfoContainer}>
                <Box className={classes.title}>
                  {book?.name || '未知'}
                </Box>
                <Box fontWeight="fontWeightLight" fontSize="subtitle.fontSize">
                  {series?.name || ''}
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
          {getSameThemeBookList().length !== 0 &&
          <SideBooks onSeeMoreClick={onSeeMoreThemeClick} title={'相同主题'} tag={theme} books={getSameThemeBookList()}/>}
          <SideBooks onSeeMoreClick={onSeeMoreSeriesClick} title={'相同系列'} tag={series} books={getSameSeriesBookList()}/>
        </div>
      </div>
    );
  }

}

export default connect(({ bookDetail, user }: ConnectType) => ({ bookDetail, user }))(withWidth()(BookDetailPage));
