


import { regOvProps } from '@weapp/utils';



let hasChange = false;

regOvProps('weappUi', 'Menu', props => {

  if (props.weId === "nhmd9p_yx1mh9_lxokyd_r791e6_puerlt_2aq861_4d6brw") {
    let oldChange = props.onChange;
    props.onChange = (e) => {
      hasChange = true;
      oldChange(e);
    }
    if (props.value != '2' && !hasChange) {
      props.onChange('2');
    }
  }

  return props;
})
