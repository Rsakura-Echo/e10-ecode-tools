
import { regOvProps } from '@weapp/utils';


regOvProps('weappUi', 'Menu', props => {

  if (props.weId === '_0bz2u7_0prheo_osvn5b_0iejz9_eh1rtg_29no0r') {
    const { data = [] } = props;
    props.data = data.map(x => ({ ...x, disabled: x.id === 'send_batch_nothing_1' }));
    
  }
  return props;
})
