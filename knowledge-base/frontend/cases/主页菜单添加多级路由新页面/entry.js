

import { asyncImport } from '@weapp/ecodesdk';
import { regOvProps, regReactChildren, appInfo } from '@weapp/utils';
import { Route } from 'react-router-dom';

const { publicUrl } = appInfo('@weapp/ecodesdk');

const Index = React.lazy(() => {
  return asyncImport('${appId}', 'index.js');
});

const A = React.lazy(() => {
  return asyncImport('${appId}', 'pages/a.js');
});

const B = React.lazy(() => {
  return asyncImport('${appId}', 'pages/b.js');
});
// 注册到门户的左侧树菜单中

const IndexCom = () => {
  return <React.Suspense fallback={() => {}}>
    <Index/>
  </React.Suspense>
}

const ACom = () => {
  return <React.Suspense fallback={() => {}}>
    <A/>
  </React.Suspense>
}

const BCom = () => {
  return <React.Suspense fallback={() => {}}>
    <B/>
  </React.Suspense>
}
const routeContentX = <Route path="/portal/ecode/index" component={IndexCom} />;
const routeContentA = <Route path="/portal/ecode/a" component={ACom} />;
const routeContentB = <Route path="/portal/ecode/b" component={BCom} />;

const registerSPARoute = (props, route) => {
  if (!props.children) {
    props.children = [route];
  } else if (React.Children.count(props.children) === 1) {
    props.children = [route, props.children];
  } else {
    props.children.unshift(route);
  }
}

// 复写门户下的moduleRouteContnet
regOvProps('weappLayout', 'ModuleRouteContent', props => {
  if (props.weId === 'd9sm55') {
    registerSPARoute(props, routeContentX);
    registerSPARoute(props, routeContentA);
    registerSPARoute(props, routeContentB);
  }
  return props;
});

// 添加菜单
function addMenus(menus) {
  return menus.concat([{
    id: 'ecodeindex',
    content: "index",
    moduleId: "portal",
    path: "/portal/ecode/index",
    children: [
      {
        id: 'ecodeindexa',
        content: "indexa",
        moduleId: "portal",
        path: "/portal/ecode/a",
      },
      {
        id: 'ecodeindexb',
        content: "indexb",
        moduleId: "portal",
        path: "/portal/ecode/b",
      }
    ]
  }]);
}
regOvProps('weappLayout', 'Main', (props) => {
  // 目前门户下可以复写主体内容的子集插入动态路由进去
  // console.info(props);
  if (typeof props.beforeUpdateAsideMenus === 'function') {
    const beforeUpdateAsideMenus = props.beforeUpdateAsideMenus;
    props.beforeUpdateAsideMenus = (menus) => beforeUpdateAsideMenus(addMenus(menus));
  } else {
    props.beforeUpdateAsideMenus = addMenus;
  }
  return props;
}, 0);
