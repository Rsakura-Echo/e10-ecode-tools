import React from 'react';
import { QuickSearchCom } from '@weapp/layout';

import Logo from './Logo';
import Toolbar from './Toolbar';
import Account from './Account';
import AsideMenu from './AsideMenu';
import AsideCalendar from './AsideCalendar';
import { loadThemeConfig } from './utils/index';

class Main extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      asidemenuheight: 0,
      asideHidden: false,
    }
  }

  componentDidMount() {
    loadThemeConfig();
  }

  onAsideHiddenChange = (asideHidden) => {
    this.setState({ asideHidden }, () => { window.dispatchEvent(new Event('resize')); });
  }

  render() {
    const { asideHidden } = this.state;
    let asideStyle = { width: 220 };
    let contentStyle = { width: 'calc(100% - 220px)' };
    if (asideHidden) {
      asideStyle = { width: 0, display: 'none' };
      contentStyle = { width: '100%' };
    }

    return (
      <div className="app-737142488378564608">
        <div className="app-737142488378564608-header">
          <div className="app-737142488378564608-header-logo">
            <Logo />
          </div>
          <div className="app-737142488378564608-header-search">
            <QuickSearchCom className="app-737142488378564608-quick-search" popupClassName="app-737142488378564608-quick-search-popup" />
          </div>
          <div className="app-737142488378564608-header-toolbar">
            <Toolbar />
          </div>
          <div className="app-737142488378564608-header-account">
            <Account />
          </div>
        </div>
        <div className="app-737142488378564608-main">
          <div className="app-737142488378564608-aside" style={asideStyle}>
            <div className="app-737142488378564608-aside-calendar">
              <AsideCalendar />
            </div>
            <div className="app-737142488378564608-aside-menu">
              <AsideMenu asideHidden={asideHidden} onAsideHiddenChange={this.onAsideHiddenChange} />
            </div>
          </div>
          <div className="app-737142488378564608-content" style={contentStyle}>
            {this.props.moduleContent}
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
