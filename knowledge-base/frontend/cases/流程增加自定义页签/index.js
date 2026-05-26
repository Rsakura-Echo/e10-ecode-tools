

import React from 'react';


class CustMenuContent extends React.Component {

  render() {

    const { OriginCom, ...others } = this.props;
    return <div className="cust-tab-content">
        自定义内容
      </div>
  }

}


export default CustMenuContent;

