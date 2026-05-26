import React from 'react';
import { getLabel } from '@weapp/utils';
import {clsPrefix} from './config/config'
import ViewContent from './ViewContent';
import BusinessListPagination from './BusinessListPagination';
import {getBottomOperatBtns} from './constant';
import {deepEqual} from './utils';

class Design extends React.Component{

  getInstance = ()=>{
    return {};
  }
  onPaginationChange = ()=>{
    
  }



  render(){
    const { config } = this.props;
    console.log(config)
    return (
      <ViewContent
        weId={`${this.props.weId || ''}_m8h9qo`}
        config={this.props.config}
        getInstance={this.getInstance}
        onPaginationChange={this.onPaginationChange}
        showType="design"
      />
    );
  }
};



// 自定义组件props不要使用type字段，type字段会被赋值当前组件的类型
// 设置默认值设计器才会有默认配置
Design.defaultProps = {
  config: {
      title: getLabel('54622', '文档列表'),
      titleEnabled: true,
      footerEnabled: true,
      pageSize: 5,
      listStyle: '0',
      showFields: { lineFields: ['name', 'manager', 'createTime'], expandFields: [] },
      orderFields: [],
      searchModel: '0',
      searchCategory: 'mine',
      searchConditions: [],
      dataType:'default',
      bottomOperatBtns:{
        btns:getBottomOperatBtns(),
        enabled:true,
        alignType:"CENTER"
       },
    },
};

// 看代码逻辑grid布局的组件必须设置属性defaultOpts.layoutSizes
Design.defaultOpts = {
   padding: false,
    operationBtns: true,
    
    layoutSizes: {
      gl: {
        w: 6,
        h: 26,
      },
    },
    // customOperations,
    helpInfo: {
      content: getLabel('153710', '点击查看帮助'),
      refLink: '',
    },
};

//一般情况下直接 export default Design即可，用下面的导出方式主要使用标准的标题和底部栏的功能
const newDesgin = weappEbdcoms.createDesign().default('DocumentListTest')(Design);

export default newDesgin;