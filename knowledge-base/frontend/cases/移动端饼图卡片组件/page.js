




import React from 'react';
import PieCard from './index';
import { setTitle } from '@weapp/utils';
import { Icon } from '@weapp/ui';


class Page extends React.Component {

  componentDidMount() {
    setTitle({
      title: '移动端饼图卡片组件'
    })
  }

  render() {  
    return <div style={{ padding: 12 }}>
      <PieCard
        datas={[200, 300, 408, 114]}
        unit="万千瓦时"
        names={['民用供热', '工业供热', '民用与工业', '20万级以下']}
        title="火电供热装机容量"
      />
    </div>
  }

}


export default Page;
