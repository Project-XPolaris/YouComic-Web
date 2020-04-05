import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect, Dispatch } from 'dva';
import { ConnectType } from '@/global/connect';
import { ReadPageModelStateType } from '@/pages/book/read/model';
import { Page } from '@/services/page';
import { AppBar, Divider, IconButton, Slide, Slider, Toolbar } from '@material-ui/core';
import JumpPageActionIcon from '@material-ui/icons/LowPriority';
import { LayoutModelStateType } from '@/models/layout';
import StatusBar from '@/pages/book/read/components/StatusBar';
import { Element, scroller } from 'react-scroll';
import { useDoubleTap } from '@/util/click';

const useStyles = makeStyles({
  main: {
    backgroundColor:"#EEE"
  },
  pageImg: {
    width: '100%',
    marginBottom:8
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  statusBarWrap: {
    top: 'auto',
    bottom: 0,
    position: 'fixed',
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  bottomAction: {
    height: 65,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingLeft: 16,
    paddingRight: 16,
  },
});

interface ReadPagePropsType {
  dispatch: Dispatch,
  bookRead: ReadPageModelStateType
  layout: LayoutModelStateType
}

function ReadPage({ dispatch, bookRead, layout:{appBarHide} }: ReadPagePropsType) {
  const classes = useStyles();
  const { pages, count } = bookRead;
  // bottom bar show
  const [isBottomBarShow, setIsBottomBarShow] = useState(false);
  const [currentVisiblePage, setCurrentVisiblePage] = useState(1);
  const [pageScrollBarValue, setPageScrollBarValue] = useState(1);
  const pageMapping = new Map();
  useEffect(() => {
    const handleScroll = () => {
      //check position
      //minus top value is current page on screen
      let minIdx = 0;
      let minTop = 99999999;
      for (let entry of pageMapping.entries()) {
        const [idx, el] = entry;
        const size = el.getBoundingClientRect().top;
        if (Math.abs(size) < minTop) {
          minTop = Math.abs(size);
          minIdx = idx;
        }
      }
      if (currentVisiblePage !== minIdx) {
        setCurrentVisiblePage(minIdx);
        setPageScrollBarValue(minIdx);
      }
    };
    window.addEventListener('scroll', handleScroll);
    if (!isBottomBarShow !== appBarHide){
      dispatch({
        type: 'layout/setAppBarHide',
        payload: {
          isHide: !isBottomBarShow,
        },
      });
    }


  });

  const bind = useDoubleTap((event) => {
    // Your action here
    setIsBottomBarShow(!isBottomBarShow);
    dispatch({
      type: 'layout/setAppBarHide',
      payload: {
        isHide: isBottomBarShow,
      },
    });
  });
  // page quick jump
  const renderPages = () => {
    if (pages) {
      return pages.map((page: Page, idx: number) => (
        <Element
          name={`page_${idx + 1}`}
          key={page.id}
        >
          <img
            src={page.path}
            {...bind}

            className={classes.pageImg}
            alt={`page ${idx + 1}`}
            ref={el => {
              if (!el) return;
              if (!pageMapping.has(idx + 1)) {
                pageMapping.set(idx + 1, el);
              }
            }}
          />
        </Element>
      ));
    } else {
      return undefined;
    }
  };
  const handlePageSliderChange = (event: any, newValue: any) => {
    scroller.scrollTo(`page_${newValue}`, {
      duration: 1,
      smooth: true,
    });
  };
  const onSliderChange = (e: any, value: any) => {
    setPageScrollBarValue(value);
  };
  return (
    <React.Fragment>
      <div
        className={classes.main}

      >
        {renderPages()}
      </div>
      <Slide direction="up" in={isBottomBarShow}>
        <AppBar position="fixed" color="primary" className={classes.appBar}>
          <div className={classes.bottomAction}>
            <Slider
              defaultValue={1}
              max={pages ? pages.length : 0}
              valueLabelDisplay="auto"
              value={pageScrollBarValue}
              onChange={onSliderChange}
              onChangeCommitted={handlePageSliderChange}
            />
          </div>
          <Toolbar>
            <IconButton edge="start" color="inherit">
              <JumpPageActionIcon/>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Slide>
      <div className={classes.statusBarWrap}>
        <StatusBar currentPage={currentVisiblePage} totalPage={count}/>
      </div>
    </React.Fragment>
  );
}

export default connect(({ bookRead, layout }: ConnectType) => ({ bookRead, layout }))(ReadPage);
