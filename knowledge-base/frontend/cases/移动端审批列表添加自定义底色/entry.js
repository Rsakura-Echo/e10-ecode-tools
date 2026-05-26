


import { regOvProps } from '@weapp/utils';
import { toJS } from 'mobx';


regOvProps('weappUi', 'MList', props => {

  if (props.weId === '3rdcst_oxa9w7_af1w56_6rw4jw_9eb5e8_aua90q_bcw4pc_gi2t20_6z6z0y_rvqt8o') {
    const { data = [] } = props;
    const dataJs = toJS(data);
    const oldRender = props.customRenderContent;
    props.customRenderContent = (rowData, rowIndex) => {
      return <div className={`ecode-mlist-wrap ${rowData.finish === true ? 'wf-over' : '' }`}>
        {oldRender?.(rowData, rowIndex)}
      </div>

    }

  }

  return props;

})
