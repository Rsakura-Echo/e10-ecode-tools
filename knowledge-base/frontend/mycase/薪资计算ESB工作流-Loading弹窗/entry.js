// ==========================================
// 薪资计算：日期选择 → 确认弹窗 → Loading → ESB 工作流
// 来源：mycase（自有案例，生产验证）
// ==========================================

import React from 'react';
import ReactDOM from 'react-dom';
import { request } from '@weapp/utils';

// 日期格式化
const formatDate = (date) => {
  if (!date) return '';
  const d = date instanceof Date ? date : new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

// ==========================================
// Loading 弹窗（ESB 调用期间展示）
// ==========================================
const showLoading = () => {
  hideLoading();

  const wrap = document.createElement('div');
  wrap.setAttribute('id', 'ecode_loading_overlay');
  wrap.innerHTML = `
    <div style="
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.45);
      display: flex; align-items: center; justify-content: center;
      z-index: 10000;
    ">
      <div style="
        background: #fff;
        border-radius: 8px;
        padding: 40px 56px;
        text-align: center;
        box-shadow: 0 4px 24px rgba(0,0,0,0.15);
      ">
        <div style="
          width: 40px; height: 40px;
          margin: 0 auto 16px;
          border: 3px solid #e8e8e8;
          border-top-color: #1890ff;
          border-radius: 50%;
          animation: ecodeSpin 0.8s linear infinite;
        "></div>
        <p style="color: #333; font-size: 14px; margin: 0;">薪资计算中...请稍后</p>
      </div>
    </div>
  `;

  if (!document.getElementById('ecode_loading_style')) {
    const style = document.createElement('style');
    style.setAttribute('id', 'ecode_loading_style');
    style.textContent = '@keyframes ecodeSpin { to { transform: rotate(360deg); } }';
    document.head.appendChild(style);
  }

  document.body.appendChild(wrap);
};

const hideLoading = () => {
  const el = document.getElementById('ecode_loading_overlay');
  if (el && el.parentNode) {
    el.parentNode.removeChild(el);
  }
};

// ==========================================
// 第二步：确认弹窗
// ==========================================
const showConfirmDialog = (startTime, endTime) => {
  const { Dialog, Button } = window.weappUi;

  const wrap = document.createElement('div');
  wrap.setAttribute('id', 'dialogid_confirm');
  document.body.appendChild(wrap);

  const destroy = () => {
    const div = document.getElementById('dialogid_confirm');
    if (!div) return;
    ReactDOM.unmountComponentAtNode(div);
    if (div.parentNode) div.parentNode.removeChild(div);
  };

  const onConfirm = () => {
    showLoading();
    destroy();
    triggerWorkflow(startTime, endTime);
  };

  const dlg = (
    <Dialog
      visible
      title="确认计算薪资"
      placement="middle"
      closable
      destroyOnClose
      draggable
      maskClosable
      mask
      onClose={destroy}
      width={520}
      footer={[
        <Button key="cancel" onClick={destroy}>取消</Button>,
        <Button key="confirm" type="primary" onClick={onConfirm}>开始计算</Button>,
      ]}
    >
      <div>
        <p style={{ marginBottom: 12 }}>
          薪资计算前需先维护好当前周期内假勤数据，请确认维护完毕。
        </p>
        <p style={{ marginBottom: 12 }}>
          维护地址：
          <a href="xxxx" target="_blank" rel="noreferrer">xxxx</a>
        </p>
        <p>
          当前计薪周期为：{formatDate(startTime)} 至 {formatDate(endTime)}，是否开始计算薪资？
        </p>
      </div>
    </Dialog>
  );

  ReactDOM.render(dlg, wrap);
};

// ==========================================
// 第一步：日期选择弹窗
// ==========================================
const showCustomDialog = () => {
  const { Dialog, Button, DatePicker } = window.weappUi;

  let startDate = null;
  let endDate = null;

  const wrap = document.createElement('div');
  wrap.setAttribute('id', 'dialogid_0001');
  document.body.appendChild(wrap);

  const destroy = () => {
    const div = document.getElementById('dialogid_0001');
    if (!div) return;
    ReactDOM.unmountComponentAtNode(div);
    if (div.parentNode) div.parentNode.removeChild(div);
  };

  const onOk = () => {
    if (!startDate || !endDate) {
      window.weappUi.Dialog.message({ type: 'error', content: '请选择时间范围' });
      return;
    }
    if (endDate < startDate) {
      window.weappUi.Dialog.message({ type: 'error', content: '结束日期不能早于开始日期' });
      return;
    }
    destroy();
    showConfirmDialog(startDate, endDate);
  };

  const dlg = (
    <Dialog
      visible
      title="请输入条件"
      placement="middle"
      closable
      destroyOnClose
      draggable
      maskClosable
      mask
      onClose={destroy}
      width={500}
      footer={[
        <Button key="cancel" onClick={destroy}>取消</Button>,
        <Button key="confirm" type="primary" onClick={onOk}>确认</Button>,
      ]}
    >
      <div>
        <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center' }}>
          <span style={{ width: 80, flexShrink: 0 }}>起始时间：</span>
          <DatePicker
            maxDate={new Date()}
            onChange={(date) => { startDate = date; }}
            placeholder="请选择起始时间"
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ width: 80, flexShrink: 0 }}>结束时间：</span>
          <DatePicker
            maxDate={new Date()}
            onChange={(date) => { endDate = date; }}
            placeholder="请选择结束时间"
          />
        </div>
      </div>
    </Dialog>
  );

  ReactDOM.render(dlg, wrap);
};

// ==========================================
// ESB 工作流调用（含 loading 状态管理）
// ==========================================
const triggerWorkflow = (startTime, endTime) => {
  request({
    url: '/api/esb/server/event/triggerActionFlow',
    method: 'POST',
    data: {
      customParams: { mainTable: {} },
      moduleSource: '#可选',
      esbFlowId: '846583664090419200',
    },
  }).then((res) => {
    hideLoading();
    if (res.resultCode && res.resultCode == '200') {
      console.log(res);
      window.weappUi.Dialog.message({ type: 'success', content: '薪资计算成功' });
    } else {
      console.log(res);
      window.weappUi.Dialog.message({ type: 'error', content: '薪资计算失败' });
    }
  }).catch(() => {
    hideLoading();
    window.weappUi.Dialog.message({ type: 'error', content: '请求异常' });
  });
};

// 注册到 window，供 eb 表单按钮事件调用
window.Cutsom_createDialog = showCustomDialog;
