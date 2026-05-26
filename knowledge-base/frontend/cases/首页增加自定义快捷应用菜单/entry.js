


import { asyncImport } from '@weapp/ecodesdk';
import React from 'react';
import ReactDOM from 'react-dom';


// 在原有的顶部增加 快捷应用菜单
const CustFreqMenuAsyncCom = React.lazy(() => asyncImport('${appId}', 'index'));

const inter = setInterval(() => {
  const header = document.querySelector('.e10header-container');
  if (header) {
    header.classList.add('ecode-cust-freq-menu-parent');
    clearInterval(inter);
    const dom = document.createElement('div');
    dom.setAttribute('id', 'ecode-cust-freq-menu');
    ReactDOM.render(<React.Suspense fallback={() => {}}>
      <CustFreqMenuAsyncCom />
    </React.Suspense>, dom);
    header.insertBefore(dom, document.querySelector('.e10header-quick'));
  }
}, 100);




