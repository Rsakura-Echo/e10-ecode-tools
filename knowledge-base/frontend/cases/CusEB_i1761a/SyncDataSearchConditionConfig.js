import {
  Browser, DatePicker, Icon, Input, Layout, Select, TypesBrowser,
} from '@weapp/ui';
import { getLabel } from '@weapp/utils';
import React, { PureComponent } from 'react';
import { clsPrefix } from '../config/config';

const { InputNumber } = Input;
const { Row, Col } = Layout;

class Value extends PureComponent<any, any> {
  onChange = (value: any) => {
    const { index } = this.props;
    this.props.onChange(index, { value });
  };

  onStartNumberChange = (value: any) => {
    const { index } = this.props;
    this.props.onChange(index, { startNumber: value });
  };

  onEndNumberChange = (value: any) => {
    const { index } = this.props;
    this.props.onChange(index, { endNumber: value });
  };

  onNumberChange = (value: any) => {
    const { index } = this.props;
    this.props.onChange(index, { value, compareNumber: value });
  };

  render() {
    const { fields, data } = this.props;

    if (data.type === 'string' || data.type === 'progress') {
      return (
        <Input
          weId={`${this.props.weId || ''}_e14f4p`}
          value={data.value}
          onChange={this.onChange}
        />
      );
    }

    if (data.type === 'number' || data.type === 'NumberComponent' || data.type === 'Money') {
      if (data.operate === 'range') {
        if (data.startNumber === 'all') data.startNumber = '';
        if (data.endNumber === 'all') data.endNumber = '';
        return (
          <Row weId={`${this.props.weId || ''}_cenhun`}>
            <Col weId={`${this.props.weId || ''}_v4230p`} span={10}>
              <InputNumber
                weId={`${this.props.weId || ''}_hf9cvl`}
                min={0}
                hideOps
                value={data.startNumber}
                onChange={this.onStartNumberChange}
              />
            </Col>
            <Col weId={`${this.props.weId || ''}_w6cent`} span={4}>
              <div style={{ lineHeight: '30px', textAlign: 'center' }}>
                <span>{getLabel('53940', '至')}</span>
              </div>
            </Col>
            <Col weId={`${this.props.weId || ''}_wma2un`} span={10}>
              <InputNumber
                weId={`${this.props.weId || ''}_hf9cvl`}
                min={0}
                hideOps
                value={data.endNumber}
                onChange={this.onEndNumberChange}
              />
            </Col>
          </Row>
        );
      }
      return (
        <InputNumber
          weId={`${this.props.weId || ''}_hf9cvl`}
          hideOps
          value={data.value}
          onChange={this.onNumberChange}
        />
      );
    }

    if (
      data.type === 'select'
      || data.type === 'Select'
      || data.type === 'RadioBox'
      || data.type === 'CheckBox'
    ) {
      const field = fields.filter((item: any) => item.id === data.id);
      return (
        <Select
          weId={`${this.props.weId || ''}_2zmpi8`}
          multiple
          data={field[0].data || []}
          value={data.value}
          onChange={this.onChange}
        />
      );
    }

    if (data.type === 'date' || data.type === 'DateComponent') {
      if (data.value && data.value[0] === 'all') data.value[0] = '';
      if (data.value && data.value[1] === 'all') data.value[1] = '';
      return (
        <DatePicker
          weId={`${this.props.weId || ''}_cwfalj`}
          type="day"
          isRange
          value={data.value}
          onChange={this.onChange}
        />
      );
    }

    if (data.type === 'browser') {
      const field = fields.filter((item: any) => item.id === data.id);
      return (
        <Browser
          weId={`${this.props.weId || ''}_ypz61h`}
          module={field[0].browsermodule}
          type={field[0].browsertype}
          dataParams={field[0].browserparams ? field[0].browserparams : {}}
          completeParams={field[0].browserparams ? field[0].browserparams : {}}
          multiple
          value={data.value}
          onChange={this.onChange}
        />
      );
    }

    if (data.type === 'employee' || data.type === 'Employee') {
      return (
        <Browser
          weId={`${this.props.weId || ''}_l22m9c`}
          module="hrm"
          type="resource"
          multiple
          value={data.value}
          onChange={this.onChange}
        />
      );
    }

    if (data.type === 'sharer') {
      const options = [
        { id: 'user', content: getLabel('81445', '用户') },
        { id: 'dept', content: getLabel('81446', '部门') },
        { id: 'group', content: getLabel('81447', '群组') },
        { id: 'all', content: getLabel('81448', '所有人') },
      ];
      return (
        <TypesBrowser
          weId={`${this.props.weId || ''}_j1uw10`}
          module="hrm"
          type="hrmcombination"
          multiple
          options={options}
          value={data.value}
          onChange={this.onChange}
        />
      );
    }

    if (data.type === 'department' || data.type === 'Department') {
      return (
        <Browser
          weId={`${this.props.weId || ''}_dx20d8`}
          module="auth"
          type="department"
          multiple
          value={data.value}
          onChange={this.onChange}
        />
      );
    }

    if (data.type === 'customFolders') {
      return (
        <Browser
          weId={`${this.props.weId || ''}_6it1ye`}
          module="doc"
          type="folder"
          multiple
          value={data.value}
          onChange={this.onChange}
        />
      );
    }

    return (
      <Input weId={`${this.props.weId || ''}_oderdo`} value={data.value} onChange={this.onChange} />
    );
  }
}

