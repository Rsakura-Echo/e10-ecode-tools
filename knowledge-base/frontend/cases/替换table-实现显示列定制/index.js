
import React from 'react';
import { Checkbox, Menu } from '@weapp/ui';

const prefixCls = `cust-table`;

class CustTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      disabled: []
    }
  }

  customRenderItem = (_: any, ele: React.ReactNode, itemData: MenuItemData) => {
    const { disabled = [] } = this.state;
    // console.log('customRenderItem', _, ele, data);
    return <div className={`${prefixCls}-check`}><Checkbox onChange={(value) => {
      if (value) {
        this.setState({ disabled: disabled.filter(x => x !== itemData.id) });
      } else {
        this.setState({ disabled: [...disabled, itemData.id] });
      }
    }} value={!disabled.includes(itemData.id)} >{itemData.content}</Checkbox></div>;
  }


  render() {
    const { Com, ...otherProps } = this.props;
    const { columns = [] } = otherProps;
    const { disabled } = this.state;
    return <div className={`${prefixCls}-body`}>
      <div className={`${prefixCls}-opt`}>
        <Menu
          data={columns.map(x => ({ id: x.dataIndex, content: x.title }))}
          type="select"
          selectIcon="Icon-Message-tag-read-o"
          selectType="iconOverlay"
          customRenderItem={this.customRenderItem}
          triggerProps={{
            popupPlacement: 'bottomRight',
            popupClassName: 'menuDemo-select-custom'
          }}
          childTriggerProps={{
            popupPlacement: 'leftTop',
            popupClassName: 'menuDemo-select-custom-child'
          }}
        />
      </div>
      <div className={`${prefixCls}-table`}>
        <Com {...otherProps} columns={columns.filter(x => !disabled.includes(x.dataIndex))} />
      </div>
    </div>

  }

}

export default CustTable;
