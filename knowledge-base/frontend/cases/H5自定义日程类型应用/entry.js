


import { asyncImport } from '@weapp/ecodesdk';
import { regOvProps, regReactChildren, appInfo } from '@weapp/utils';
import { Route } from 'react-router-dom';

const { publicUrl } = appInfo('@weapp/ecodesdk');

const CalendarSchedule = React.lazy(() => asyncImport('${appId}', 'index.js'));
const CalendarScheduleRoute = (
  <Route path={`${publicUrl}/mobile/custom/calendarSchedule`}>
    <React.Suspense fallback= {() => { }}>
      <CalendarSchedule />
    </React.Suspense>
  </Route>
);
// asyncImport('${appId}', 'index.js').then(res => console.info(res));
// 732543901211713536
// console.info('H5订餐应用 register')
regOvProps('weappEcodesdk', 'Switch', (props) => {
  regReactChildren(props, CalendarScheduleRoute);
  console.info('注册日历日程应用 路由 => ', props);
  return props;
}, 0);




