
import { regOvProps } from '@weapp/utils';


// 处理input的边框
regOvProps('weappUi', 'Input', props => {
  props.className += ' ecode-border-show';
  return props;
})
