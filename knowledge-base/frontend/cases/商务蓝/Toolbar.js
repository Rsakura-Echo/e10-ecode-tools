import React from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Icon } from '@weapp/ui';

import HomeIcon from './HomeIcon';
import ImIcon from './ImIcon';
import AppMoreIcon from './AppMoreIcon';
import FastCreateIcon from './FastCreateIcon';
import CountIcon from './CountIcon';
import HelpIcon from './HelpIcon';
import Default from './Default';
import Custom from './Custom';

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

class ToolbarCustomItem extends React.PureComponent {
  render() {
    const { item } = this.props;
    return (
      <div className="app-737142488378564608-toolbar-item app-737142488378564608-toolbar-custom-item" title={item.i18nCustomMenuName || ''} onClick={this.onClick}>
        <Icon name={`Icon-custom0${item.icon}-o`} size="lg" />
      </div>
    );
  }

  onClick = () => {
    this.props.onOpen(this.props.item);
  }
}

@inject('mainStore')
@inject('headerMenuStore')
@observer
class Toolbar extends React.PureComponent {
  render() {
    const { navMenus } = this.props.headerMenuStore;

    let navMenus_show=[]
    let showCount=0;
    navMenus && navMenus.length>0 &&navMenus.map((item,index)=>{
      if (item.menuType === 'DEFAULT_MENU') {
        if( showCount<7){
            const mailMenuKeys = Object.keys(mailMenuKeyMap);
          if(mailMenuKeys.includes(item.menuKey) ){
              navMenus_show.push(item);
          }else {
              navMenus_show.push(item);
              showCount++;
          }
        }else{
          //navMenus_more.push(item)
        }
         
      }else{
        if(showCount<7){
            navMenus_show.push(item);
            showCount++;
        }else{
          // navMenus_more.push(item)
        }
       
      }
   })
    return (
      <div className="app-737142488378564608-toolbar">
        <HomeIcon />
        <ImIcon />
        <AppMoreIcon />
        <div className="app-737142488378564608-toolbar-no-default-setting">
        {/*
          navMenus.map((item, index) => {
            if (item.menuKey === 'quick_create') {
              return <FastCreateIcon key={index} name={item.i18nCustomMenuName || item.i18nMenuName || ''} icon={item.icon} />;
            } else if (item.menuKey === 'quick_concern') {
              return <CountIcon key={index} name={item.i18nCustomMenuName || item.i18nMenuName || ''} icon={item.icon} />;
            } else if (item.menuKey === 'quick_center') {
              return <HelpIcon key={index} name={item.i18nCustomMenuName || item.i18nMenuName || ''} icon={item.icon} />;
            } else if (item.menuType === 'CUSTOM_MENU') {
              return <ToolbarCustomItem key={index} item={item} onOpen={this.onOpen} />;
            } else if (item.menuType === 'LINE' && index !== 0 && index !== navMenus.length - 1) {
              return <div key={index} className="app-737142488378564608-toolbar-item-split" />;
            }
          })
          */
        }
        {
            navMenus_show.map((item, index) => {
              if (item.menuType === 'DEFAULT_MENU') {
                  return <Default key={index} data={item} onOpen={this.onOpen} />;
                } else if (item.menuType === 'CUSTOM_MENU') {
                  return <Custom key={index} data={item} onOpen={this.onOpen} />;
                } else if (item.menuType === 'LINE' && index !== 0 && index !== navMenus.length - 1) {
                  return <div key={index} className={'app-737142488378564608-toolbar-item-split'}>|</div>;
                }
                return null;
                
               
            })
          }
        </div>
      </div>
    );
  }

  onOpen = (item) => {
    if (!item.url) {
      return;
    }
    switch (item.openWay) {
      case 2:
        this.props.mainStore?.changeImTabContentVisible(false);
        const isCompleteUrl = item.url?.startsWith("http://") || item.url?.startsWith("https://");
        if (isCompleteUrl) {
          window.location.href = item.url;
        } else {
          this.props.history.push({ pathname: item.url })
        }
        break;
      case 0:
        window.open(item.url);
        break;
      case 1:
        const { width, height } = window.screen;
        const features = `menubar=yes${item.windowSize ? `,width=${item.windowWidth},height=${item.windowHeight},left=${Math.floor((width - Number(item.windowWidth)) / 2)},top=${Math.floor((height - Number(item.windowHeight)) / 2)}` : ""}`;
        window.open(item.url, "newwindow", features);
        break;
    }
  }
}

export default withRouter(Toolbar);
