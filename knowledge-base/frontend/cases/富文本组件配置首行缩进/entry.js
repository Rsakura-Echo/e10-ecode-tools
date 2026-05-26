

import { regOvProps } from '@weapp/utils';


regOvProps('weappUi', 'RichText', props => {
  

  if (props.weId === "3rdcst_oxa9w7_i8bbvp_vc1wev_kc1m3l_r1vh81_r5zpkx_3xq1vk_06go13_rlyf8v_n9lpa7_san7t1_a1buzg") {

    const { ckConfig: { toolbar, extraPlugins } } = props;
    const hasTextIndent = toolbar && JSON.stringify(toolbar).indexOf("TextIndent") > -1;
    if (!hasTextIndent) {
      // 配置首行缩进按钮
      props.ckConfig.toolbar = Array.isArray(toolbar[0]) ? [[...toolbar[0], "-",'TextIndent']] : [
        ...toolbar,
        {
          name: 'TextIndent',
          items: ["TextIndent"],
        },
      ];
      // 加载相关插件 - 2002kb后默认已经加载textindent插件，不需要再单独加载
      props.ckConfig.extraPlugins = extraPlugins && extraPlugins !== '' ?  `textindent,${extraPlugins}` : 'textindent';
    }
  }

  return props;

});