


import { regOvProps } from '@weapp/utils';



regOvProps('weappUi', 'Table', props => {


  if (props.weId === "903dhc_leid4e_794hn9_eqqemv_0f9rx9") {
    if (Array.isArray(props.columns)) {
      props.columns.splice(2, 0, {
        title: '签到',
        width: '100px',
        bodyRender: (record) => {
          return <div>
            <window.weappUi.Button size="small"
              onClick={(e) => {
                e.stopPropagation();
                window.open(`/sp/meeting/meetingSignBigScreen?meetingId=${record.id}&signFlag=`);
              }}
            >大屏签到</window.weappUi.Button>
          </div>
        }
      })
    }
  }

  return props;

})