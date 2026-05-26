


import React from 'react';
import { Layout, CorsComponent, Button } from '@weapp/ui';

import TopBg from './bgcoms/top-bg';
import LeftTopBg from './bgcoms/left-top-bg';
import LeftGraph from './bgcoms/left-graph';
import LeftNum from './bgcoms/left-num';
import LeftBottomGraph from './bgcoms/left-bottom-graph';

import MiddleTop from './bgcoms/middle-top';
import MiddleBar from './bgcoms/middle-bar';
import MiddleGraph from './bgcoms/middle-graph';

import RightGraph from './bgcoms/right-graph';

class Page extends React.Component {

  
  prefixCls = 'ecode-report-page'

  constructor(props) {
    super(props);
    this.state = {
      
    }
  }



  render() {

    const { value } = this.state;


    return <div className={this.prefixCls}>
      <div className={`${this.prefixCls}-top`}>
        <TopBg />
      </div>
      <div className={`${this.prefixCls}-content`}>
        <div className={`${this.prefixCls}-left`}>
          <LeftTopBg/>
          <LeftGraph/>
          <LeftNum />
          <LeftBottomGraph />
        </div>
        <div className={`${this.prefixCls}-middle`}>
          <MiddleTop />
          <MiddleBar />
          <MiddleGraph />
        </div>
        <div className={`${this.prefixCls}-right`}>
          <RightGraph />
        </div>
      </div>
    </div>
  }
}


export default Page;