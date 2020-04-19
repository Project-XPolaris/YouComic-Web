import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect, Dispatch } from 'dva';
import { ConnectType } from '@/global/connect';
import { ReadPageModelStateType } from '@/pages/book/read/model';
import { Page } from '@/services/page';
import { Fab, Grow, IconButton, isWidthDown, Slide, Slider, Tooltip, withWidth, Zoom } from '@material-ui/core';
import { LayoutModelStateType } from '@/models/layout';
import { Element, scroller } from 'react-scroll';
import ImageLoader from '@/components/ImageLoader';
import ReadMobilePage from '@/pages/book/read/mobile';
import MenuIcon from '@material-ui/icons/Menu';
import QuickPageJumpIcon from '@material-ui/icons/LowPriority';

const useStyles = makeStyles(theme => ({
  main: {
    backgroundColor: '#2a2a2a',
    paddingTop: theme.spacing(20),
    [theme.breakpoints.only('lg')]: {
      paddingLeft: 72,
      paddingRight: 72,
    },
    [theme.breakpoints.only('xl')]: {
      paddingLeft: theme.spacing(55),
      paddingRight: theme.spacing(55),
    },
    paddingBottom: 48,
    minHeight: '100vh',
  },
  mainExpand: {
    paddingTop: theme.spacing(20),
    backgroundColor: '#2a2a2a',
    [theme.breakpoints.only('lg')]: {
      paddingLeft: 72,
      paddingRight: 72,
    },
    [theme.breakpoints.only('xl')]: {
      transition: theme.transitions.create('padding', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      paddingLeft: theme.spacing(55),
      paddingRight: theme.spacing(55),
    },
    paddingBottom: 48,
    minHeight: '100vh',
  },
  pageImg: {
    width: '100%',
    marginBottom: 8,
  },
  grow: {
    flexGrow: 1,
  },

  pageStatus: {
    position: 'fixed',
    bottom: 0,
    background: '#00000055',
    padding: 16,
    color: '#FFF',
  },
  fab: { position: 'fixed', bottom: 16, right: 16 },
  pageJumper: {
    position: 'fixed',
    top: '10%',
    right: '3%',
    background: '#00000055',
    padding: 16,
    color: '#FFF',
    height: 180,
    display: 'flex',
  },
  pageJumperPreviewImage: {
    height: 180,
  },
  actionButton: {},
}));

interface ReadPagePropsType {
  dispatch: Dispatch,
  bookRead: ReadPageModelStateType
  layout: LayoutModelStateType
  width: any
}

function ReadPage({ dispatch, bookRead, layout: { appBarHide, isDrawerOpen }, width }: ReadPagePropsType) {
  const classes = useStyles();
  const { pages, count } = bookRead;
  // bottom bar show
  const [isBottomBarShow, setIsBottomBarShow] = useState(false);
  const [currentVisiblePage, setCurrentVisiblePage] = useState(1);
  const [pageScrollBarValue, setPageScrollBarValue] = useState(1);
  const [showPageScrollBar, setShowPageScrollBar] = useState(false);
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
      if (isBottomBarShow) {
        setIsBottomBarShow(false);
      }
      if (currentVisiblePage !== minIdx) {
        setCurrentVisiblePage(minIdx);
        setPageScrollBarValue(minIdx);
      }
    };
    window.addEventListener('scroll', handleScroll);
  });

  // page quick jump
  const renderPages = () => {
    if (pages) {
      return pages.map((page: Page, idx: number) => (
        <Element
          name={`page_${idx + 1}`}
          key={page.id}
        >
          <Grow in={true}>
            <div ref={(el: any) => {
              if (!el) return;
              if (!pageMapping.has(idx + 1)) {
                pageMapping.set(idx + 1, el);
              }
            }}>
              <ImageLoader
                url={page.path}
                className={classes.pageImg}
                alt={`page ${idx + 1}`}
              />
            </div>
          </Grow>
        </Element>
      ));
    } else {
      return undefined;
    }
  };
  const handlePageSliderChange = (event: any, newValue: any) => {
    scroller.scrollTo(`page_${count - newValue}`, {
      duration: 1,
      smooth: true,
    });
  };
  const onSliderChange = (e: any, value: any) => {
    setPageScrollBarValue(value);
  };
  if (isWidthDown('md', width)) {
    return <ReadMobilePage/>;
  }

  function valuetext(value) {
    return `${count - value}`;
  }

  return (
    <React.Fragment>
      <div style={{ position: 'relative' }}>
        <div
          className={isDrawerOpen ? classes.mainExpand : classes.main}
        >
          {renderPages()}
        </div>
        <Zoom in={!isBottomBarShow}>
          <Fab
            aria-label="like"
            color="primary"
            className={classes.fab}
            onClick={() => {
              setIsBottomBarShow(true);
              setShowPageScrollBar(false);
            }}
          >
            <MenuIcon/>
          </Fab>
        </Zoom>
        <Slide direction="up" in={!isBottomBarShow} mountOnEnter={true} unmountOnExit={true}>
          <div
            className={classes.pageStatus}
          >
            第{currentVisiblePage}页，共{bookRead.count}页
          </div>
        </Slide>

        <Slide direction="up" in={isBottomBarShow} mountOnEnter={true} unmountOnExit={true}>
          <div
            style={{
              height: 64,
              width: '100%',
              backgroundColor: '#FFF',
              position: 'fixed',
              bottom: 0,
              paddingLeft: 32,
              paddingRight: 32,
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'center',
              background: '#00000055',
            }}
          >
            <IconButton style={{ color: '#FFF' }} onClick={() => setShowPageScrollBar(true)}>
              <Tooltip title={'快速跳转'}>
                <QuickPageJumpIcon/>
              </Tooltip>
            </IconButton>

          </div>
        </Slide>
        {
          bookRead.pages !== undefined && showPageScrollBar && isBottomBarShow &&
          <Slide direction="left" in={true} mountOnEnter={true} unmountOnExit={true}>
            <div className={classes.pageJumper}>
              <Slider
                orientation="vertical"
                min={1}
                max={count}
                defaultValue={count - currentVisiblePage}
                track={false}
                step={1}
                valueLabelDisplay={'auto'}
                valueLabelFormat={valuetext}
                onChangeCommitted={handlePageSliderChange}
                marks={true}
              />
            </div>
          </Slide>
        }
      </div>
    </React.Fragment>
  );
}

export default connect(({ bookRead, layout }: ConnectType) => ({ bookRead, layout }))(withWidth()(ReadPage));
