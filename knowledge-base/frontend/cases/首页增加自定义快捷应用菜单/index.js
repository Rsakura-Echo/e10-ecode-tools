

import React from 'react';
import { Menu } from '@weapp/ui';
import { history } from '@weapp/utils';

class CustFreqMenu extends React.Component {


  prefixCls = 'ecode-cust-freq-menu'

  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 'workflow', content: '工作流程', path: '/workflow' },
        { id: 'blog', content: '工作日报', path: '/blog' }
      ],
      select: 'workflow'
    }
  }

  onChange = (id, item) => {
    history.push(item.path);
    this.setState({ select: id });
  }

  render() {

    const { data = [] } = this.state;

    return <div className={this.prefixCls}>
      <Menu
        defaultValue={'tab1'}
        data={data}
        value={this.state.select}
        type="select"
        selectType="btnOverlay"
        // action="click"
        triggerProps={{
          popupClassName: 'menuDemo-select',
        }}
        childTriggerProps={{
          popupClassName: 'menuDemo-select-child'
        }}
        onChange={this.onChange}
      >
        自定义快捷应用
      </Menu>
    </div>
  }

}


export default CustFreqMenu;
