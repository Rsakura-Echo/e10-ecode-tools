




import React from 'react';
import CurveGraphCard from './index';
import { setTitle } from '@weapp/utils';
import { Icon } from '@weapp/ui';


class Page extends React.Component {

  componentDidMount() {
    setTitle({
      title: '曲线图数据报表卡片组件'
    })
  }

  render() {
    // const { label, value, renderLeft,renderRight, itemStyle, valueStyle } = x;
    return <div style={{ padding: 12 }}>
      <CurveGraphCard
        names={['昨日', '今日']}
        datas={[
          [10, 20,30,40,50,60,10],
          [80, 20,30,40,50,60,30]
        ]}
        title="发电功率"
      />
    </div>
  }

}


export default Page;
