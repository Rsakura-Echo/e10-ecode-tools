
import { regOvProps } from '@weapp/utils';
import { asyncImport } from '@weapp/ecodesdk';
import React from 'react';
import ReactDOM from 'react-dom';

const IconAsync = React.lazy(() => asyncImport('${appId}', 'index'));
const Icon = React.forwardRef((props, ref) => {
  return <React.Suspense fallback={() => {}}>
    <IconAsync />
  </React.Suspense>
})

const execCode = () => {
  // 获取所有的组件标题dom, 这里是普通卡片组件的标题
  const titleDoms = document.querySelectorAll('.ebcom .header');
  titleDoms.forEach(function(item) {
    
    const title = item.querySelector('.ebcom-title');
    if (title) {
      const iconDom = document.createElement('div');
      iconDom.setAttribute('class', 'icon-cls-div');
      item.insertBefore(iconDom, title);
      ReactDOM.render(<Icon title={title.innerText} />, iconDom)
    }
  });
}
let execTimes = 0;
// 自定义页面，卡片组件标题增加logo
regOvProps('weappEBpage', 'PageView', (props) => {
  if (769264166432301174 == props.pageId && execTimes++ === 0) {
    let times = 0;
    const interval = setInterval(() => {
      times++;
      const dom = document.querySelector('#ebpage_769264166432301174');
      const domComList = document.querySelectorAll('#ebpage_769264166432301174 .ebcom .header .ebcom-title');
      if ('ebuilderSDK' in window && dom && domComList.length > 0) {
        clearInterval(interval);
        // 执行业务逻辑
        execCode();
      }
      if (times++ > 50) { //超过20次 自动停止
        console.error('${appId} 超时结束 未触发');
        clearInterval(interval);
      }
    }, 100);
  }
  return props;
}, 0);

