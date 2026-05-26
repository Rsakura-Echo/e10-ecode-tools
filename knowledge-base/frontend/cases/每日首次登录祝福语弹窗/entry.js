
import React from 'react';

import ReactDOM from 'react-dom';
import { asyncImport } from '@weapp/ecodesdk';
// 第一次登录时候展现祝福语

const GreetComAsync = React.lazy(() => asyncImport('${appId}', 'index'));

const GreetCom = (
  <React.Suspense fallback={() => {}}>
    <GreetComAsync />
  </React.Suspense>
)

let dom = document.getElementById('ecode_greet');
if (!dom) {
  dom = document.createElement('div');
  dom.setAttribute('id', 'ecode_greet');
  document.body.appendChild(dom);
}

ReactDOM.render(GreetCom, dom);