

import React from 'react';
import { Icon } from '@weapp/ui';

const prefixCls = 'ecode-com-m-progress-bar-card';


class ProgressBarCard extends React.Component {

  constructor(props) {
    super(props);
    const { datas = [] } = props;
    this.state = {
      visible: props.defaultVisible || true,
      itemSelect: datas.length > 0 ? datas[0].id : ''
    }
  }

  renderItems = () => {
    const { datas = [] } = this.props;
    const { itemSelect } = this.state;
    const current = datas.find(x => x.id === itemSelect);
    if (current) {
      const { subItems = [] } = current;
      return subItems.map(x => {
        const { name, value, unit, valueStyle } = x;
        return <div className={`${prefixCls}-item`}>
          <div className={`${prefixCls}-item-name`}>{name}</div>
          <div className={`${prefixCls}-item-value`}>
            <div className={`${prefixCls}-item-value-text`} style={valueStyle}>{value}</div>
            <div className={`${prefixCls}-item-value-unit`}>{unit}</div>
          </div>
        </div>
      });
    } else {
      return undefined;
    }
  }

  renderBar = () => {
    const { datas = [] } = this.props;
    const { itemSelect } = this.state;
    const current = datas.find(x => x.id === itemSelect);
    if (!current) return undefined;
    return <div className={`${prefixCls}-bar-body`}>
      <div className={`${prefixCls}-bar-line`}>
        <div style={{ width: current.progress + '%' }} className={`${prefixCls}-bar-line-fill`}></div>
      </div>
      <div className={`${prefixCls}-bar-text`}>
        {current.progress}%
      </div>
    </div>
  }

  renderTabs = () => {
    const { datas=[] } = this.props;
    const { itemSelect } = this.state;
    return datas.map(x => {
      return <div className={`${prefixCls}-tab ${itemSelect === x.id ? 'select-active' : ''}`} onClick={() => this.setState({ itemSelect: x.id })}>{x.content}</div>
    })
  }

  render() {

    const { title, datas = [] } = this.props;
    const { itemSelect, visible } = this.state;
    return <div className={prefixCls}>
      <div className={`${prefixCls}-header`}>
        <div className={`${prefixCls}-title`}>{title || ''}</div>
        <div className={`${prefixCls}-close`} onClick={() => this.setState({ visible: !visible })}>
          <Icon size="lg" style={{ color: 'gray' }} name={ visible ? "Icon-Down-arrow02" : "Icon-left-arrow02"} />
        </div>
      </div>
      { visible && 
        <div className={`${prefixCls}-body`}>
          <div className={`${prefixCls}-tabs`}>{this.renderTabs()}</div>
          <div className={`${prefixCls}-bar`}>{this.renderBar()}</div>
          <div className={`${prefixCls}-items`}>{this.renderItems()}</div>
        </div>
      }
    </div>
  }

}

export default ProgressBarCard;
