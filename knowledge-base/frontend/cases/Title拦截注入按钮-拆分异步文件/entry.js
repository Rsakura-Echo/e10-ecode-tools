// entry.js（前置加载）
import React from 'react';
import { regOvProps } from '@weapp/utils';
import { asyncImport } from '@weapp/ecodesdk';

const titleWeId = "实际Title的完整weId";

// asyncImport 必须在顶层预加载，不能放在 onClick 回调内！
const dialogModulePromise = asyncImport('${appId}', 'DateDialog');

regOvProps('weappUi', 'Title', (props) => {
  if (props.weId === titleWeId) {
    const Button = window.weappUi?.Button;
    if (Button) {
      const customButton = (
        <Button
          key="custom-btn"
          type="primary"
          onClick={() => {
            // 模块已在顶层预加载，这里直接 .then() 取结果
            dialogModulePromise.then((mod) => {
              mod?.showTextDateDialog?.();
            });
          }}
        >
          自定义弹窗
        </Button>
      );
      props.buttons = <>{customButton}{props.buttons}</>;
    }
  }
  return props;
}, 0);
