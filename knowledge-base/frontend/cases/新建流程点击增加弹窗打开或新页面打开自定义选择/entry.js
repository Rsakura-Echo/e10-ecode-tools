import { regOvProps, history } from '@weapp/utils';



regOvProps('weappWorkflow', 'NewFlow', props => {

  if (props.weId === "f56o40_9d1m87_xk40pb_q3zd39_ox3s77") {
    props.onRowClick = (t, o, r) => {
      let instance = null;
      // 弹窗选择打开方式
      window.weappUi.Dialog.confirm({
        content: <>
          <div>流程打开方式</div>
          <div>{t.workflowname}</div>
        </>,
        height: 160,
        getInstance: (el) => instance = el, 
        footer: [
          <window.weappUi.Button type="primary" onClick={() => {
            // 侧边弹窗打开
            history.push(`flowpage/rightCreate/${t.workflowid}`);
            instance?.onClose();
          }}>
            侧边弹窗
          </window.weappUi.Button>,
          <window.weappUi.Button type="primary" onClick={() => {
            window.open(`/sp/workflow/flowpage/fullCreate/${t.workflowid}?`)
            instance?.onClose();
          }}>
            独立页面
          </window.weappUi.Button>
        ]
      });
    }
  }
  return props;
});