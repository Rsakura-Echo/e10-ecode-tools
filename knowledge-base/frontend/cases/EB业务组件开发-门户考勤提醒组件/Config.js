// import React from 'react';

// 如果返回组件，需要是类组件
// class Config extends React.PureComponent {
//   render() {
//     return <div>ecode custom config component demo</div>
//   }
// }

const Config = (data, store) => {
  // console.log('@@@@ config params', data, store)
  return Promise.resolve({
    items: {
      content: {
        label: '内容',
        itemType: 'INPUT',
        labelSpan: 7,
        style: { width: '100%' },
      },
      btnType: {
        label: '类型',
        itemType: 'SELECT',
        labelSpan: 7,
        style: { width: '100%' },
        data: [
          { id: 'primary', content: '默认' },
          { id: 'danger', content: '警告' },
        ],
      },
    },
    mini: {},
    formatFormDatas: (_data) => {
      // console.log('@@@@ config formatFormDatas', _data)
      return {
        ..._data,
        field1: 'hello world',
        field2: 'fileType'
      }
    }
  })
}

// const Config = (data, store) => {
//   console.log('@@@@ config params', data, store)
//   return {
//     items: {}
//   }
// }
export default Config

// flow布局支持三种定义方式