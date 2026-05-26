


import React from 'react';
import ReactDOM from 'react-dom';

class DrawerCom extends React.Component {

  prefixCls = 'ecode-drawer-com'
  findDOMNode = () => ReactDOM.findDOMNode(this);
  divDom = document.createElement('div');
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = nextProps;
    if (visible) {
      this.renderDom();
    } else {
      this.unmountDom();
    }
  }

  componentWillUnmount() {

  }

  componentDidMount() {
  }

  renderDom = () => {
    document.body.appendChild(this.divDom);
    ReactDOM.render(<div className={this.prefixCls}>
      <div className={`${this.prefixCls}-shadow`} onClick={() => {
        this.props.onClose();
      }}></div>
      <div className={`${this.prefixCls}-body`}>{this.props.children}</div>
    </div>, this.divDom);
  }

  unmountDom = () => {
    const unmount = ReactDOM.unmountComponentAtNode(this.divDom);
    if (unmount && this.divDom.parentNode) {
      this.divDom.parentNode.removeChild(this.divDom);
    }
  }

  render() {
    return null;
  }

}

export default DrawerCom;
