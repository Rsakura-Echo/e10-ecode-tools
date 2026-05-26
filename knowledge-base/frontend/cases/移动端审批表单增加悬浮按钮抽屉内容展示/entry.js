


import { regOvProps } from '@weapp/utils';
import { asyncImport } from '@weapp/ecodesdk';

const AsyncCom = React.lazy(() => asyncImport('${appId}', 'index'));
const Com = React.forwardRef((props, ref) => {
  return <React.Suspense fallback={() => {}}>
    <AsyncCom {...props} ref={ref} />
  </React.Suspense>
})


const execRender = (className, callback) => {
  let t = 0;
  const inter = setInterval(() => {
    const dom = document.querySelector(className);
    if (dom) {
      clearInterval(inter);
      callback();
    }
    if (t++ > 50) {
      console.error("获取节点" + className + ", 超时")
      clearInterval(inter);
    }
  }, 100);
}

regOvProps('weappWorkflow', 'MWeaForm', props => {  
  if (props.weId === "3rdcst_oxa9w7_af1w56_6rw4jw_9eb5e8_aua90q_bcw4pc_gi2t20_p06x7i_tij3ya_syvjg3_x3p9qc") {
    const { workflowId = '' } = props.match?.params || {};
    if (workflowId === "803567434566041609") {
      const dom = document.querySelector('.ecode-drawser-dom');
      if (!dom) {
        execRender('.mwffp-content', () => {
          const dom = document.querySelector('.ecode-drawser-dom');
          if (dom) return;
          const pdom = document.querySelector('.mwffp-content');
          const div = document.createElement('div');
          div.setAttribute('class', 'ecode-drawser-dom');
          // 在末尾追加
          pdom.appendChild(div);
          ReactDOM.render(<Com />, div);
        }); 
      }
    }

  }

  return props;

});


