import { getLabel } from '@weapp/utils';
import React from 'react';
import DataSearchConfig from './common/DataSearchConfig';
// import OrderFieldsConfig from './common/OrderFieldsConfig';
import PageSizeConfig from './common/PageSizeConfig';
import ShowFieldsConfig from './common/ShowFieldsConfig';
import { clsPrefix } from './config/config';
import {CorsComponent} from '@weapp/ui';
import {
  expandFields,
  lineFields,
  mobileFields,
  orderFields,
  searchCategorys,
  searchFields,
  searchModels,
} from './cfolder/fields';
import transform from './cfolder/transform';

const pageSizeRender = (props: any) => (
  <PageSizeConfig
    compName={"PageSizeConfig"}
    app="@weapp/ebdcoms"
    weId={`${props.weId || ''}_wcljc2`}
    value={props.value}
    onChange={props.onChange}
  />
);

const showFieldsRender = (props: any) => {
  const { client, form = {},config } = props;
  const {datasetFields,dataType} = config;
  const { datas = {} } = form;
  const { listStyle } = datas;
  return (
    <ShowFieldsConfig
      compName={'ShowFieldsConfig'}
      app="@weapp/ebdcoms"
      weId={`${props.weId || ''}_472ib0`}
      client={client}
      listStyle={listStyle}
      lineFields={dataType==='default'?client === 'MOBILE' ? mobileFields : lineFields:datasetFields}
      expandFields={dataType==='default'?expandFields:datasetFields}
      value={props.value}
      onChange={props.onChange}
    />
  );
};

const orderFieldsRender = (props: any) => {
  const { client, form = {},config } = props;
  const {datasetFields,dataType} = config;
  return (
    <CorsComponent
    app="@weapp/ebdcoms"
      compName={'OrderFieldsConfig'}
      weId={`${props.weId || ''}_5ev38y`}
      fields={dataType==='default'?orderFields:datasetFields}
      value={props.value}
      onChange={props.onChange}
    />
  )
};

const searchConditionsRender = (props: any) => (
  <DataSearchConfig
  app="@weapp/ebdcoms"
    compName={'DataSearchConfig'}
    weId={`${props.weId || ''}_vo1t7q`}
    fields={searchFields}
    value={props.value}
    onChange={props.onChange}
  />
);

const Config = (data, store) => {
  return Promise.resolve({
    /** 是否使用标题配置 */
    title: true,
    /** 是否使用底部区域配置 */
    footer: true,
    /** 是否使用固定区域配置 */
    fixedArea: true,
    /** 表单配置项，同公共组件Form，扩展属性参考下面定义的FormItemProps */
    groups: [
      {
        id: 'style',
        title: getLabel('84275', '展示样式'),
        visible: true,
        custom: false,
      },
      {
        id: 'showFields',
        title: getLabel('53855', '显示字段'),
        visible: true,
        custom: false,
      },
      {
        id: 'orderFields',
        title: getLabel('53856', '排序字段'),
        visible: true,
        custom: false,
      },
      {
        id: 'searchConfig',
        title: getLabel('53857', '数据过滤'),
        visible: true,
        custom: false,
      },
      {
        id: 'other',
        title: getLabel('55756', '其他'),
        visible: true,
        custom: false,
      },
    ],
    items: {
      pageSize: {
        label: getLabel('53858', '显示行数'),
        labelSpan: 8,
        itemType: 'CUSTOM',
        groupId: 'other',
        customRender: pageSizeRender,
      },
      listStyle: {
        label: getLabel('53859', '列表样式'),
        labelSpan: 8,
        itemType: 'SELECT',
        data: [
          { id: '0', content: getLabel('40502', '请选择') },
          { id: 'default', content: getLabel('53861', '默认样式') },
          { id: 'leftimg', content: getLabel('53863', '左图样式') },
        ],
        groupId: 'style',
      },
      showFields: {
        label: '',
        labelSpan: 0,
        itemType: 'CUSTOM',
        groupId: 'showFields',
        customRender: showFieldsRender,
      },
      orderFields: {
        label: '',
        labelSpan: 0,
        itemType: 'CUSTOM',
        groupId: 'orderFields',
        customRender: orderFieldsRender,
      },
      searchModel: {
        label: getLabel('53860', '过滤类型'),
        labelSpan: 8,
        itemType: 'SELECT',
        data: searchModels,
        groupId: 'searchConfig',
      },
      searchCategory: {
        label: getLabel('54579', '文档类型'),
        labelSpan: 8,
        itemType: 'SELECT',
        data: searchCategorys,
        groupId: 'searchConfig',
      },
      searchConditions: {
        label: '',
        labelSpan: 0,
        itemType: 'CUSTOM',
        groupId: 'searchConfig',
        customRender: searchConditionsRender,
      },
      docs: {
        label: getLabel('54581', '文档'),
        labelSpan: 8,
        itemType: 'BROWSER',
        browserBean: {
          module: 'doc',
          type: 'document',
          multiple: true,
        },
        className: `${clsPrefix}-business-list-config-browser`,
        groupId: 'searchConfig',
      },
    },
    customHide: function customHide(col, isMobile) {
      const formDatas = this.form.datas;
      if (col.id === 'fixedArea') {
        return { ...col, hide: !isMobile };
      }
      if (col.id === 'listStyle') {
        return { ...col, hide: isMobile };
      }
      if (col.id === 'searchCategory') {
        return { ...col, hide: formDatas.searchModel !== 'category' };
      }
      if (col.id === 'searchConditions') {
        return { ...col, hide: formDatas.searchModel !== 'condition' };
      }
      if (col.id === 'docs') {
        return { ...col, hide: formDatas.searchModel !== 'entity' };
      }
      return col;
    },
    // 联动刷新
    references: {
      searchModel: ['searchCategory', 'searchConditions', 'docs'],
      listStyle: ['listStyle'],
      fixedArea: ['fixedArea'],
      dataType:['showFields','orderFields'],
      datasetFields:['showFields','orderFields'],
    },
  });
};


Config.transform = transform;
export default Config;
