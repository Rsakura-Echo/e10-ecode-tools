import React from 'react';
import { getLabel } from '@weapp/utils';
import {clsPrefix} from './config/config'
import ViewContent from './ViewContent';
import BusinessListPagination from './BusinessListPagination';
import {getMobileBottomOperatBtns} from './constant';

const MDesign = (props) => {
  const { config } = props;
  const getInstance = ()=>{
    return {};
  }
  const onPaginationChange = ()=>{

  }
  return (
    <ViewContent
      weId={`${props.weId || ''}_m8h9qo`}
      config={props.config}
      getInstance={getInstance}
      onPaginationChange={onPaginationChange}
      showType="design"
      isMobile
    />
  );
};

// 自定义组件props不要使用type字段，type字段会被赋值当前组件的类型
// 设置默认值设计器才会有默认配置
MDesign.defaultProps = {
  config: {
    title: getLabel('54622', '文档列表'),
      titleEnabled: true,
      footerEnabled: true,
      showBottomOperatBtnConfig: true,
      bottomOperatBtns: {
        enabled: true,
        alignType: 'CENTER',
        btns: getMobileBottomOperatBtns(),
      },
      pageSize: 5,
      fixedArea: '0',
      showFields: { lineFields: ['name', 'manager', 'createTime'], expandFields: [] },
      orderFields: [],
      searchModel: '0',
      searchCategory: 'mine',
      searchConditions: [],
  }
};

// 定制化配置流式布局的默认属性
MDesign.flow = {
  defaultProps: {
    config: {
      
    }
  }
};

// grid布局的组件需要设置属性defaultOpts
MDesign.defaultOpts = {
  operationBtns: true,
    mask: true,
    layoutSizes: { mgl: { h: 300 } },
};
const newDesgin = weappEbdcoms.createDesign().default('DocumentListTest')(MDesign);

export default newDesgin;