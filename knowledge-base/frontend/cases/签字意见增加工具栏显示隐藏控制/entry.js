



import { regOvProps, regOvComponent } from '@weapp/utils';
import React from 'react';
import { asyncImport } from '@weapp/ecodesdk';

const AsyncCom = React.lazy(() => asyncImport('${appId}', 'index'));


regOvComponent('weappUi', 'CommentEditText', Com => {
  return React.forwardRef((props, ref) => {
    if (props.weId === '3rdcst_oxa9w7_i8bbvp_vc1wev_kc1m3l_r1vh81_r5zpkx_3xq1vk_06go13_rlyf8v_n9lpa7') {
      return <React.Suspense fallback={() => {}}>
        <AsyncCom {...props} ref={ref} OriginCom={Com} />
      </React.Suspense>
    }
    return <Com {...props} ref={ref}/>
  })
});


// regOvProps('weappUi', 'CommentEditText', props => {

//   if (props.weId === '3rdcst_oxa9w7_i8bbvp_vc1wev_kc1m3l_r1vh81_r5zpkx_3xq1vk_06go13_rlyf8v_n9lpa7') {
    
//     props.renderExtraConent = () => {
//       return <div style={{ marginLeft: 12, marginTop: 6 }}>
//         <window.weappUi.Switch onChange={(val) => {
//           props.richTextProps = {
//             ckConfig: {
//               toolbar: [[]],
//               extraPlugins: ''
//             }
//           };
//         }} />
//       </div>
//     }
//   }

//   return props;

// });