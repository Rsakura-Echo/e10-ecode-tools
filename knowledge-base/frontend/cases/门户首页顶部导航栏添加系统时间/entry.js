
import ReactDOM from 'react-dom';
import { asyncImport } from '@weapp/ecodesdk';
import React from 'react';

// 在原有的顶部增加系统时间显示
const TimeComAsync = React.lazy(() => asyncImport('${appId}', 'index'));

const inter = setInterval(() => {
  const header = document.querySelector('.e10header-container');
  if (header) {
    header.classList.add('ecode-time-parent');
    clearInterval(inter);
    const timeDom = document.createElement('div');
    timeDom.setAttribute('id', 'ecode-system-time');
    ReactDOM.render(<React.Suspense fallback={() => {}}>
      <TimeComAsync />
    </React.Suspense>, timeDom);
    header.insertBefore(timeDom, document.querySelector('.e10header-quick'));
  }
}, 100);