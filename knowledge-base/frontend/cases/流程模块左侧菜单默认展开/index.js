
import React from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
@observer
@inject('mainStore')
class CustMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hasChangeKey: []
    }
  }

  getkeys = () => { // 获取当前数据展开的key
    const { data = [] } = this.props;
    const dt = [];
    for (let i = 0; i < data.length; i++) {
      if (Array.isArray(data[i].children) && data[i].children.length > 0) {
        dt.push(data[i].id);
      }
    }
    return dt;
  }

  render() {
    const { Com, expandKeys = [], ...others } = this.props;
    const { hasChangeKey = [] } = this.state;
    console.info(this.props);
    if (this.props.mainStore?.asideCusMenuData?.module !== 'workflow') { // 非流程模块
      return <Com {...others} />
    }
    // 过滤下已经处理过的key
    // 这里是没有操作过的，第一次默认展开的
    const getAllExKeys = this.getkeys().filter(x => !hasChangeKey.includes(x));
    let keys = [...toJS(expandKeys)];
    getAllExKeys.forEach(x => {
      if (!keys.includes(x)) {
        keys.push(x);
      }
    })
    return <Com {...others} onItemClick={(id, item, e) => {
      if (!hasChangeKey.includes(id)) {
        this.setState({ hasChangeKey: [...hasChangeKey, id] });
      }
      this.props?.onItemClick(id, item, e);
    }} expandKeys={keys}/>
  }

}

export default CustMenu;
