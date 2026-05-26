

import React from 'react';
import { Button } from '@weapp/ui';
import  Notification from './index';

class Page extends React.Component {


  handleClick = () => {
    // 展示通知
    Notification.info({
      closable: true,
      title: 'Notification',
      content: 'This is a notification!',
    })  
  }

  render() {
    return <div style={{ margin: 120, padding: 20 }}>
      <Button onClick={this.handleClick}>通知</Button>
    </div>
  }

}

export default Page;



