import { toJS } from 'mobx';
import React, { PureComponent } from 'react';
import { OrderFields } from '../../components/list/common';

export default class OrderFieldsConfig extends PureComponent<any, any> {
  onChange = (value: any) => {
    const _value = value.map((item: any) => {
      let orderWay = 'asc';
      if (item.orderType === 'ASC') {
        orderWay = 'asc';
      } else if (item.orderType === 'DESC') {
        orderWay = 'desc';
      } else if (item.orderType === 'DEFAULT') {
        orderWay = '0';
      }
      return { id: item.id, orderWay };
    });
    this.props.onChange(_value);
  };

  render() {
    const { fields = [], value = {} } = this.props;

    if (!fields || fields.length === 0) {
      return null;
    }

    const optFileds = fields.map((f: any) => {
      f.text = f.name; // 字段中文显示名称
      return f;
    });
    return (
      <OrderFields
        weId={`${this.props.weId || ''}_rhlta1`}
        optionalFields={optFileds}
        limit={1}
        value={toJS(value).map((v: any) => {
          const findField = optFileds.find((of: any) => of.id === v.id);
          if (v.orderWay === '0') {
            v.orderType = 'DEFAULT';
          } else {
            v.orderType = v.orderWay.toUpperCase(); // ASC | DESC
          }
          v.text = findField.text;
          v.name = findField.id;
          delete v.orderWay;
          return v;
        })}
        onChange={this.onChange}
      />
    );
  }
}
