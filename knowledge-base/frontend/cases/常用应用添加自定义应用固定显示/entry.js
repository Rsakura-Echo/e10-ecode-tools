import { regOvProps } from '@weapp/utils';
import { toJS } from 'mobx';


const addMenu = {
  detail: "新添加的自定义应用",
  icon: "",
  id: "ecode-app-0",
  menuId: "8515234334180228185",
  menuname: "ecode自定义应用",
  module: "workflow",
  moduleLinkId: "8515234334180218686",
  path: "/ebdapp/view/774456485683027969",
  personal: false,
  shortname: "ecode-cust-app",
  status: false,
}

/**
 * 拦截顶部常用应用
 */
regOvProps('weappLayout', 'AppDropMenusFrequent', props => {
  if (props.weId === "bgdcna_sc2opf_caf54a_hlezse_zxcr21") {
    console.info('frequent =>', props);
    // 在props data 中添加 数据
    props.data.push(addMenu.id);
    // 在allAppMenusIdMap 中添加数据
    props.allAppMenusIdMap[addMenu.id] = addMenu;
  }
  return props;
});
