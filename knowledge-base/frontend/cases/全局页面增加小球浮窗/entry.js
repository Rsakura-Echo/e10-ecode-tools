
import ReactDOM from 'react-dom';
import { asyncImport } from '@weapp/ecodesdk';

/**
 * body下插入一个div 用于渲染小球
 */

if (top === window) { // 只在顶层下增加小球，避免有iframe 出现重复小球

  const FloatBall = React.lazy(() => asyncImport('${appId}', 'index.js'));


  const dom = document.createElement("div");
  dom.setAttribute("id", "ecode-float-ball");
  document.body.appendChild(dom);

  ReactDOM.render(<React.Fragment>
    <React.Suspense fallback={() => {}}>
      <FloatBall />
    </React.Suspense>
  </React.Fragment>, dom);

}



