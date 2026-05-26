
import { regOvProps } from '@weapp/utils';
import { toJS, runInAction } from 'mobx';

// 需要添加的应用
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
  show: true
}

// 应用添加到的类型
const cateType = "report";

/**
 * 复写更多应用中的属性，添加自定义应用
 */
regOvProps('weappLayout', 'AppDropMenusContent', props => {
  // 综合办公  "2223763746175704076"
  const data = toJS(props.data);
  console.info('data => ', data, props);
  
  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      const subData = toJS(data[i].data);
      if (Array.isArray(subData)) {
        const d = subData.data;
        for (let j = 0; j < subData.length; j++) {
          const d = subData[j];
          if (d.categoryType == cateType) {
            const menus = toJS(d.menus);
            if (Array.isArray(menus)) {
              // 添加到menus 中
              menus.push(addMenu);
            }
          }
        }
        data[i].data = subData;
      }
    }
    props.data = data;
  }
  return props;
});