import { regOvProps } from '@weapp/utils';
import { asyncImport } from '@weapp/ecodesdk';
const BatchOperate = React.lazy(() => asyncImport('${appId}', 'BatchOperate'));


//方案一：文档模块
//在文档右侧添加按钮并获取列表store
regOvProps("weappDoc","DocListECodeWrapper",(props)=>{
  const {weId} = props;
  if(weId && weId.endsWith("_cvxi30")){
    props.children?.unshift(<BatchOperate />)
  }
  
  return props;
})

//方案二：其他模块也通用，根据具体情况调整代码即可
//在文档右侧添加按钮并获取列表store,
// regOvProps("weappUi","SearchAdvanced",(props)=>{
//   const {weId} = props;
//   if(weId && weId.endsWith("_eyq8zs")){
//     let lastcustomRenderTop =props.customRenderTop;
//     props.customRenderTop = ()=>{
//       let oldContent = lastcustomRenderTop?.();
//       return <div style={{display:"flex"}}>
//         <BatchOperate />
//         {oldContent}
//       </div>
    
//     }
//   }
  
//   return props;
// })