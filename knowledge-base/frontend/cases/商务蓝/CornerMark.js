import { CorsComponent } from '@weapp/ui';
import { corsImport, request } from '@weapp/utils';
import React from 'react';
import { LayoutSDK } from '@weapp/layout';

class CornerMark extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    const { data = {} } = this.props;
    const { cornerMarkSetting } = data;

    if (cornerMarkSetting && cornerMarkSetting.showType !== 0) {
      if (data.menuKey === 'quick_work_message') {
        corsImport('@weapp/em').then((em) => {
          em.unreadCountListener({
            callback: (count: number) => {
              setTimeout(() => {
                this.setState({ count });
              });
            }
          });
        });
      } else if (data.menuKey === 'quick_concern') {
        request({
          url: '/api/my/common/renderCount',
          method: 'GET'
        }).then((result) => {
          const { data = {} } = result;
          this.setState({ count: data.wait || 0 });
        });
      } else if (cornerMarkSetting.iconData && cornerMarkSetting.iconData !== 'none') {
        request({
          url: cornerMarkSetting.iconData,
          method: 'GET'
        }).then((result) => {
          const { data = {} } = result;
          this.setState({ count: data.count || 0 });
        });
      }
    }


    let a=this;
    LayoutSDK && LayoutSDK.regHook("navMenuItemRefresh", function(options){
        if(options.value === "quick_concern"){
            request({
              url: '/api/my/common/renderCount',
              method: 'GET'
            }).then((result) => {
              const { data = {} } = result;
              a.setState({ count: data.wait || 0 });
            });
        }
      })
      
  }

  render() {
    const { data = {} } = this.props;
    const { count } = this.state
    const { cornerMarkSetting } = data;

    if (!cornerMarkSetting || cornerMarkSetting.showType === 0 || count === 0) {
      return null;
    } else if (cornerMarkSetting.showType === 1) {
      return (
        <div className={'app-737142488378564608-toolbar-corner-mark'} >
          <span className={'app-737142488378564608-toolbar-corner-mark-dot'}></span>
        </div>
      );
    } else if (cornerMarkSetting.showType === 2) {
      return (
        <div className={'app-737142488378564608-toolbar-corner-mark'} >
          <span className={'app-737142488378564608-toolbar-corner-mark-count'}>{count > 99 ? '99+' : count}</span>
        </div>
      );
    } else if (cornerMarkSetting.showType === 3) {
      const iconConfig = JSON.parse(cornerMarkSetting.iconConfig || '{}');
      return (
        <div className={'app-737142488378564608-toolbar-corner-mark'} >
          <CorsComponent
            app="@weapp/ebdcoms"
            compName="AssetsItem"
            path={iconConfig.path}
            style={iconConfig.style}
            size="auto"
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default CornerMark;
