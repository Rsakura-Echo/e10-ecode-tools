
import React from 'react';
import { Carousel } from '@weapp/ui';

const prefixCls = 'ecode-com-carousel-bg';

export default class EcodeCom extends React.Component {

  render() {

    return <div>
      <Carousel
        fillWays="imgFill"
        navigation={true}
        speed={2000}
        pagination={{ type: 'bullets' }}
      >
        <div className={prefixCls} >1</div>
        <div className={prefixCls} >2</div>
        <div className={prefixCls} >3</div>
        <div className={prefixCls} >4</div>
      </Carousel>
    </div>

  }

}

