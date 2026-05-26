import React from 'react';
import axios from 'axios';
import { regOvComponent } from '@weapp/utils';


/**
 * 增加签字意见控制
 */
let isEnable = true;//启用总开关



regOvComponent('weappWorkflow', 'WfCommentTemplate',  (Com) => {
  return React.forwardRef((props, ref) => {
    const {data={}} = props;
    if(data.hasOwnProperty('className')){
      return (<Com {...props} wrapClassName={'cus-sub-comment'} />)
    }else {
      return (<Com {...props} />)
    }
  })
}, 0);

/**
 * 定义请求拦截
 */
axios.interceptors.request.use((config) => {
  try {
    const { url, data } = config;
    if (url.startsWith('/api/workflow/core/common/comment/commentPage')&&data&&data?.otherParam) { // 路径前缀匹配
      if(isEnable){
        config.data.otherParam = Object.assign(config.data.otherParam, {isShowSubComment:1});
      }
      return config;
    }
  } catch (e) {
    console.error('通用全局请求拦截异常 => ', e);
  }
  return config;
});
