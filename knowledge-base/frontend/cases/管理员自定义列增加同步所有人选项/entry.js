



import { regOvProps } from '@weapp/utils';



regOvProps('weappUi', 'Dialog', props => {

  if (props.weId === "f56o40_9d1m87_crs1an_lcktvw_8d2ywu_i83sct_97tb0x") {
    if (Array.isArray(props.footer)) {
      props.footer.unshift(<window.weappUi.Checkbox>同步所有人</window.weappUi.Checkbox>)
    }
  }

  return props;

})

