import { regOvProps, regOvComponent } from '@weapp/utils';
import { asyncImport } from '@weapp/ecodesdk';
import React from 'react';

const NewFPMainTab = React.lazy(()=>asyncImport('${appId}','NewFPMainTab'))

regOvComponent('weappWorkflow', 'FPMainTab', (Com) => {  
  return React.forwardRef((props, ref) => {
    //console.log("wcq:::props=",props);

    return (
        <React.Suspense fallback={() => {}}>
            <NewFPMainTab ref={ref} {...props} OriginCom = {Com}/>
        </React.Suspense>
    )
    
    //return <Com ref={ref} {...props} />;
    });
}, 1);