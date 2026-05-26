

import React from 'react';


export default class MiddleBar extends React.Component {

  prefixCls = 'ecode-report-page-middle-bar'

  render() {

    return <div className={this.prefixCls}>
      <div className={`${this.prefixCls}-item`}>
        <div className={`${this.prefixCls}-num`}>342.34</div>
        <div className={`${this.prefixCls}-unit`}>万元</div>
        <div className={`${this.prefixCls}-cate`}>品类名称</div>
        <div className={`${this.prefixCls}-rate`}>环比 +24%</div>
      </div>
      <div className={`${this.prefixCls}-item`}>
        <div className={`${this.prefixCls}-num`}>342.34</div>
        <div className={`${this.prefixCls}-unit`}>万元</div>
        <div className={`${this.prefixCls}-cate`}>品类名称</div>
        <div className={`${this.prefixCls}-rate`}>环比 +24%</div>
      </div>
      <div className={`${this.prefixCls}-item`}>
        <div className={`${this.prefixCls}-num`}>142.34</div>
        <div className={`${this.prefixCls}-unit`}>万元</div>
        <div className={`${this.prefixCls}-cate`}>品类名称</div>
        <div className={`${this.prefixCls}-rate`}>环比 +24%</div>
      </div>
      <div className={`${this.prefixCls}-item`}>
        <div className={`${this.prefixCls}-num`}>123.4</div>
        <div className={`${this.prefixCls}-unit`}>万元</div>
        <div className={`${this.prefixCls}-cate`}>品类名称</div>
        <div className={`${this.prefixCls}-rate`}>环比 +24%</div>
      </div>
      <div className={`${this.prefixCls}-item`}>
        <div className={`${this.prefixCls}-num`}>45.34</div>
        <div className={`${this.prefixCls}-unit`}>万元</div>
        <div className={`${this.prefixCls}-cate`}>品类名称</div>
        <div className={`${this.prefixCls}-rate`}>环比 +24%</div>
      </div>
    </div>

  }

}
