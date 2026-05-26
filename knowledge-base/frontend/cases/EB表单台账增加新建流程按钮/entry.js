
import { regOvProps } from '@weapp/utils';
import React from 'react';

let times = 0;

regOvProps('weappEbdfpage', 'TableViewContent', (props) => {
  if (times++ === 0 && '757248033400897545' == props.match.params.viewId) {
    // 添加新建流程操作按钮
    // 通过这里去注册Title 组件
    regOvProps('weappUi', 'Title', titleProps => {
      if (location.pathname.indexOf('/ebdapp/view/757247732706058240/search/757248033400897545-7975951054815764967') >= 0) {
        titleProps.buttons = React.Children.toArray(titleProps.buttons);
        titleProps.buttons.splice(0, 0, <window.weappUi.Button 
          onClick={() => {
            // 创建对应的流程
            if ('ebdfListSdk' in window) {
              const selectId: [] = window.ebdfListSdk.getCheckIds();
              if (selectId.length === 0) {
                window.weappUi.Dialog.message({ type: 'error', content: '请先选择数据' });  
              } else {
                // 跳转至流程创建页面，并添加流程默认值
                // 获取对应的数据
                const allData = window.ebdfListSdk.getListDatas();
                const selectData = allData.filter(x => selectId.includes(x.ebrecord_rowkey)).map(x => ({ field_1 }));
                const dataStr = JSON.stringify(selectData);
                window.open('/sp/workflow/flowpage/fullCreate/753541188819025921?data=' + encodeURIComponent(dataStr));
              }
            } else {
              window.weappUi.Dialog.message({ type: 'error', content: 'ebdfListSdk 加载未完成' });
            }
          }}
        >新建流程</window.weappUi.Button>);
      }
      return titleProps;
    });
  }
  return props;
}, 0);
