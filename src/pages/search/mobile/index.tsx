import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect, Dispatch } from 'dva';
import { ConnectType } from '@/global/connect';
import BookCollection from '@/layouts/components/BookCollection';
import BookRowCollection from '@/pages/home/components/BookRowCollection';
import { SearchModelStateType } from '@/pages/search/model';
import BookHorizonCollection from '@/pages/home/mobile/BookHorizonCollection';
import MobileRow from '@/components/MobileRow';
import MobileChipCollection from '@/components/MobileChipCollection';
import AuthorIcon from '@material-ui/icons/Person';
import SeriesIcon from '@material-ui/icons/Book';
import ThemeIcon from '@material-ui/icons/Star';
import { router } from 'umi';
import { isWidthDown } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  main: {
    paddingTop: theme.spacing(10),
    minHeight: '100vh',
  },
  row: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
}));

interface SearchMobilePagePropsType {
  dispatch: Dispatch,
  search: SearchModelStateType
}

function SearchMobilePage({ dispatch, search }: SearchMobilePagePropsType) {
  const classes = useStyles();
  const { summaryBooks, summaryCollections } = search;
  const onShowMoreBook = () => {
    router.push(`/search/${search.searchKey}/books`);
  };
  return (
    <div className={classes.main}>
      {
        summaryBooks && summaryBooks.length > 0 &&
        <div className={classes.row}>
          <BookHorizonCollection
            title={'相关书籍'}
            books={summaryBooks}
            onMore={onShowMoreBook}
          />
        </div>
      }
      {
        search.summaryTags.artist && search.summaryTags.artist.length > 0 &&
        <div className={classes.row}>
          <MobileRow title={'相关作者'}>
            <MobileChipCollection
              chips={
                search.summaryTags.artist?.map(tag => {
                  return {
                    text: tag.name,
                    onChipClick: () => router.push(`/tag/${tag.id}`),
                    color: 'primary',
                    icon: <AuthorIcon/>,
                  };
                })
              }
            />
          </MobileRow>
        </div>
      }
      {
        search.summaryTags.series && search.summaryTags.series.length > 0 &&
        <div className={classes.row}>
          <MobileRow title={'相关系列'}>
            <MobileChipCollection
              chips={
                search.summaryTags.series?.map(tag => {
                  return {
                    text: tag.name,
                    onChipClick: () => router.push(`/tag/${tag.id}`),
                    color: 'primary',
                    icon: <SeriesIcon/>,
                  };
                })
              }
            />
          </MobileRow>
        </div>
      }
      {
        search.summaryTags.theme && search.summaryTags.theme.length > 0 &&
        <div className={classes.row}>
          <MobileRow title={'相关主题'}>
            <MobileChipCollection
              chips={
                search.summaryTags.theme?.map(tag => {
                  return {
                    text: tag.name,
                    onChipClick: () => router.push(`/tag/${tag.id}`),
                    color: 'primary',
                    icon: <ThemeIcon/>,
                  };
                })
              }
            />
          </MobileRow>
        </div>
      }
    </div>
  );
}

export default connect(({ layout, search }: ConnectType) => ({ layout, search }))(SearchMobilePage);
