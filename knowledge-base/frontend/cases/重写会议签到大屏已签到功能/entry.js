
import React from 'react';
import { regOvComponent, regOvProps } from '@weapp/utils';
import { asyncImport } from '@weapp/ecodesdk';

const NewButton = React.lazy(() => asyncImport('${appId}', 'NewButton'));

let currentValue = '2';

const callback = (value) => {
  currentValue = value
}

regOvProps('weappMeeting', 'MeetingSignBigScreen', (props) => {
  console.log('ypypypypyyp====',props)
  props = {
    ...props,
    customRender : ()=>{
    return (
        <React.Suspense fallback={() => { }}>
        <NewButton {...props} currentValue={currentValue} callback={callback} />
      </React.Suspense>
      )
    }
  }
  
  return props;
}, 0);

