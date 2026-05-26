// 写法 A：闭包变量（推荐，简单场景）
const showDialog = () => {
  const { Dialog, Button, DatePicker } = window.weappUi;

  let field1 = null;
  let field2 = null;

  const wrap = document.createElement('div');
  wrap.setAttribute('id', 'my-dialog');
  document.body.appendChild(wrap);

  const destroy = () => {
    const div = document.getElementById('my-dialog');
    if (!div) return;
    ReactDOM.unmountComponentAtNode(div);
    if (div.parentNode) div.parentNode.removeChild(div);
  };

  const onOk = () => {
    if (!field1 || !field2) {
      window.weappUi.Dialog.message({ type: 'error', content: '请填写完整' });
      return;
    }
    // 调用接口...
    destroy();
  };

  const dlg = (
    <Dialog
      visible
      title="标题"
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
          <span>字段1：</span>
          <DatePicker onChange={(val) => { field1 = val; }} placeholder="请选择" />
        </div>
        <div>
          <span>字段2：</span>
          <DatePicker onChange={(val) => { field2 = val; }} placeholder="请选择" />
        </div>
      </div>
    </Dialog>
  );

  ReactDOM.render(dlg, wrap);
};