export default class DataSearchConditionConfig extends PureComponent<any, any> {
  onAdd = () => {
    const { fields, conditions } = this.props;
    if (fields && fields.length > 0) {
      const field = fields[0];
      const _conditions = [...conditions];

      if (field.type === 'date') {
        _conditions.push({
          id: field.id,
          type: field.type,
        });
      } else {
        _conditions.push({
          id: field.id,
          type: field.type,
          operate: this.getCompareTypes(field.type)[0].id,
        });
      }

      this.props.onChange(_conditions);
    }
  };

  onDelete = (index: any) => {
    const { conditions } = this.props;
    const _conditions = conditions.filter((item: any, i: any) => i !== index);
    this.props.onChange(_conditions);
    if (this.props.onChangeForceUpdate) {
      this.props.onChangeForceUpdate();
    }
  };

  onFieldChange = (index: number, value: string) => {
    const { fields, conditions } = this.props;
    const field = fields.filter((item: any) => item.id === value)[0] || {};

    const _conditions = conditions.map((item: any, i: number) => {
      if (index === i) {
        if (field.type === 'date') {
          return {
            id: field.id,
            type: field.type,
          };
        }
        return {
          id: field.id,
          type: field.type,
          operate: this.getCompareTypes(field.type)[0].id,
        };
      }
      return item;
    });

    this.props.onChange(_conditions);
  };

  onCompareTypeChange = (index: number, value: string) => {
    const { conditions } = this.props;
    const _conditions = conditions.map((item: any, i: number) => {
      if (index === i) {
        return { ...item, operate: value };
      }
      return item;
    });
    this.props.onChange(_conditions);
  };

  onValueChange = (index: number, value: any) => {
    const { conditions } = this.props;
    const _conditions = conditions.map((item: any, i: number) => {
      if (index === i) {
        return { ...item, ...value };
      }
      return item;
    });
    this.props.onChange(_conditions);
  };

  getCompareTypes = (type: any) => {
    const eq = { id: 'eq', content: getLabel('53941', '等于') };
    const neq = { id: 'neq', content: getLabel('53942', '不等于') };
    const eq2 = { id: 'eq', content: getLabel('53943', '属于') };
    const neq2 = { id: 'neq', content: getLabel('53944', '不属于') };
    const like = { id: 'like', content: getLabel('53945', '包含') };
    const range = { id: 'range', content: getLabel('53946', '取值范围') };
    const gt = { id: 'gt', content: getLabel('53947', '大于') };
    const gtAndEq = { id: 'gtAndEq', content: getLabel('53948', '大于等于') };
    const lt = { id: 'lt', content: getLabel('53949', '小于') };
    const ltAndEq = { id: 'ltAndEq', content: getLabel('53950', '小于等于') };

    if (type === 'string') {
      return [like, eq, neq];
    }
    if (type === 'progress') {
      return [eq, neq];
    }
    if (
      type === 'select'
      || type === 'browser'
      || type === 'employee'
      || type === 'department'
      || type === 'Select'
      || type === 'RadioBox'
      || type === 'CheckBox'
      || type === 'Employee'
      || type === 'DateComponent'
    ) {
      return [eq, neq];
    }
    if (type === 'folder') {
      return [eq2, neq2];
    }
    if (type === 'sharer') {
      return [eq, neq];
    }
    if (type === 'number' || type === 'NumberComponent' || type === 'Money') {
      return [range, eq, neq, gt, gtAndEq, lt, ltAndEq];
    }
    return [like, eq, neq];
  };

  render() {
    const { className, fields, conditions } = this.props;

    return (
      <div className={`${clsPrefix}-data-search-conditions ${className || ''}`}>
        {conditions
          && conditions.length > 0
          && conditions.map((item: any, index: number) => {
            const key = `${item.id}-${index}`;
            return (
              <div key={key} className={`${clsPrefix}-data-search-condition`}>
                <Row weId={`${this.props.weId || ''}_4z9f62@${key}`}>
                  <Col weId={`${this.props.weId || ''}_83ckcs@${key}`} span={5}>
                    <div className={`${clsPrefix}-data-search-condition-field`}>
                      <Select
                        weId={`${this.props.weId || ''}_5za9vf@${key}`}
                        data={fields}
                        value={item.id}
                        onChange={(value: any) => this.onFieldChange(index, value)}
                      />
                    </div>
                  </Col>
                  {item.type !== 'date' && (
                    <Col weId={`${this.props.weId || ''}_sj7d98@${key}`} span={4}>
                      <div className={`${clsPrefix}-data-search-condition-operate`}>
                        <Select
                          weId={`${this.props.weId || ''}_dq7l4c@${key}`}
                          data={this.getCompareTypes(item.type)}
                          value={item.operate}
                          onChange={(value: any) => this.onCompareTypeChange(index, value)}
                        />
                      </div>
                    </Col>
                  )}
                  <Col
                    weId={`${this.props.weId || ''}_sgx4ed@${key}`}
                    span={item.type === 'date' ? 17 : 13}
                  >
                    <div className={`${clsPrefix}-data-search-condition-value`}>
                      <Value
                        weId={`${this.props.weId || ''}_km8iin@${key}`}
                        index={index}
                        fields={fields}
                        data={item}
                        onChange={this.onValueChange}
                      />
                    </div>
                  </Col>
                  <Col weId={`${this.props.weId || ''}_sgx4ed@${key}`} span={1}>
                    <div
                      className={`${clsPrefix}-data-search-condition-delete`}
                      title={getLabel('53951', '删除')}
                    >
                      <Icon
                        weId={`${this.props.weId || ''}_9k65uz`}
                        name="Icon-delete"
                        size="md"
                        onClick={() => this.onDelete(index)}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            );
          })}
      </div>
    );
  }
}
