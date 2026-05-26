

import React from 'react';


class CustMenuContent extends React.Component {

  render() {

    const { OriginCom, ...others } = this.props;
    console.info('OriginCom => ', OriginCom, others);

    return <OriginCom
      {...others}
      key={'cust'}
      bindKey={'wf_flowpage_main'}
      dataId={'cust'}
    >
      <div className="cust-tab-content">
        自定义内容
      </div>
    </OriginCom>
  }

}


export default CustMenuContent;

