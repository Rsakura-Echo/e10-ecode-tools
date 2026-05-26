import React from 'react';
import { Button } from '@weapp/ui'
const Design = (props) => {
  console.log('demo Design props', props)
  const { config } = props
  return (
    <div>
      Mobile Design
      <Button radius type={config.btnType}>{config.content}</Button>
    </div>
  )
}

// 自定义组件props不要使用type字段，type字段会被赋值当前组件的类型
// 设置默认值设计器才会有默认配置
Design.defaultProps = {
  config: {
    content: '移動',
  }
}
// 定制化配置流式布局的默认属性
Design.flow = {
  defaultProps: {
    config: {
      btnType: 'primary'
    }
  }
}

// grid布局的组件需要设置属性defaultOpts
Design.defaultOpts = {
  operationBtns: true,
  mask: true,
  layoutSizes: {
    mgl: {
      w: 4,
      h: 30,
    },
  },
}

export default Design