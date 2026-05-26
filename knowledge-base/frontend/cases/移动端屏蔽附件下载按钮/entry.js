



import { regOvProps } from '@weapp/utils';


regOvProps('weappUi', 'MDialog', props => {
  if (props.weId === "_mgmdx4") {
    // 判断是否是MActionSheet
    if (Array.isArray(props.children.props.options)) {
      // console.info(props.children.props.options);
      props.children.props.options = props.children.props.options.filter(x => {
        return x.id !== 'download';
      })
    }
  }
  return props;
});
