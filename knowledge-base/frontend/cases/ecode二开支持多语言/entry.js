import {getLabel,getLocale} from '@weapp/utils';
import React from 'react';
import { Route } from 'react-router-dom';
import { regOvProps, appInfo, regReactChildren } from '@weapp/utils';
import { asyncImport } from '@weapp/ecodesdk';

//具体说明，详见案例内文档

//情况1：当前渲染的组件或者对应的模块有对应的多语言时，可以直接使用多语言
// cb()

//情况2：当前渲染的组件或者对应的模块有对应的多语言时，如ecode单页，或者未加载的模块时，需要手动加载多语言
// getLocale('@weapp/ecode').then(() => {
//   cb();
// })


const SinglePage = React.lazy(() => {
  return new Promise(async resolve=>{
    await getLocale("@weapp/ecode") //在加载对应模块多语言后去渲染组件
    let reuslt = await asyncImport('${appId}', 'Page');
    resolve(reuslt);
  })
});

const { publicUrl } = appInfo('@weapp/ecodesdk');

const todo = (
  <Route path={[`${publicUrl}/sp/custom/` + '${appId}/singlePage',`${publicUrl}/mobile/custom/` + '${appId}/singlePage']}>
    <React.Suspense fallback= {() => { }}>
      <SinglePage />
    </React.Suspense>
  </Route>
);

regOvProps('weappEcodesdk', 'Switch', (props) => {
  regReactChildren(props, todo);
  return props;
}, 0);