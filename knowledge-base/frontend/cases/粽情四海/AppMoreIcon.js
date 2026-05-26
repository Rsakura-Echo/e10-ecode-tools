import React from 'react';
import { Trigger, Icon } from '@weapp/ui';
import { getLabel, ua } from '@weapp/utils';
import { AppDropMenusCom } from '@weapp/layout';

class AppMoreIcon extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { popupVisible: false, popupWidth: 0 };
  }

  onPopupVisibleChange = (popupVisible) => {
    const popupWidth = document.querySelector('.app-729087887109857281-app-more-popup').clientWidth;
    this.setState({ popupVisible, popupWidth });
  }

  onTiling = () => {
    const tilingDom: any = document.querySelector('.weapp-main-full');
    if (tilingDom) {
      const tilingDisplay: any = tilingDom.style?.display;
      const LayoutSDK = window.weappLayout?.LayoutSDK;
      LayoutSDK?.utils?.moreAppShowTilingClick(tilingDisplay === 'block' ? false : true);
    }
  }

  componentDidMount() {
    const tilingDom: any = document.querySelector('.weapp-main-full');
    const contentDom: any = document.querySelector('.app-729087887109857281-toolbar');
    if (tilingDom && contentDom) {
      const offsetTop = contentDom.parentNode?.offsetTop;
      const offsetHeight = contentDom.parentNode?.offsetHeight;
      tilingDom.style.top = `${offsetTop + offsetHeight}px`;
      tilingDom.style.height = `calc(100% - ${offsetTop + offsetHeight}px)`;
      tilingDom.style.boxShadow = '0 0 10px rgb(0 0 0 / 15%)';
    }
  }

  render() {
    const { popupVisible, popupWidth } = this.state;
    const className = 'app-729087887109857281-toolbar-item app-729087887109857281-app-more';
    const tilingpageHoverClassName = 'app-729087887109857281-app-more-tilingpage';
    const openClassName = 'app-729087887109857281-toolbar-item-open app-729087887109857281-app-more-open';
    const popupClassName = 'app-729087887109857281-trigger-popup app-729087887109857281-app-more-popup e10header-appmenus-popup';

    let showWay = 'floatmenu';
    if (ua.browser === 'WeappPC') {
      showWay = window.TEAMS?.userConfig?.['moreapp.display.client'] ? window.TEAMS?.userConfig?.['moreapp.display.client'] : '';
    } else {
      showWay = window.TEAMS?.userConfig?.['moreapp.display.web'] ? window.TEAMS?.userConfig?.['moreapp.display.web'] : '';
    }

    if (showWay === 'tilingpage') {
      return (
        <div className={`${className} ${tilingpageHoverClassName}`} title={getLabel('121569', '总览')} onClick={this.onTiling}>
          <Icon name="Icon-grid" size="lg" />
        </div>
      )
    } else {
      return (
        <Trigger
          forceRender={true}
          popup={<AppDropMenusCom popupVisible={popupVisible} handlePopupVisible={this.onPopupVisibleChange} />}
          popupPlacement="bottomRight"
          popupVisible={popupVisible}
          onPopupVisibleChange={this.onPopupVisibleChange}
          popupClassName={popupClassName}
          popupStyle={popupWidth ? { width: popupWidth } : {}}
          enableLocationCalculation={true}
        >
          <div className={`${className} ${popupVisible ? openClassName : ''}`} title={getLabel('121569', '总览')}>
            <Icon name="Icon-grid" size="lg" />
          </div>
        </Trigger>
      );
    }
  }
}

export default AppMoreIcon;
