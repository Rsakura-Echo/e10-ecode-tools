import { regOvProps, regOvComponent } from '@weapp/utils';




regOvProps('weappMeeting', 'RoomUsage', (props) => {
  console.log('ypypypypyyp1111====',props)
  console.log('ypypypypyyp====',window.roomUsageData)
  props = {
    ...props,
    customRender : (res)=>{
      console.log('resresresres',res)
    return (
        <div className={`list-item-title`}>2222222222----</div>
      )
    }
  }
  
  return props;
}, 0);



// regOvComponent('weappMeeting', 'SearchListItem', (Com) => {
//   return React.forwardRef((props, ref) => {
//     return (
//       <div className={`list-item`} onClick={props.click}>
//         <div className={`list-item-title`}>
//           <div className={'title-content'}>
//             <span>{123321123312}</span>
//           </div>
//         </div>
//       </div>
//     )
//   });
// }, 1)