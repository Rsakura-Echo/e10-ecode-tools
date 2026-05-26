
import { regOvProps } from '@weapp/utils';


regOvProps('weappUi', 'Menu', props => {

  if (props.weId === '_7yuy3s_tohrsj_7q7xj9_xaqssl_csvzoq_25n8rk_kja3bn_aeh7j2') {
    // 过滤日志相关的菜单项
    props.data = props.data.filter(d => d.id !== 'operationLog');
  }

  return props;

});