import { regOvProps } from '@weapp/utils';

regOvProps('weappUi', 'Tree', (props) => {
  const { weId=''} = props;
  if(weId && weId.endsWith('_wwbujf')){
    props.data = props.data.filter(item=>!['300','100'].includes(item.id))
  }
  return props;
}, 0);