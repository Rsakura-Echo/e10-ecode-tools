// 写法 B：forwardRef + useImperativeHandle（复杂场景）
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';

// 弹窗内部表单（管理自己的状态）
const DialogForm = forwardRef((props, ref) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { DatePicker } = window.weappUi;

  const handleConfirm = async () => {
    // 验证...
    // ESB 调用...
    props.onOk?.();
  };

  // 暴露 handleConfirm 给父级的 footer 按钮
  useImperativeHandle(ref, () => ({ handleConfirm }));

  return (
    <div>
      <DatePicker value={startDate} onChange={(v) => setStartDate(v)} placeholder="起始时间" />
      <DatePicker value={endDate} onChange={(v) => setEndDate(v)} placeholder="结束时间" />
      {error && <div className="...error">{error}</div>}
    </div>
  );
});

DialogForm.displayName = 'DialogForm';

// 命令式 API
export function showDateRangeDialog() {
  const { Dialog, Button } = window.weappUi;

  const wrap = document.createElement('div');
  wrap.setAttribute('id', 'dialog-' + Date.now());
  document.body.appendChild(wrap);

  const formRef = React.createRef();

  const destroy = () => {
    const div = document.getElementById(wrap.id);
    if (!div) return;
    ReactDOM.unmountComponentAtNode(div);
    if (div.parentNode) div.parentNode.removeChild(div);
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
        <Button key="confirm" type="primary" onClick={() => formRef.current?.handleConfirm()}>
          确认
        </Button>,
      ]}
    >
      <DialogForm ref={formRef} onOk={destroy} />
    </Dialog>
  );

  ReactDOM.render(dlg, wrap);
}
