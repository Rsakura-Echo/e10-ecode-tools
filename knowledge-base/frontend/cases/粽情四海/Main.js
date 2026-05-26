import React from 'react';
import { withRouter } from 'react-router-dom';

import Logo from './Logo';
import Toolbar from './Toolbar';
import Account from './Account';
import TopMenu from './TopMenu';
import NavbarMenu from './NavbarMenu';
import { loadThemeConfig } from './utils/index';

class Main extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { navbarVisible: true, navbarHidden: false };
  }

  componentDidMount() {
    loadThemeConfig();
  }

  onNavbarVisibleChange = () => {
    this.setState((state) => ({ navbarVisible: !state.navbarVisible }), () => { window.dispatchEvent(new Event('resize')); });
  }

  onNavbarHiddenChange = (navbarHidden) => {
    this.setState({ navbarHidden }, () => { window.dispatchEvent(new Event('resize')); });
  }

  render() {
    const { navbarHidden } = this.state;
    const { pathname = '' } = this.props.location;
    const isPortalPage = pathname.indexOf('/portal/view/') === 0;
    const navbarStyle = navbarHidden ? { height: 0, marginBottom: 0, display: 'none' } : { height: 42, marginBottom: 10 };
    const contentStyle = { height: navbarHidden ? '100%' : 'calc(100% - 52px)', backgroundColor: isPortalPage ? 'transparent' : '#f6f6f6' };

    return (
      <div className="app-729087887109857281">
        <div className="app-729087887109857281-header">
          <div className="app-729087887109857281-header-logo">
            <Logo />
          </div>
          <div className="app-729087887109857281-header-menu">
            <TopMenu />
          </div>
          <div className="app-729087887109857281-header-toolbar">
            <Toolbar />
          </div>
          <div className="app-729087887109857281-header-account">
            <Account />
          </div>
        </div>
        <div className="app-729087887109857281-main">
          <div className="app-729087887109857281-navbar" style={navbarStyle}>
            <NavbarMenu navbarHidden={navbarHidden} onNavbarHiddenChange={this.onNavbarHiddenChange} />
          </div>
          <div className="app-729087887109857281-content" style={contentStyle}>
            {this.props.moduleContent}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Main);
