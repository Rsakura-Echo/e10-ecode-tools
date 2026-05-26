




import React from 'react';
import ProgressBarCard from './index';
import { setTitle } from '@weapp/utils';
import { Icon } from '@weapp/ui';


class Page extends React.Component {

  componentDidMount() {
    setTitle({
      title: '完成度看板组件'
    })
  }

  render() {

    const subItems = [
      { name: '年计划', value: '2000', unit: '万千瓦时', valueStyle: { color: '#F0D412', fontSize: 20, fontWeight: 'bold' } },
      { name: '日累计', value: '1600', unit: '万千瓦时', valueStyle: { color: '#F0D412', fontSize: 20, fontWeight: 'bold' } },
      { name: '滞后', value: '20%', unit: '万千瓦时', valueStyle: { color: '#F0D412', fontSize: 20, fontWeight: 'bold' } }
    ]

    return <div style={{ padding: 12 }}>
      <ProgressBarCard
        title={"火电完成情况"}
        datas={[
          { id: '1', content: '日', progress: 80,  subItems },
          { id: '2', content: '月', progress: 70,  subItems },
          { id: '3', content: '年', progress: 60,  subItems }
        ]}
      />
    </div>
  }

}


export default Page;
