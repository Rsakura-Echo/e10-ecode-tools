



import { regOvProps } from '@weapp/utils';

regOvProps('weappUi', 'RichText', props => {

  if (props.weId === '_t9okjz_9xfl6w_kqniv7_vwa53s_ekjbfm_1fvoc8_yeu8qh') {
    
    if (Array.isArray(props.extendsConfig)) {
      for (let i = 0; i < props.extendsConfig.length; i++) {
        if (props.extendsConfig[i].name === 'imageUpload') {
          // 添加文件大小限制
          props.extendsConfig[i].comProps.maxSize = 1; // 限制1M大小
          props.extendsConfig[i].comProps.customErrorInfo = (file, type) => {
            if (type === 2) {
              weappUi.Dialog.message({ type: 'error', content: '文件大小超出限制[1MB]' });
            }
          }
        }
      }
    }

  }
  return props;
});
