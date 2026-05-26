
import { asyncImport } from '@weapp/ecodesdk';
import React from 'react';
import ReactDOM from 'react-dom';

const LoginCarouselAsync = React.lazy(() => asyncImport('${appId}', 'index')); // js 的入口文件 异步导入
const LoginCarousel = React.forwardRef((props, ref) => { // 挂载组件 在ReactDOM.render中使用
  return <React.Suspense fallback={() => {}}>
    <LoginCarouselAsync {...props} ref={ref} />
  </React.Suspense>
})

const ForgetPasswordAsync = React.lazy(() => asyncImport('${appId}', 'forgetPassword')); // js 的入口文件 异步导入
const ForgetPassword = React.forwardRef((props, ref) => { // 挂载组件 在ReactDOM.render中使用
  return <React.Suspense fallback={() => {}}>
    <ForgetPasswordAsync {...props} ref={ref} />
  </React.Suspense>
})

const RememberPasswordAsync = React.lazy(() => asyncImport('${appId}', 'rememberPassword')); // js 的入口文件 异步导入
const RememberPassword = React.forwardRef((props, ref) => { // 挂载组件 在ReactDOM.render中使用
  return <React.Suspense fallback={() => {}}>
    <RememberPasswordAsync {...props} ref={ref} />
  </React.Suspense>
})


const execCode = () => {
  // 轮播图
  const dom = document.querySelector('.weapp-passport-layout');
  dom.classList.add('ecode-login');
  const div = document.createElement('div');
  div.classList.add('ecode-login-carousel-dom');
  
  const forgetPd = document.createElement('div');
  forgetPd.classList.add('ecode-login-cheked-dom-forget-password');

  dom.insertBefore(div, dom.querySelector('.ui-layout-children'));
  dom.insertBefore(forgetPd, dom.querySelector('.ui-layout-children'));
  ReactDOM.render(<LoginCarousel />, div);
  ReactDOM.render(<ForgetPassword />, forgetPd);
  // 记住密码 
  const checkedDom = document.querySelector('.weapp-passport-common-login-panel')
  const checkedDiv = document.createElement('div')
  checkedDiv.classList.add('app-773115699900391425-ecode-login-cheked-dom');
  checkedDom.insertBefore(checkedDiv, checkedDom.querySelector('.weapp-passport-common-login-panel .weapp-passport-common-login-panel-btn'));
  ReactDOM.render(<RememberPassword />, checkedDiv);
}


 // 说明是登录页面，调整登录页面
if (location.pathname === '/login') {
  // execCode();
  let interval = setInterval(() => {
    if (document.querySelector('.weapp-passport-layout') && document.querySelector('.weapp-passport-common-login-panel') 
    && document.querySelector('.weapp-passport-common-login-panel-config')) {
      clearInterval(interval);
      document.querySelector('.weapp-passport-common-login-panel-config').style.display = 'none'
      execCode();
    }
  }, 10);
}




