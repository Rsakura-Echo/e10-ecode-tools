import React from 'react';
import { Trigger, Avatar, Icon,CorsComponent } from '@weapp/ui';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { request } from '@weapp/utils';
import { QuickMenusCom } from '@weapp/layout';


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

@inject('headerMenuStore')
@observer
class Account extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { popupVisible: false, avatarUrl: '' };
  }

  onPopupVisibleChange = (popupVisible) => {
    this.setState({ popupVisible });
  }

  getHrAvatar = () => {
    return request({
      url: `/api/hrm/profile/get?id=${window.TEAMS?.currentUser?.id}`,
      method: "get",
    }).then(res => {
      if (res.data) {
        this.setState({ avatarUrl: res.data.avatar.url })
      }
    }).catch(err => {
      console.log(err);
    });
  }; 

  componentDidMount() {
    this.getHrAvatar();
  }

  render() {
    const { popupVisible, avatarUrl } = this.state;
    const { moreNavMenus } = this.props.headerMenuStore;
    const isAllLine = moreNavMenus.every((item) => {
      return item.menuType === 'LINE';
    });
    const className = 'app-729087887109857281-account';
    const openClassName = 'app-729087887109857281-account-open';
    const popupClassName = 'app-729087887109857281-trigger-popup app-729087887109857281-account-popup';

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
            <div className="app-729087887109857281-account-avatar">
              <Avatar url={avatarUrl || ''} />
            </div>
            <div className="app-729087887109857281-account-desc">
              <div className="app-729087887109857281-account-user" title={window.TEAMS?.currentUser?.username}>
                <span>{window.TEAMS?.currentUser?.username}</span>
              </div>
              <div className="app-729087887109857281-account-tenant" title={window.TEAMS?.currentTenant?.tenantName}>
                <span>{window.TEAMS?.currentTenant?.tenantName}</span>
              </div>
            </div>
            <Icon name="Icon-Down-arrow01" className="app-729087887109857281-account-arrow" />
          </div>
        </Trigger>
      );
    
  }
}

export default Account;