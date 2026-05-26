
import { regOvProps } from '@weapp/utils';
import axios from 'axios';

/**
 * 调整 “我发起的审批” 表格模式下列表页面展示的每页条数
 * 配合接口拦截
 */

const weIds = [
  "f56o40_9d1m87_crs1an_lcktvw_8d2ywu_i83sct"
];

regOvProps('weappUi', 'Table', (props) => {
  if (weIds.includes(props.weId)) {
    if (props.pageInfo) {
      props.pageInfo.pageSize = 100;
    }
    
  }
  return props;
});

// 拦截表格的数据请求接口，修改页数
const tableUrls = [
  "/api/workflow/list/total/getMineListTotal",
  "/api/workflow/list/data/getMineListData"
]
axios.interceptors.request.use(config => {
  try {
    const { url, data } = config;
    if (tableUrls.includes(url)) {
      // 修改每页条数
      data.pageSize = 100;
    }
    config.data = data;
  } catch (err) {
    console.error('表格拦截异常 => ', err);
  }
  return config;
});