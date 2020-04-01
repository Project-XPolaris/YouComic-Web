import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect, Dispatch } from 'dva';
import { ConnectType } from '@/global/connect';
import { ReadPageModelStateType } from '@/pages/book/read/model';
import { Page } from '@/services/page';
import { AppBar, IconButton, Slide, Slider, Toolbar } from '@material-ui/core';
import { debounce } from 'lodash';
import { Element, scroller } from 'react-scroll';
import JumpPageActionIcon from '@material-ui/icons/LowPriority';

const useStyles = makeStyles({
  main: {},
  pageImg: {
    width: '100%',
  },
  appBar: {
    top: 'auto',
    bottom: 0,
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
}

function ReadPage({ dispatch, bookRead }: ReadPagePropsType) {
  const classes = useStyles();
  const { pages } = bookRead;
  // bottom bar show
  let previousPosition = 0;
  const [isBottomBarShow, setIsBottomBarShow] = useState(true);
  const [currentVisiblePage,setCurrentVisiblePage] = useState(1)
  const [pageScrollBarValue,setPageScrollBarValue] = useState(1)
  const pageMapping = new Map()
  useEffect(() => {
    const handleScroll = debounce(() => {
      const currentScrollPos = window.pageYOffset;
      if (currentScrollPos - previousPosition < -10 && !isBottomBarShow) {
        setIsBottomBarShow(true);
      } else if (currentScrollPos - previousPosition > 10 && isBottomBarShow) {
        setIsBottomBarShow(false);
      }
      previousPosition = currentScrollPos;

      //check position
      //minus top value is current page on screen
      let minIdx = 0
      let minTop = 99999999
      for (let entry of pageMapping.entries()) {
        const [idx,el] = entry
        const size = el.getBoundingClientRect().top
        if (Math.abs(size) < minTop){
          minTop = Math.abs(size)
          minIdx = idx
        }
      }
      if (currentVisiblePage !== minIdx){
        setCurrentVisiblePage(minIdx)
        setPageScrollBarValue(minIdx)
      }
    }, 100);
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
          <img
            src={page.path}
            className={classes.pageImg}
            ref={el => {
              if (!el) return;
              if (!pageMapping.has(idx)){
                pageMapping.set(idx + 1,el)
              }
            }}
          />
        </Element>
      ));
    } else {
      return undefined;
    }
  };
  const handlePageSliderChange = (event, newValue) => {
    scroller.scrollTo(`page_${newValue}`, {
      duration: 1000,
      smooth: true,
    });
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
              onChange={(e,value) => setPageScrollBarValue(value)}
              onChangeCommitted={handlePageSliderChange}
            />
          </div>
          <Toolbar>
            <IconButton edge="start" color="inherit" >
              <JumpPageActionIcon/>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Slide>
    </React.Fragment>
  );
}

export default connect(({ bookRead }: ConnectType) => ({ bookRead }))(ReadPage);
