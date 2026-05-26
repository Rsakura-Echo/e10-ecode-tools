

import { regOvProps } from '@weapp/utils';


regOvProps('weappUi', 'RichText', props => {
  

  if (props.weId === "3rdcst_oxa9w7_i8bbvp_vc1wev_kc1m3l_r1vh81_r5zpkx_3xq1vk_06go13_rlyf8v_n9lpa7_san7t1_a1buzg") {

    const font_zh = "方正小标宋简体/FZXiaoBiaoSong-B05S;;宋体/SimSun;新宋体/NSimSun;仿宋/FangSong;楷体/KaiTi;仿宋_GB2312/FangSong_GB2312;" +
      "楷体_GB2312/KaiTi_GB2312;黑体/SimHei;华文细黑/STXihei;华文楷体/STKaiti;华文宋体/STSong;华文中宋/STZhongsong;" +
      "华文仿宋/STFangsong;华文彩云/STCaiyun;华文琥珀/STHupo;华文隶书/STLiti;华文行楷/STXingkai;华文新魏/STXinwei;" +
      "方正舒体/FZShuTi;方正姚体/FZYaoti;细明体/MingLiU;新细明体/PMingLiU;" +
      "微软雅黑/Microsoft YaHei;微软正黑/Microsoft JhengHei;";

    props.ckConfig.font_names = font_zh;
  }

  return props;

});