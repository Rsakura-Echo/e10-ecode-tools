import { regOvProps } from '@weapp/utils';

regOvProps('weappUi', 'Dialog', (props) => {
  console.log('props.title::::::',props.wfCompName)
  if(props.wfCompName == 'CreateDialog' && props.app == '@weapp/workflow'){
      // props['defaultInnerScale'] = true;
      props = {
        ...props,
        defaultInnerScale: true,
        innerScale: true,
      }
  }
  return props;
}, 0);