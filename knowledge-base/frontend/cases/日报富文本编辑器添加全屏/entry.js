
import { regOvProps } from '@weapp/utils';

regOvProps('weappUi', 'RichText', props => {
  if (props.weId === "_t9okjz_9xfl6w_kqniv7_vwa53s_ekjbfm_1fvoc8_yeu8qh") {
    props.ckConfig.extraPlugins += ',maximize';
    props.ckConfig.toolbar[0] && props.ckConfig.toolbar[0].push('Maximize');
  }
  // console.info(props);
  return props;
});


