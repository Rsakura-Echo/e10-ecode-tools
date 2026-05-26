import {
  Button, Dialog, Icon, Input, List, Tag,
} from '@weapp/ui';
import { getLabel } from '@weapp/utils';
import React from 'react';
import { clsPrefix, dlgIconName } from '../config/config';

const { message } = Dialog;

export default class ShowFieldsConfig extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
      isSearch: false,
      searchKey: '',
      isSelectAll: false,
      lineFieldsData: [],
      lineFieldsSearchData: [],
      expandFieldsData: [],
      expandFieldsSearchData: [],
    };
  }

  getListData = (fields: any, showFields: any) => {
    const checkedData: any = [];

    showFields.forEach((showField: any) => {
      fields.forEach((field: any) => {
        if (field.id === showField) {
          checkedData.push({ ...field, checked: true });
        }
      });
    });

    const uncheckedData = fields.filter((item: any) => !showFields.includes(item.id));

    return [...checkedData, ...uncheckedData];
  };

  onClick = () => {
    const {
      client, listStyle, lineFields, expandFields, value,
    } = this.props;

    const lineFieldsData = this.getListData(lineFields, value.lineFields);
    const expandFieldsData = this.getListData(expandFields, value.expandFields);

    let isSelectAll = false;
    if (client !== 'MOBILE' && listStyle !== 'table') {
      const unCheckedFieldsData = expandFieldsData.filter((item: any) => !item.checked);
      isSelectAll = unCheckedFieldsData && unCheckedFieldsData.length > 0;
    } else {
      const unCheckedFieldsData = lineFieldsData.filter((item: any) => !item.checked);
      isSelectAll = unCheckedFieldsData && unCheckedFieldsData.length > 0;
    }

    this.setState({
      visible: true,
      isSelectAll: !isSelectAll,
      lineFieldsData,
      lineFieldsSearchData: lineFieldsData,
      expandFieldsData,
      expandFieldsSearchData: expandFieldsData,
    });
  };

  onLineFieldCheck = (id: string, checked: boolean) => {
    const { lineFieldsData, lineFieldsSearchData } = this.state;

    // 限制最大选择个数
    const { maxSelectedSize = 0 } = this.props;
    if (maxSelectedSize && maxSelectedSize > 0) {
      const lineFields = lineFieldsData.filter((item: any) => item.checked);
      if (checked && lineFields.length >= maxSelectedSize) {
        message({ type: 'info', content: this.props.maxSelectedTips });
        return;
      }
    }

    const _lineFieldsData = lineFieldsData.map((item: any) => {
      if (item.id === id) {
        return { ...item, checked };
      }
      return item;
    });

    const _lineFieldsSearchData = lineFieldsSearchData.map((item: any) => {
      if (item.id === id) {
        return { ...item, checked };
      }
      return item;
    });

    this.setState({
      lineFieldsData: _lineFieldsData,
      lineFieldsSearchData: _lineFieldsSearchData,
    });
  };

  onExpandFieldCheck = (id: string, checked: boolean) => {
    const { expandFieldsData, expandFieldsSearchData } = this.state;

    const _expandFieldsData = expandFieldsData.map((item: any) => {
      if (item.id === id) {
        return { ...item, checked };
      }
      return item;
    });

    const _expandFieldsSearchData = expandFieldsSearchData.map((item: any) => {
      if (item.id === id) {
        return { ...item, checked };
      }
      return item;
    });

    this.setState({
      expandFieldsData: _expandFieldsData,
      expandFieldsSearchData: _expandFieldsSearchData,
    });
  };

  onLineFieldsSort = (data: any) => {
    this.setState({
      lineFieldsData: data,
      lineFieldsSearchData: data,
    });
  };

  onExpandFieldsSort = (data: any) => {
    this.setState({
      expandFieldsData: data,
      expandFieldsSearchData: data,
    });
  };

  onSelectAll = () => {
    const { client, listStyle } = this.props;

    if (client !== 'MOBILE' && listStyle !== 'table') {
      const { expandFieldsData, expandFieldsSearchData } = this.state;

      const _expandFieldsData = expandFieldsData.map((item: any) => ({ ...item, checked: true }));
      const _expandFieldsSearchData = expandFieldsSearchData.map((item: any) => ({
        ...item,
        checked: true,
      }));

      this.setState({
        isSelectAll: true,
        expandFieldsData: _expandFieldsData,
        expandFieldsSearchData: _expandFieldsSearchData,
      });
    } else {
      const { lineFieldsData, lineFieldsSearchData } = this.state;

      // 限制最大选择个数
      const { maxSelectedSize = 0 } = this.props;
      if (maxSelectedSize && maxSelectedSize > 0) {
        if (lineFieldsData.length > maxSelectedSize) {
          message({ type: 'info', content: this.props.maxSelectedTips });
          return;
        }
      }

      const _lineFieldsData = lineFieldsData.map((item: any) => ({ ...item, checked: true }));
      const _lineFieldsSearchData = lineFieldsSearchData.map((item: any) => ({
        ...item,
        checked: true,
      }));

      this.setState({
        isSelectAll: true,
        lineFieldsData: _lineFieldsData,
        lineFieldsSearchData: _lineFieldsSearchData,
      });
    }
  };

  onCancelSelectAll = () => {
    const { client, listStyle } = this.props;

    if (client !== 'MOBILE' && listStyle !== 'table') {
      const { expandFieldsData, expandFieldsSearchData } = this.state;

      const _expandFieldsData = expandFieldsData.map((item: any) => ({ ...item, checked: false }));
      const _expandFieldsSearchData = expandFieldsSearchData.map((item: any) => ({
        ...item,
        checked: false,
      }));

      this.setState({
        isSelectAll: false,
        expandFieldsData: _expandFieldsData,
        expandFieldsSearchData: _expandFieldsSearchData,
      });
    } else {
      const { lineFieldsData, lineFieldsSearchData } = this.state;

      const _lineFieldsData = lineFieldsData.map((item: any) => ({
        ...item,
        checked: !!item.fixed,
      }));
      const _lineFieldsSearchData = lineFieldsSearchData.map((item: any) => ({
        ...item,
        checked: !!item.fixed,
      }));

      this.setState({
        isSelectAll: false,
        lineFieldsData: _lineFieldsData,
        lineFieldsSearchData: _lineFieldsSearchData,
      });
    }
  };

  onSearchChange = (key: any) => {
    this.setState({ searchKey: key });
  };

  onSearch = () => {
    const { searchKey, lineFieldsData, expandFieldsData } = this.state;

    if (searchKey) {
      this.setState({
        isSearch: true,
        lineFieldsSearchData: lineFieldsData.filter(
          (item: any) => item.name.indexOf(searchKey) !== -1,
        ),
        expandFieldsSearchData: expandFieldsData.filter(
          (item: any) => item.name.indexOf(searchKey) !== -1,
        ),
      });
    } else {
      this.setState({
        isSearch: false,
        lineFieldsSearchData: lineFieldsData,
        expandFieldsSearchData: expandFieldsData,
      });
    }
  };

  onOk = () => {
    const { lineFieldsData, expandFieldsData } = this.state;

    const lineFields = lineFieldsData
      .filter((item: any) => item.checked)
      .map((item: any) => item.id);

    const expandFields = expandFieldsData
      .filter((item: any) => item.checked)
      .map((item: any) => item.id);

    this.props.onChange({ lineFields, expandFields });
    this.setState({
      visible: false,
      isSearch: false,
      searchKey: '',
      isSelectAll: false,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
      isSearch: false,
      searchKey: '',
      isSelectAll: false,
    });
  };

  customRenderLineFieldItem = (item: any, index: number) => (
    <Tag
      weId={`${this.props.weId || ''}_qiptx1`}
      key={index}
      type={item.checked ? 'primary' : 'default'}
      disabled={item.fixed}
      checked={item.checked}
      onCheck={(checked: boolean) => this.onLineFieldCheck(item.id, checked)}
    >
      {item.name}
    </Tag>
  );

  customRenderExpandFieldItem = (item: any, index: number) => (
    <Tag
      weId={`${this.props.weId || ''}_u2ma5j`}
      key={index}
      type={item.checked ? 'primary' : 'default'}
      checked={item.checked}
      onCheck={(checked: boolean) => this.onExpandFieldCheck(item.id, checked)}
    >
      {item.name}
    </Tag>
  );

  getButtons = () => {
    const { searchKey } = this.state;

    const buttons = [];
    buttons.push(
      <Input
        weId={`${this.props.weId || ''}_f4a11l@search`}
        key="all"
        style={{ width: 200 }}
        suffix={
          <Icon
            weId={`${this.props.weId || ''}_jp0td5@search`}
            name="Icon-search"
            style={{ cursor: 'pointer' }}
            onClick={this.onSearch}
          />
        }
        placeholder={getLabel('57387', '输入字段搜索')}
        value={searchKey}
        onChange={this.onSearchChange}
        onPressEnter={this.onSearch}
      />,
    );
    return buttons;
  };

  getFooter = () => {
    const footer = [];
    if (this.state.isSelectAll) {
      footer.push(
        <Button
          weId={`${this.props.weId || ''}_sjkqt5@cancelall`}
          key="all"
          type="link"
          style={{ float: 'left', lineHeight: '28px' }}
          onClick={this.onCancelSelectAll}
        >
          {getLabel('66476', '取消全选')}
        </Button>,
      );
    } else {
      footer.push(
        <Button
          weId={`${this.props.weId || ''}_h7xtvd@all`}
          key="all"
          type="link"
          style={{ float: 'left', lineHeight: '28px' }}
          onClick={this.onSelectAll}
        >
          {getLabel('55945', '全选')}
        </Button>,
      );
    }
    footer.push(
      <Button
        weId={`${this.props.weId || ''}_2y4bpe@ok`}
        key="ok"
        type="primary"
        onClick={this.onOk}
      >
        {getLabel('40565', '确定')}
      </Button>,
    );
    footer.push(
      <Button weId={`${this.props.weId || ''}_rso1th@cancel`} key="cancel" onClick={this.onClose}>
        {getLabel('53937', '取消')}
      </Button>,
    );
    return footer;
  };

  render() {
    const { client, listStyle } = this.props;
    const {
      visible, isSearch, lineFieldsSearchData, expandFieldsSearchData,
    } = this.state;

    return (
      <div>
        <Dialog
            weId={`${this.props.weId || ''}_9h29cb`}
            visible={visible}
            title={getLabel('53958', '显示字段配置')}
            closable
            destroyOnClose
            mask
            icon={dlgIconName}
            maskClosable
            width={600}
            onClose={this.onClose}
            buttons={this.getButtons()}
            footer={this.getFooter()}
          >
            <div className={`${clsPrefix}-business-list-show-fields`}>
              {client !== 'MOBILE' && listStyle !== 'table' && (
                <div className={`${clsPrefix}-business-list-show-fields-title`}>
                  <span>{getLabel('53959', '行显示')}</span>
                </div>
              )}
              <List
                weId={`${this.props.weId || ''}_gx9fwo`}
                className={`${clsPrefix}-business-list-show-fields-list`}
                direction="row"
                sortable={!isSearch && client !== 'MOBILE'}
                onSortEnd={this.onLineFieldsSort}
                data={lineFieldsSearchData}
                customRenderContent={this.customRenderLineFieldItem}
              />
              {client !== 'MOBILE' && listStyle !== 'table' && (
                <div className={`${clsPrefix}-business-list-show-fields-title`}>
                  <span>{getLabel('53960', '折叠显示')}</span>
                </div>
              )}
              {client !== 'MOBILE' && listStyle !== 'table' && (
                <List
                  weId={`${this.props.weId || ''}_4v0pk0`}
                  className={`${clsPrefix}-business-list-show-fields-list`}
                  direction="row"
                  sortable={!isSearch}
                  onSortEnd={this.onExpandFieldsSort}
                  data={expandFieldsSearchData}
                  customRenderContent={this.customRenderExpandFieldItem}
                />
              )}
            </div>
          </Dialog>
        <Button
          weId={`${this.props.weId || ''}_zc9wiq`}
          type="default"
          style={{ width: '100%' }}
          onClick={this.onClick}
        >
          <span>{getLabel('53961', '设置显示字段')}</span>
        </Button>
      </div>
    );
  }
}
