

import { regOvProps, regOvComponent } from '@weapp/utils';
import { asyncImport } from '@weapp/ecodesdk';

const CustomMenuContentAsync = React.lazy(() => asyncImport('${appId}', 'index'));

regOvProps('weappUi', 'Menu', props => {

  if (props.bindKey === 'wf_flowpage_main') {
    let menuData = [...props.data || [], {
		  id: 'cust1', content: '自定义1',
    }];
  	props.data = menuData;
  }
  return props;
})

/**
 * 方法1: 优点：可以根据workflowId,和requestId等参数去判断，缺点：实现方式稍微麻烦一点
 */
// let lastTabKey = '';
// regOvComponent('weappWorkflow','FPMainTab', (Com) => {
// 	return React.forwardRef((props, ref) => {
//     const { key, dataId, value, baseParam } = props;
//     const {workflowId,requestId} = baseParam||{};
//     //可根据这个参数判断
//     const {tabKey} = props.wffpDefThemeStore;

//     if(tabKey!==lastTabKey ){
//       if(tabKey==='cust1'){
//         setTimeout(()=>{
//           const {tabKey} = props.wffpDefThemeStore;
//           if(tabKey==='cust1'){
//             document.querySelector('.wffp-frame-main')?.classList.add('wffp-frame-tab-active');
//           }
//         })
//       }else if(lastTabKey==='cust1'){
//         document.querySelector('.wffp-frame-main')?.classList.remove('wffp-frame-tab-active');
//       }
//       lastTabKey = tabKey;
//     }
// 		return (
// 			<React.Suspense fallback={() => {}}>
//         <div style={tabKey==='cust1'?{display:'none'}:{width:'100%',height:'100%'}}>
//           <Com ref={ref} {...props}/>
//         </div>
//         <div style={tabKey==='cust1'?{width:'100%',height:'100%'}:{display:'none'}}>
//           <CustomMenuContentAsync {...props} OriginCom={Com}/>
//         </div>
//       </React.Suspense>
// 		);
// 	});
// });


/**
 * 
 * 方法二：优点：实现方式稍微简单一点，适用于各模块但key需要对应调整，缺点：workflowId,和requestId等参数需要根据sdk单独获取
 */
regOvComponent('weappUi', 'MenuContent', (Com) => {
	return React.forwardRef((props, ref) => {
    const { key, dataId, value, bindKey,weId='' } = props;
    let isMainMenuContent = bindKey==='wf_flowpage_main' && weId.endsWith('_c8s91e');
    let otherParams = {};
    if(isMainMenuContent && value==='cust1') otherParams = {style:{display:"none"}}
		return (
			<React.Suspense fallback={() => {}}>
        <Com ref={ref} {...props} {...otherParams}/>
        {
          isMainMenuContent && <>
            <div style={value==='cust1'?{width:'100%',height:'100%'}:{display:'none'}}>
              <CustomMenuContentAsync {...props} OriginCom={Com}/>
            </div>
          </>
        }
      </React.Suspense>
		);
	});
});