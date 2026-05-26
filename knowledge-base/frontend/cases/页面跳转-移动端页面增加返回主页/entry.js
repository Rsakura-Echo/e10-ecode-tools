

import ReactDOM from 'react-dom';
import React from 'react';
import { asyncImport } from '@weapp/ecodesdk';

// 增加悬浮球
const ball = document.createElement('div');
ball.setAttribute('id', 'home-ball')
document.body.appendChild(ball);

const BallAsync = React.lazy(() => asyncImport('${appId}', 'index'));

ReactDOM.render(<React.Suspense fallback={() => {}}>
  <BallAsync />
</React.Suspense>, ball)