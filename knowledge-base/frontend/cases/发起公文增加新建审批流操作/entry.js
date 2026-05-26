
import { regOvProps, history } from '@weapp/utils';

regOvProps('weappUi', 'Title', props => {
  if (props.weId === '_0bz2u7_0prheo_450lj9_fvrpjl_z3c8nu') {
    const { weappUi: { Button, Dialog } } = window;
    const origin = props.customRenderRight;
    props.customRenderRight = () => {
      return <div className="ecode-title-right">
        <div>
          <Button onClick={() => {
            history.push(`/odoc/odocsetting/workflowPath/addPath/dialog`);
          }}>创建审批</Button>
        </div>
        <div>{origin && origin()}</div>
      </div>
    }
  }
  return props;
})
