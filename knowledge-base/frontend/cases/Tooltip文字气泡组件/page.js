
import React from 'react';

import Tooltip from './index';

class Page extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return <div style={{ margin: 120, padding: 20 }}>
      <Tooltip content='This is tooltip content' popupVisible={true}>
        Tooltip
      </Tooltip>
    </div>
  }

}

export default Page;
