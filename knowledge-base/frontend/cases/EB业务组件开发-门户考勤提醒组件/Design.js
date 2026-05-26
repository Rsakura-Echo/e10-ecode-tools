import React from 'react';
import PAelement from './coms/index'
import { getLocale } from '@weapp/utils';

// 绩效考核元素 Performance appraisal elements
class PAelementDesign extends React.Component {
  constructor(props) {
    super(props);
    getLocale('@weapp/ecode')
  }
  render() {
    let useType = 'Design'
    return (
      <div className="PA-element-799470791826276353">
        <PAelement useType={useType}/>
      </div>
    );
  }
}


// 自定义组件props不要使用type字段，type字段会被赋值当前组件的类型
// 设置默认值设计器才会有默认配置
PAelementDesign.defaultProps = {
  config: {
    content: '考核绩效元素内容',
    title:"考核绩效元素",
     titleEnabled: true,
  }
}
// 定制化配置流式布局的默认属性
PAelementDesign.flow = {
  defaultProps: {
    config: {
    }
  }
}

// 看代码逻辑grid布局的组件必须设置属性defaultOpts.layoutSizes
PAelementDesign.defaultOpts = {
  operationBtns: true,
  mask: true,
  layoutSizes: {
    gl: {
      w: 5,
      h: 21,
    },
  },
}


export default PAelementDesign;

