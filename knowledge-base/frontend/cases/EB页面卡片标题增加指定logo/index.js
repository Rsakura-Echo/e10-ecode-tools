

import React from 'react';
import { Icon } from '@weapp/ui';

export default class TitleIcon extends React.Component {

  render() {
    
    return <div style={{ marginRight: 6 }}>
      <Icon 
        name="Icon-Archives-integration"
        size="lg"
        style={{ color: 'var(--primary)' }}
      />
    </div>
  }

}
