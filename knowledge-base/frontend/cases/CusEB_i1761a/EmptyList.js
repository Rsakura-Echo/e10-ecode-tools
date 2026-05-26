import { Empty, Icon } from '@weapp/ui';
import { getLabel, middleware } from '@weapp/utils';
import React from 'react';
import { clsPrefix } from '../config/config';
// import '../../BusinessList.less';

export default class EmptyList extends React.PureComponent<any, any> {
  render() {
    const { data, iconName } = this.props;

    if (data && data.length === 0) {
      return (
        <div className={`${clsPrefix}-business-list-empty`}>
          <Empty
            weId={`${this.props.weId || ''}_4crkf7`}
            title={getLabel('54023', '暂无数据')}
            image={
              <Icon
                weId={`${this.props.weId || ''}_gogifb`}
                style={{ width: 100, height: 100 }}
                name={iconName || 'Icon-No-data-available'}
              />
            }
          />
        </div>
      );
    }

    return <div style={{ height: 100 }} />;
  }
}