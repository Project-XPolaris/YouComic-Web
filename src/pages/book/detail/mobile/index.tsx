import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect, Dispatch } from 'dva';
import { ConnectType } from '@/global/connect';
import { Button, Chip, Divider, Link, withWidth } from '@material-ui/core';
import { DetailModelStateType } from '@/pages/book/detail/model';
import { getBookTagInfo } from '@/util/book';
import { Tag } from '@/services/tag';
import router from 'umi/router';
import TitleSection from '@/pages/book/detail/mobile/components/TitleSection/TitleSection';
import { Book } from '@/services/book';
import BookCollection from '@/pages/book/detail/mobile/components/BookCollection';
import moment from 'moment';
import AddToCollectionDialog from '@/pages/book/detail/mobile/components/AddToCollectionDialog';
import { UserStateType } from '@/models/user';
import SelectCollectionDialog from '@/pages/book/detail/components/SelectCollectionDialog';


const useStyles = makeStyles({
  main: {
    paddingTop: 64,
  },
  header: {
    display: 'flex',
    paddingTop: 15,
    paddingLeft: 15,
    paddingBottom: 16,
    paddingRight: 10,
  },
  headerRight: {
    width: '100%',
  },
  cover: {
    maxWidth: 100,
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 300,
    color: '#212121',

  },
  author: {
    fontSize: 13,
    fontWeight: 400,
    marginRight: 15,
  },
  createTime: {
    fontSize: 13,
    fontWeight: 400,
    color: '#616161',
  },
  series: {
    fontSize: 13,
    fontWeight: 400,
    color: '#616161',

  },
  textLink: {
    color: '#616161',
  },
  content: {
    backgroundColor: '#FFF',
  },
  action: {
    display: 'flex',
    paddingLeft: 15,

  },
  actionButton: {
    marginRight: 12,
  },
  tagsContainer: {
    paddingLeft: 15,
  },
  tagsContent: {
    marginTop: 12,
  },
  tagsTitle: {
    fontSize: 22,
    fontWeight: 300,
    color: '#333',
  },
  divider: {
    marginTop: 28,
    marginBottom: 28,
  },
  bookTag: {
    marginRight: 16,
    marginBottom: 12,
  },
});

interface BookDetailMobilePropsType {
  dispatch: Dispatch,
  width: any,
  bookDetail: DetailModelStateType
  user:UserStateType
}

function BookDetailMobile({ dispatch, bookDetail: { book, tags, tagBooks,isSelectCollectionDialogOpen },user:{ownCollections} }: BookDetailMobilePropsType) {
  const classes = useStyles();
  const [addToCollectionActive, setAddToCollectionActive] = useState(false);
  const { series, author, theme } = getBookTagInfo(book);
  const renderTags = () => {
    if (tags) {
      return tags.map((tag: Tag) => {
        const onTagClick = () => {
          router.push(`/tag/${tag.id}`);
        };
        return (
          <Chip className={classes.bookTag} label={tag.name} onClick={onTagClick}/>
        );
      });

    } else {
      return undefined;
    }
  };
  const getSameSeriesBookList = () => {
    if (!series) {
      return [];
    }
    if (series.id in tagBooks) {
      return tagBooks[series.id].filter((seriesBook: Book) => seriesBook.id !== book?.id);
    } else {
      return [];
    }
  };
  const seriesBooks = getSameSeriesBookList();

  const getSameThemeBookList = () => {
    if (!theme) {
      return [];
    }
    if (theme.id in tagBooks) {
      return tagBooks[theme.id].filter((themeBook: Book) => themeBook.id !== book?.id);
    } else {
      return [];
    }
  };
  const themeBooks = getSameThemeBookList();

  const getSameAuthorBookList = () => {
    if (!author) {
      return [];
    }
    if (author.id in tagBooks) {
      return tagBooks[author.id].filter((authorBook: Book) => authorBook.id !== book?.id);
    } else {
      return [];
    }
  };
  const authorBooks = getSameAuthorBookList();
  const onAddToCollectionButton = () => {
      dispatch({
        type: 'bookDetail/setSelectCollectionOpen',
        payload: {
          open: true,
        },
      });
  }
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
  const onReadButtonClick = () => {
    if (book) {
      router.push(`/book/${book.id}/read`);
    }
  };
  return (
    <div className={classes.main}>
      <SelectCollectionDialog
        isOpen={isSelectCollectionDialogOpen}
        onDialogClose={onAddToCollectionClose}
        collections={ownCollections}
        onOk={onSelectCollectionOK}
      />
      {
        book &&
        <div className={classes.content}>
          <div className={classes.header}>
            <img src={book.cover} className={classes.cover}/>
            <div className={classes.headerRight}>
              <div className={classes.title}>
                {book.name}
              </div>
              <div>
                {author &&
                <span className={classes.author}>
                  <Link href={`/tag/${author.id}`}>
                    {author.name}
                  </Link>
                </span>
                }

                <span className={classes.createTime}>
                  {moment(book.created_at).format('YYYY-MM-DD')}
                </span>
              </div>
              {series &&
              <div className={classes.series}>
                <Link href={`/tag/${series.id}`} className={classes.textLink}>
                  {series.name}
                </Link>
              </div>
              }

            </div>

          </div>
          <div className={classes.action}>
            <Button
              color={'primary'}
              variant="contained"
              disableElevation={true}
              className={classes.actionButton}
              onClick={onAddToCollectionButton}
            >
              加入收藏
            </Button>
            <Button color={'primary'} variant="contained" disableElevation={true} onClick={onReadButtonClick}>开始阅读</Button>
          </div>
          <Divider className={classes.divider}/>

          <TitleSection mainClasses={classes.tagsContainer} title={'标签'}>
            {renderTags()}
          </TitleSection>
          {
            authorBooks.length > 0 &&
            <>
              <Divider className={classes.divider}/>
              <TitleSection mainClasses={classes.tagsContainer} title={'作者的其他作品'} subtitle={author?.name}>
                <BookCollection books={authorBooks}/>
              </TitleSection>
            </>
          }
          {
            seriesBooks.length > 0 &&
            <>
              <Divider className={classes.divider}/>
              <TitleSection mainClasses={classes.tagsContainer} title={'相同系列'} subtitle={series?.name}>
                <BookCollection books={seriesBooks}/>
              </TitleSection>
            </>
          }
          {
            themeBooks.length > 0 &&
            <>
              <Divider className={classes.divider}/>
              <TitleSection mainClasses={classes.tagsContainer} title={'相同主题'} subtitle={theme?.name}>
                <BookCollection books={themeBooks}/>
              </TitleSection>
            </>
          }
        </div>
      }
    </div>
  );
}

export default connect(({ bookDetail, user }: ConnectType) => ({ bookDetail, user }))(withWidth()(BookDetailMobile));
