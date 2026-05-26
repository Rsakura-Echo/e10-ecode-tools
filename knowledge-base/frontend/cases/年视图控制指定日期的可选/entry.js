


import { asyncImport } from '@weapp/ecodesdk';
import { regOvProps, regReactChildren, appInfo } from '@weapp/utils';
import { Route } from 'react-router-dom';
const { publicUrl } = appInfo('@weapp/ecodesdk');

regOvProps('weappUi', 'YearView',  props => {
  if (props.weId === 'demo-yearview') {
    props.customRenderCell = (templateCom, cell, value) => {
      console.info(value.format('YYYY-MM-DD HH:mm:ss'))
      if (cell.props.itemData.content === '5') {
        return <div className="disbaled-click cell">
          {cell}
        </div>; 
      }
      return cell;
    }
  }
  return props;
});





const PageCom = React.lazy(() => {
  return asyncImport('${appId}', 'index.js');
});

const PageComRoute = (
  <Route path={`${publicUrl}/sp/custom/pagecom/YearView`}>
    <React.Suspense fallback= {() => { }}>
      <PageCom />
    </React.Suspense>
  </Route>
);

// 注册多级动态路由
let time = 0;
regOvProps('weappEcodesdk', 'Switch', (props) => {
  if (time++ == 0) {
    regReactChildren(props, PageComRoute);
    console.info('page com => ', props);
  }
  return props;
}, 0);



