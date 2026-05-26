
import { regOvProps } from '@weapp/utils';



function customChild (child) {
  if (child.props && child.props.weId === '5jvp5y') {
    child.props.outer = false;
    child.props.right = true;
  }
  return child;
}

regOvProps('weappUi', 'Layout', props => {
  if (props.weId === '8hn3jx' &&  props.className === 'weapp-main-container') {
    if (!props.customChild) {
      props.customChild = customChild;
    }
  }
  return props;
});
