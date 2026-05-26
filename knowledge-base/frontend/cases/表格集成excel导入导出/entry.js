

import { asyncImport } from '@weapp/ecodesdk';
import { regOvProps, regReactChildren, appInfo } from '@weapp/utils';
import { Route } from 'react-router-dom';

const { publicUrl } = appInfo('@weapp/ecodesdk');

const TableWithExcel = React.lazy(() => {
  return asyncImport('${appId}', 'index.js');
});
const TableManagerRoute = (
  <Route path={`${publicUrl}/sp/custom/case/table/withexcel`}>
    <React.Suspense fallback= {() => { }}>
      <TableWithExcel />
    </React.Suspense>
  </Route>
);

regOvProps('weappEcodesdk', 'Switch', (props) => {
  regReactChildren(props, TableManagerRoute);
  console.info('表格集成excel导入导出 路由 => ', props);
  return props;
}, 0);



