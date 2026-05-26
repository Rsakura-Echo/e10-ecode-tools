
import React from 'react';
import { YearView } from '@weapp/ui';

class YearViewPage extends React.Component {


  render() {
    return <div className="page-com">
      <YearView
        weId="demo-yearview"
        value={2022}
      />
    </div>
  }
}

export default YearViewPage;
