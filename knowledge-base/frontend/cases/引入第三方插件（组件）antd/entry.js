/**
 * 第三方插件（组件引入）
 * 
 */
import React from 'react';
import { regOvComponent } from '@weapp/utils';
import { asyncImport } from '@weapp/ecodesdk';
import loadjs from 'loadjs';

const NewButton = React.lazy(() => asyncImport('${appId}', 'NewButton'));

regOvComponent('weappUi', 'Button', (Com) => {
  return React.forwardRef((props, ref) => {
    const {weId} = props;
    if(weId && weId.endsWith('_rrt9fb')){
      return (
        <React.Suspense fallback={() => {}}>
          <NewButton {...props} ref={ref} OriginCom={Com} />
        </React.Suspense>
      )
    }
    return <Com {...props} ref={ref}/>
  });
}, 0)

//加载第三方插件${appRes}/entry.js ${appRes}/entry.js /ecodestatic/release/resources/986493356089450500/entry.js

// 选中 resources/vue.js 右键，可以复制资源地址
// 这里也可以使用cdn的地址，只要网络无障碍
// loadjs(['/api/ecode/resource/view/987396226823356434/jquery.min.js'], {
//     success: () => {
//       console.log(window.jquery)
//     }
// })
//在组件中使用，使用antd的Button组件，用上面组件替换示例来实现。