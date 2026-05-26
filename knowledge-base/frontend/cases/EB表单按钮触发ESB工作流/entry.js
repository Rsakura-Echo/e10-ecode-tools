// ==========================================
// 业务表单自定义按钮 → 自定义弹窗 → ESB 工作流
// ==========================================

const showCustomDialog = () => {
  const { Dialog, Button, DatePicker } = window.weappUi;

  let startDate = null;
  let endDate = null;

  // 创建挂载点
  const wrap = document.createElement('div');
  wrap.setAttribute('id', 'dialogid_0001');
  document.body.appendChild(wrap);

  // 销毁函数
  const destroy = () => {
    const _div = document.getElementById('dialogid_0001');
    if (!_div) return false;
    const unmount = ReactDOM.unmountComponentAtNode(_div);
    if (unmount && _div.parentNode) {
      _div.parentNode.removeChild(_div);
    }
    return true;
  };

  // 确认回调：校验 → 触发工作流 → 关闭
  const onOk = () => {
    if (!startDate || !endDate) {
      window.weappUi.Dialog.message({ type: 'error', content: '请选择时间范围' });
      return;
    }
    triggerWorkflow(startDate, endDate);
    destroy();
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
        <div style={{ marginBottom: 16 }}>
          <span>起始时间：</span>
          <DatePicker
            onChange={(date) => { startDate = date; }}
            placeholder="请选择起始时间"
          />
        </div>
        <div>
          <span>结束时间：</span>
          <DatePicker
            onChange={(date) => { endDate = date; }}
            placeholder="请选择结束时间"
          />
        </div>
      </div>
    </Dialog>
  );

  ReactDOM.render(dlg, wrap);
};

// ESB 工作流触发
const triggerWorkflow = (startTime, endTime) => {
  request({
    url: '/api/esb/server/event/triggerActionFlow',
    method: 'POST',
    data: {
      customParams: {
        mainTable: {},
        startTime,
        endTime,
      },
      moduleSource: 'ecode',
      esbFlowId: 'your_workflow_id',
    },
  }).then((res) => {
    if (res.resultCode && res.resultCode == '200') {
      window.weappUi.Dialog.message({ type: 'success', content: '工作流触发成功' });
    } else {
      window.weappUi.Dialog.message({ type: 'error', content: '工作流触发失败' });
    }
  }).catch(() => {
    window.weappUi.Dialog.message({ type: 'error', content: '请求异常' });
  });
};

// 注册到 window，供 eb 表单按钮事件调用
window.Cutsom_createDialog = showCustomDialog;
