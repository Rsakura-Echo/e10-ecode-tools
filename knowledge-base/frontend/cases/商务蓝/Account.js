import React from 'react';
import { Trigger, Avatar, Icon,CorsComponent } from '@weapp/ui';
import { QuickMenusCom } from '@weapp/layout';

import { inject, observer } from 'mobx-react';

const LayoutSDK = window.weappLayout?.LayoutSDK;
const mailMenuKeyMap = LayoutSDK?.utils?.getMailMenuKeyMap() || {
  quick_txqy: "qq",
  quick_cmqy: "coremail",
  quick_cmqyweb: "coremail_ws",
  quick_wyqy: "netease",
  quick_263qy: "263",
  quick_alqy: "alimail",
  quick_qywx: "weCom",
}

@inject('mainStore')
@inject('headerMenuStore')
@observer
class Account extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { popupVisible: false };
  }

  onPopupVisibleChange = (popupVisible) => {
    this.setState({ popupVisible });
  }

  render() {
    const { popupVisible } = this.state;
    const className = 'app-737142488378564608-account';
    const openClassName = 'app-737142488378564608-account-open';
    const popupClassName = 'app-737142488378564608-trigger-popup app-737142488378564608-account-popup';

    let navMenus_more=[]
    let showCount=0;
    const { navMenus } = this.props.headerMenuStore;
    navMenus && navMenus.length>0 &&navMenus.map((item,index)=>{
      if (item.menuType === 'DEFAULT_MENU') {
        if( showCount<7){
            const mailMenuKeys = Object.keys(mailMenuKeyMap);
          if(mailMenuKeys.includes(item.menuKey) ){
              //navMenus_show.push(item);
          }else {
              //navMenus_show.push(item);
              showCount++;
          }
        }else{
          navMenus_more.push(item)
        }
         
      }else{
        if(showCount<7){
            //navMenus_show.push(item);
            showCount++;
        }else{
           navMenus_more.push(item)
        }
       
      }
   })

    return (
      <Trigger
        forceRender={true}
        popup={
            <CorsComponent
            weId={`${this.props.weId || ''}_novaor`}
            app="@weapp/layout"
            compName="QuickMenusCom"
            handlePopupVisible={this.onPopupVisibleChange}
            externalMenus={navMenus_more}
          />
            
            }
        popupPlacement="bottomRight"
        popupVisible={popupVisible}
        onPopupVisibleChange={this.onPopupVisibleChange}
        popupClassName={popupClassName}
      >
        <div className={`${className} ${popupVisible ? openClassName : ''}`}>
          <div className="app-737142488378564608-account-avatar">
            <Avatar url={window.TEAMS?.currentUser?.avatar?.url || ''} />
          </div>
          <div className="app-737142488378564608-account-desc">
            <div className="app-737142488378564608-account-user" title={window.TEAMS?.currentUser?.username}>
              <span>{window.TEAMS?.currentUser?.username}</span>
            </div>
            <div className="app-737142488378564608-account-tenant" title={window.TEAMS?.currentTenant?.tenantName}>
              <span>{window.TEAMS?.currentTenant?.tenantName}</span>
            </div>
          </div>
          <Icon name="Icon-Down-arrow01" className="app-737142488378564608-account-arrow" />
        </div>
      </Trigger>
    );
  }
}

export default Account;
