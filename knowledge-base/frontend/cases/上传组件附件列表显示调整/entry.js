
import { regOvProps } from '@weapp/utils';


const renderItem = (x) => {
  return <div className="upload-list-item" title={x.name}>
    { x.name }
  </div>
}

const renderList = (data) => {
  return <div className="upload-list">
    { data.map(x => renderItem(x)) }
  </div>;
}

/**
 * 复写上传列表
 */
regOvProps('weappUi', 'Upload', props => {
  if (props.weId === 'f56o40_9d1m87_xk40pb_86j9zh_l62wzb_6n3gm4_snhw9p_3r9w93_g28s4n_6k3ebq_wwdgte') {
    props.renderListUploaded = renderList;
  }
  return props;
});
