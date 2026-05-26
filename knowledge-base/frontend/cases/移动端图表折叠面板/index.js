

import React from 'react';

const prefixCls = 'ecode-com-m-graph-collapse';
import { Icon } from '@weapp/ui';

class GraphCollapse extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expenseKeys: props.defaultExpenseKeys || []
    }
  }

  renderItem = () => {
    const { expenseKeys } = this.state;
    const { datas = [] } = this.props;
    return <div className={`${prefixCls}-list`}>
      {
        datas.map(x => {
          const { name, id, renderChart, value } = x;
          return <div className={`${prefixCls}-item`}>
            <div className={`${prefixCls}-item-header`} onClick={() => {
              if (expenseKeys.includes(x.id)) {
                this.setState({ expenseKeys: expenseKeys.filter(k => x.id !== k) });
              } else {
                this.setState({ expenseKeys: [...expenseKeys, x.id] });
              }
            }}>
              <div className={`${prefixCls}-item-header-title`}>
                <div className={`${prefixCls}-item-header-logo`}>
                  <Icon size="lg" name={expenseKeys.includes(x.id) ? 'Icon-Down-arrow04' : 'Icon-Right-arrow04'} />
                </div>
                <div>{name}</div>
              </div>
              <div className={`${prefixCls}-item-header-value`}>
                {value}
              </div>
            </div>
            <div className={`${prefixCls}-panel`}>{(expenseKeys.includes(x.id) && renderChart) && renderChart()}</div>
          </div>
        })
      }
    </div>
  }

  render() {
    const { title, headerTitle, headerUnit } = this.props;
    return <div className={prefixCls}>
      {title && <div className={`${prefixCls}-title`}>{title}</div>}
      {headerTitle && <div className={`${prefixCls}-header`}>
        <div className={`${prefixCls}-header-name`}>{headerTitle}</div>
        <div className={`${prefixCls}-header-unit`}>{headerUnit}</div>
      </div>}
      {this.renderItem()}
    </div>
  }

}

export default GraphCollapse;