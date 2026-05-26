import {
  Button, Dialog, Icon, Menu,
} from '@weapp/ui';
import { getLabel, request } from '@weapp/utils';
import { toJS } from 'mobx';
import React, { PureComponent } from 'react';
import { clsPrefix, dlgIconName } from '../config/config';
import DataSearchConditionConfig from './SyncDataSearchConditionConfig';

export default class DataSearchConfig extends PureComponent<any, any> {
  configRef: React.RefObject<any> = React.createRef();

  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
      conditions: toJS(props.value),
      conditionsTmp: toJS(props.value),
      customFields: [],
    };
  }

  onClick = () => {
    this.setState({ visible: true });
  };

  onOk = () => {
    const { conditions } = this.state;
    const _conditions = conditions.filter((item: any) => {
      if (item.type === 'number') {
        if (item.operate === 'range') {
          if (typeof item.startNumber === 'number' || typeof item.endNumber === 'number') {
            if (item.startNumber === '') {
              item.startNumber = 'all';
            }
            if (item.endNumber === '') {
              item.endNumber = 'all';
            }
            return true;
          }
          return false;
        }
        return typeof item.value === 'number';
      }
      if (item.type === 'date') {
        if (item.value && (item.value[0] || item.value[1])) {
          if (item.value[0] === '') {
            item.value[0] = 'all';
          }
          if (item.value[1] === '') {
            item.value[1] = 'all';
          }
          return true;
        }
        return false;
      }
      return !!item.value;
    });
    this.props.onChange(_conditions);
    this.setState({
      visible: false,
      conditions: _conditions,
      conditionsTmp: _conditions,
    });
  };

  onClose = () => {
    const { conditionsTmp } = this.state;
    this.setState({ visible: false, conditions: conditionsTmp });
  };

  onAdd = () => {
    this.configRef.current.onAdd();
  };

  onChange = (conditions: any) => {
    this.setState({ conditions });
  };

  componentDidMount() {
    if (this.props.module) {
      const formData = new FormData();
      formData.append('module', this.props.module);

      request({
        url: '/api/crm/freeform/getFormFields',
        method: 'POST',
        data: formData,
      }).then((result: any) => {
        const { data = [] } = result;
        const customFields = data.filter((item: any) => (item.type !== 'Employee' && item.type !== 'Department')).map((item: any) => {
          const field: any = {
            id: `custom_${item.id}`,
            content: item.name,
            type: item.type,
          };
          if ((field.type === 'Select' || field.type === 'RadioBox' || field.type === 'CheckBox') && item.options) {
            field.data = item.options.map((item2: any) => ({ id: item2.id, content: item2.name }));
          }
          return field;
        });
        this.setState({ customFields });
      });
    }
  }

  render() {
    const { fields } = this.props;
    const { visible, conditions, customFields } = this.state;

    return (
      <div>
        <Dialog
          weId={`${this.props.weId || ''}_h36cqu`}
          visible={visible}
          onClose={this.onClose}
          title={getLabel('53952', '设置过滤条件')}
          closable
          destroyOnClose
          draggable
          mask
          icon={dlgIconName}
          maskClosable
          width={700}
          footer={[
            <Button
              weId={`${this.props.weId || ''}_mae4mc@ok`}
              key="ok"
              type="primary"
              onClick={this.onOk}
            >
              {getLabel('40565', '确定')}
            </Button>,
            <Button
              weId={`${this.props.weId || ''}_fau3yf@cancel`}
              key="cancel"
              onClick={this.onClose}
            >
              {getLabel('53937', '取消')}
            </Button>,
          ]}
        >
          <Menu
            weId={`${this.props.weId || ''}_j3ji47`}
            defaultValue="tab1"
            data={[{ id: 'tab1', content: getLabel('53953', '筛选条件') }]}
            extraContent={
              <Button
                weId={`${this.props.weId || ''}_0jtyf2`}
                type="link"
                className={`${clsPrefix}-data-search-add`}
                onClick={this.onAdd}
              >
                <Icon weId={`${this.props.weId || ''}_9k65uz`} name="Icon-add-to01" />
                <span>{getLabel('53954', '添加筛选')}</span>
              </Button>
            }
          />
          <DataSearchConditionConfig
            weId={`${this.props.weId || ''}_c9ez0o`}
            ref={this.configRef}
            fields={fields.concat(customFields)}
            conditions={conditions}
            onChange={this.onChange}
          />
        </Dialog>
        <Button
          weId={`${this.props.weId || ''}_fgdw06`}
          style={{ width: '100%' }}
          type="default"
          className={`${clsPrefix}-data-search-setting`}
          onClick={this.onClick}
        >
          {
            conditions.length > 0
              ? <Icon weId={`${this.props.weId || ''}_9k65uz`} name="Icon-edit" />
              : <Icon weId={`${this.props.weId || ''}_2392r4`} name="Icon-Advanced-search" />
          }
          <span style={{ marginLeft: 5 }}>{getLabel('53952', '设置过滤条件')}</span>
        </Button>
      </div>
    );
  }
}
