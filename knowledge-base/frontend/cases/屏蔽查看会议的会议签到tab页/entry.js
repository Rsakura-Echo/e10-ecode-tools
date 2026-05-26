




import { regOvProps } from '@weapp/utils';


regOvProps('weappUi', 'Menu', props => {

  if (props.weId === '903dhc_leid4e_794hn9_5vk7h7_0hbazc_0rac2k_pnhv5o_4d6brw') {
    props.data = props.data.filter(x => x.id !== 'sign');
  }

  return props;
});


