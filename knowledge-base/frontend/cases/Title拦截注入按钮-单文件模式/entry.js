// entry.js（前置加载）
import React from 'react';
import ReactDOM from 'react-dom';
import { regOvProps, request } from '@weapp/utils';

const titleWeId = "实际Title的完整weId";

// 弹窗函数：直接写在 entry.js 中，通过 window.weappUi 访问组件
const showTextDateDialog = () => {
  const { Dialog, Button, Input, DatePicker } = window.weappUi;

  let textValue = '';
  let dateValue = null;

  const wrap = document.createElement('div');
  const dialogId = 'dialog-text-date-' + Date.now();
  wrap.setAttribute('id', dialogId);
  document.body.appendChild(wrap);

  const destroy = () => {
    const div = document.getElementById(dialogId);
    if (!div) return;
    ReactDOM.unmountComponentAtNode(div);
    if (div.parentNode) div.parentNode.removeChild(div);
  };

  const onOk = () => {
    if (!textValue.trim()) {
      Dialog.message({ type: 'error', content: '请输入文本内容' });
      return;
    }
    if (!dateValue) {
      Dialog.message({ type: 'error', content: '请选择日期' });
      return;
    }
    request({
      method: 'post',
      url: '/api/secondev/your-endpoint',
      data: { text: textValue.trim(), date: dateValue },
    }).then((res) => {
      if (res?.data?.status) {
        Dialog.message({ type: 'success', content: '提交成功' });
        destroy();
      }
    });
  };

  const dialog = (
    <Dialog visible title="请输入信息" placement="middle" closable
      destroyOnClose draggable maskClosable mask onClose={destroy} width={480}
      footer={[
        <Button key="cancel" onClick={destroy}>取消</Button>,
        <Button key="confirm" type="primary" onClick={onOk}>确认</Button>,
      ]}
    >
      <div>
        <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center' }}>
          <span style={{ width: 80, flexShrink: 0 }}>文本内容：</span>
          <Input placeholder="请输入" onChange={(val) => { textValue = val; }} allowClear />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ width: 80, flexShrink: 0 }}>日期选择：</span>
          <DatePicker placeholder="请选择日期" onChange={(val) => { dateValue = val; }} />
        </div>
      </div>
    </Dialog>
  );

  ReactDOM.render(dialog, wrap);
};

regOvProps('weappUi', 'Title', (props) => {
  if (props.weId === titleWeId) {
    const Button = window.weappUi?.Button;
    if (Button) {
      const customButton = (
        <Button key="custom-btn" type="primary" onClick={showTextDateDialog}>
          自定义弹窗
        </Button>
      );
      props.buttons = [customButton, ...props.buttons];
    }
  }
  return props;
}, 0);
