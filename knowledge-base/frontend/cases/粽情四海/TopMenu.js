import React from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, utils } from '@weapp/ui';
import { getLabel } from '@weapp/utils';
import { LayoutSDK } from '@weapp/layout';

class TopMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { data: [], value: '' };
    window.topmenu = this;
  }

  componentDidMount() {
    LayoutSDK && LayoutSDK.regHook('navAppMenusData', (result) => {
      // console.log('navAppMenusData', result);
      const data = [
        { "id": "0", "module": "portal", "menuname": getLabel('62505', '门户'), "icon": "", "path": "/portal", "active": true, "orderIndex": 0 },
        ...(result?.value || [])
      ];
      window.topmenu.setState({ data });
      // if (!utils.isEqual(this.state.data, data)) {
        // this.setState({ data });
      // }
    });
    LayoutSDK && LayoutSDK.regHook('navAppMenuActiveData', (result) => {
      // console.log('navAppMenuActiveData', result);
      const value = result?.value?.id || '';
      window.topmenu.setState({ value });
      // if (!utils.isEqual(this.state.value, value)) {
      //   this.setState({ value });
      // }
    });
  }

  getValue = (data) => {
    let value = '';
    const { pathname = '' } = this.props.location;
    const loop = (data) => {
      data.forEach((item) => {
        if (pathname.indexOf(item.path) === 0 || pathname.indexOf(item.url) === 0) {
          value = item.id || '';
        } else if (item.children && item.children.length > 0) {
          loop(item.children);
        }
      });
    }
    loop(data);
    return value;
  }

  onChange = (item) => {
    LayoutSDK && LayoutSDK.doEvent('appMenuItemClick', item);
  }

  render() {
    let { data, value } = this.state;
    value = value || this.getValue(data);
    return <TopMenuContent {...this.props} data={data} value={value} onChange={this.onChange} />;
  }
}

class TopMenuContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { data: [], value: '' };
  }

  componentDidMount() {
    const { data, value } = this.props;
    this.setData(data, value);
  }

  componentWillReceiveProps(nextProps) {
    const { data, value } = nextProps;
    if (!utils.isEqual(this.props.data, data) || !utils.isEqual(this.state.value, value)) {
      this.setData(data, value);
    }
  }

  setData = (data, value) => {
    let _data = [], _value = '';
    if (data && data.length > 0) {
      _data = this.format(data);
      _value = value;
    }
    this.setState({ data: _data, value: _value });
  }

  format = (data) => {
    return data.map((item) => {
      const _item = utils.deepClone(item);
      _item.icon = ''
      _item.content = (
        <div className="app-729087887109857281-topmenu-title">
          <div title={item.menuname} className="app-729087887109857281-topmenu-title-text">{item.menuname}</div>
        </div>
      );
      if (_item.children && _item.children.length > 0) {
        _item.children = this.format(_item.children);
      }
      return _item;
    });
  }

  onChange = (value, item) => {
    console.log('value', item);
    if (item.openMode === 'newPage' || item.openMode === 'newWindow') {
      this.props.onChange(item);
    } else {
      // this.setState({value});
      // this.props.onChange(item);
      this.setState({ value }, () => this.props.onChange(item));
    }
  }

  render() {
    const { data, value } = this.state;
    return (
      <div className="app-729087887109857281-topmenu">
        <Menu
          key={value}
          type="secondtab"
          secondtabType='new'
          overflowType="more"
          hideBottomLine
          data={data}
          value={value}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default withRouter(TopMenu);
