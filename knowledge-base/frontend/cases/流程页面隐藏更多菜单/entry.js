import { regOvProps, regHook } from '@weapp/utils';

//流程开放文档地址：https://weapp.eteams.cn/sp/techdoc/doc/720609767701430272#34%E4%BF%AE%E6%94%B9%E6%8C%89%E9%92%AE%E5%90%8D%E7%A7%B0%E9%9A%90%E8%97%8F%E6%8C%89%E9%92%AE
let isFirst = true;
const ovFlowPagePropsFn = (props) => {
	//根据业务需求限定代码生效范围，常用参数含isCreate、workflowId、reqeustId、apiModule
	const { isCreate, workflowId, reqeustId, apiModule } = props.baseParam || {};
	//仅对指定工作流Id生效,如果不针对指定流程，直接为true即可，根据具体情况调整
	if (workflowId == '731260655157936133'||true) {
		//此时可以获取到sdk实例，操作js-sdk对象等
		const wffpSdk = window.weappWorkflow.getFlowPageSDK();
		//需要限制isFirst，多次render应该仅做一次事件注册
		//此处如果不包ready会导致保存不刷页面情况下，注册事件失效（下一步会提供不失效方案）
		isFirst && wffpSdk.ready(() => {
      //通过方法window?.weappWorkflow?.getFlowPageSDK?.()?.baseStore?.operMenus获取到流程的操作按钮的type;
      //如：事项群聊的type:MATTERS_GROUP
      wffpSdk.modifyOperMenu('MATTERS_GROUP', '事项群聊', false);	//隐藏按钮，参见流程文档3.4
		});
		isFirst = false;
	}
	//可实现原组件props复写
	return props;
}

// 对流程详情pc端生效
regOvProps('weappWorkflow', 'FPMainTab', ovFlowPagePropsFn, 0);

// 对流程详情移动端生效
regOvProps('weappWorkflow', 'MFPMainTab', ovFlowPagePropsFn, 0);






/**
 * 以下方式也可以针对流程，但功能优先，流程用上面方法，其他模块可以采用下面方法
 */
// let oldMenuIdMap = {};
// let oldOperMenus = [];

// function getMenuIdMap(){
//   let menuIdMap = {};
//   let operMenus = window?.weappWorkflow?.getFlowPageSDK?.()?.baseStore?.operMenus||[];
//   if(operMenus===oldOperMenus){
//     menuIdMap = oldMenuIdMap;
//   }else{
//     oldOperMenus = operMenus;
//     operMenus.forEach(item=>{
//       menuIdMap[item.id] = item.menutype;
//     })
//     oldMenuIdMap = menuIdMap;
//   }
//   return menuIdMap;
// }

// /**
//  * 隐藏PC流程页面更多里的某个菜单
//  */
// regOvProps('weappUi', 'Menu', (props) => {
//   const {weId = ''} = props;
//   if(weId && weId.endsWith('_zy5bee')){
//     let menuIdMap = getMenuIdMap();
//     console.log("xxc-test",menuIdMap)
//     props.data = props.data.filter(item=>{
//       //隐藏菜单id, 流程菜单id是不固定的，对应的关系可以通过window?.weappWorkflow?.getFlowPageSDK?.()?.baseStore?.operMenus查看，找到具体id即可
//       //MATTERS_GROUP:事项群聊
//       return menuIdMap[item.id]!=="MATTERS_GROUP";
//     })
//   }
//   return props;
// }, 0);

// /**
//  * 隐藏移动端流程页面更多里的某个菜单，移动端菜单多是通过MActionSheet.showActionSheetWithOptions方法展示菜单的
//  */
// let isMobile = window.location.href.indexOf('/mobile/')>0
// let isWorkflowPage = window.location.href.indexOf("/flowpage/view/")>0;
// if(isWorkflowPage && isMobile){
//   regHook('weappUi', 'ActionSheep.config.overwrite', (config) => {
//     const {options = []} = config;
//     console.log(config)
//     //如果要过滤选项，修改options数据即可
//     // config.options = options.filter(item=>{
//     //  return ![].includes(item.id),//过滤选项任选其一,item.id||item.content||item.icon
//     // })
//     return config;
//   }, 0);
// }


