

import { regOvComponent, regOvProps } from '@weapp/utils';
// import { asyncImport } from '@weapp/ecodesdk';
// const AsyncCom = React.lazy(() => asyncImport('${appId}', 'CustDialogCom'));

// const NewCom = React.forwardRef((props, ref) => {
//   return <React.Suspense fallback={() => {}}>
//     <AsyncCom {...props} ref={ref}/>
//   </React.Suspense>
// })

// regOvComponent('weappUi', 'Dialog', (Com) => {
//   return React.forwardRef((props, ref) => {
//     if (props.isOv) return <Com {...props} ref={ref} />
//     if ((props.weId || '').indexOf("f56o40_9d1m87_xk40pb_q3zd39_bryhr2") >= 0) {
//       return <NewCom {...props} ref={ref} OriginCom={Com} isOv={true}/>
//     }
//     return <Com {...props} ref={ref}/>
//   })
  
// })


regOvProps('weappUi', 'Dialog', props => {
  props.defaultInnerScale = true
})