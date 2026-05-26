import { regOvProps } from '@weapp/utils';

regOvProps('weappUi', 'Dialog', (props) => {
  // console.log('props.title::::::',props.title)
  if (props.title == '新建会议') {
    props = {
      ...props,
      defaultInnerScale: true
    }

  }
  return props;
}, 0);




regOvProps('weappUi', 'FormItem', (props) => {
  
  if (props.id && props.id == 'otherMember') {
    console.log('props.',props)
    props.hoverEdit = false
    props['item']['otherMember']['readOnly'] = false;
    props.item = {
      
    }

  }
  return props;
}, 0);