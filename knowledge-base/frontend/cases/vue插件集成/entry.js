import React from 'react';
import { asyncImport } from '@weapp/ecodesdk';
import { Route } from 'react-router-dom';
import { regOvComponent,regOvProps, appInfo, regReactChildren } from '@weapp/utils';

/**
 * 在流程全部流程提交申请按钮前追加一个Element Button
 */
const NewButton = React.lazy(() => asyncImport('${appId}', 'VueButton'));

regOvComponent('weappUi', 'Button', (Com) => {
  return React.forwardRef((props, ref) => {
    const {weId} = props;
    if(weId && weId.endsWith('_hvf5bo@newFlow_rrt9fb')){
      return (
        <React.Suspense fallback={() => {}}>
          <NewButton {...props} ref={ref} OriginCom={Com} />
        </React.Suspense>
      )
    }
    return <Com {...props} ref={ref}/>
  });
}, 0)


/**
 * 新页面开发：vue
 */

const VuePage = React.lazy(() => asyncImport('${appId}', 'VuePage'));

const { publicUrl } = appInfo('@weapp/ecodesdk');

const vuePageRoute = (
  <Route path={`${publicUrl}/sp/custom/` + '${appId}/vue'}>
    <React.Suspense fallback= {() => { }}>
      <VuePage />
    </React.Suspense>
  </Route>
);

regOvProps('weappEcodesdk', 'Switch', (props) => {
  console.log('props', props, regReactChildren);
  regReactChildren(props, vuePageRoute);
  return props;
}, 0);