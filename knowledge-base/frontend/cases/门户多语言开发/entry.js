import React from 'react';
import { regOvComponent } from '@weapp/utils';

regOvComponent('weappLayout', 'QuickToolbar', (Com) => {
  return React.forwardRef((props, ref) => {
    const handleClick = (lan) => {
      let _url = '/api/bs/i18n/userlanguagemanage/updateUserlanguage?langid=';
      if(lan == 7){
          _url += lan + '&langtype=zh_CN';
      }else if(lan == 8){
        _url += lan + '&langtype=en_US';
      }
      weappUtils.request({
            method: "get",
            url: _url
        }).then(function (data) {
            location.reload();
        });
    }; 

    const {allowEmpSettingLoaded = true} = props?.mainStore;
    return (
      <React.Suspense fallback={() => {}}>
      {
        allowEmpSettingLoaded ? <Com {...props}/> :
        <table style={{marginTop:'-3px',marginRight:'-3px'}}>
          <tr>
            <td>
              <span style={{cursor:'pointer'}} onClick={()=>{handleClick(7)}}>简体中文&nbsp;</span>
              |
              <span style={{cursor:'pointer'}} onClick={()=>{handleClick(8)}}>&nbsp;English</span>
            </td>
            <td><Com {...props}/></td>
          </tr>
        </table>
      }
      </React.Suspense>
    )
  });
}, 1)