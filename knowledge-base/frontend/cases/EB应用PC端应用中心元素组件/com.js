

import React from 'react';
import AppList from './app-list';

const prefixCls = `ebapp-ecode-com-applist`;

export default class Com extends React.Component {

  render() {
    return <div className={prefixCls}>
      <AppList />   
    </div>
  }
  
}
