import React from 'react';
import { regOvComponent  } from '@weapp/utils';

//替换高级搜索图标
regOvComponent('weappUi', 'Icon', (Com) => {
  return React.forwardRef((props, ref) => {
          
      
        if(props.name == 'Icon-Advanced-search'){
          return (
            <React.Suspense fallback={() => {}}>
              <div {...props} style={{float:'right'}}>高级搜索</div>
            </React.Suspense>
            );
        }else{
          return <Com {...props} ref={ref}/>
        }

  });
  
}, 1)