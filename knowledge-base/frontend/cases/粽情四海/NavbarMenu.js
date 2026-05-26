import React from 'react';
import { withRouter } from 'react-router-dom';
import { CorsComponent, Menu, utils, Icon } from '@weapp/ui';
import { qs, request } from '@weapp/utils';
import { LayoutSDK } from '@weapp/layout';

class NavbarMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { data: [], value: '', angleCountArrObj: {} };
    window.navbarmenu = this;
  }

  componentDidMount() {
    LayoutSDK && LayoutSDK.regHook('asideMenusData', (result) => {
      // console.log('asideMenusData', result);
      const data = result?.value || [];
      // if (!utils.isEqual(this.state.data, data)) {
        // this.setState({ data });
      window.navbarmenu.setState({ data });
      this.props.onNavbarHiddenChange(data.length === 0);
      // }
    });
    LayoutSDK && LayoutSDK.regHook('asideMenuActiveKey', (result) => {
      // console.log('asideMenuActiveKey', result);
      const value = result?.value?.id || result?.value || '';
      window.navbarmenu.setState({ value });
      // if (!utils.isEqual(this.state.value, value)) {
        // this.setState({ value });
      // }
    });
    LayoutSDK && LayoutSDK.regHook('themeMenuData', (result) => { 
      // console.log('themeMenuData', Object.values(result.value));
      this.setState({ angleCountArrObj: result.value});
    })
  }

  onChange = (data, e) => {
    // console.log('菜单切换', data, e);
    LayoutSDK && LayoutSDK.doEvent('moduleMenuItemClick', { data, e });
  }

  render() {
    const { data, value, angleCountArrObj } = this.state;
    // console.log('菜单角标数据', angleCountArrObj);
    if (this.props.navbarHidden) return null;
    return <NavbarMenuContent {...this.props} data={data} value={value} onChange={this.onChange} angleCountArrObj={angleCountArrObj} />;
  }
}

class NavbarMenuContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { data: [], value: '', angleCountArrObj: {} };
  }

  componentDidMount() {
    const data = utils.deepClone(this.props.data);
    const value = utils.deepClone(this.props.value);
    const angleCountArrObj = utils.deepClone(this.props.angleCountArrObj);
    this.setAngleCount(data, angleCountArrObj);
    this.setData(data, value);
  }

  componentWillReceiveProps(nextProps) {
    if (!utils.isEqual(this.props.data, nextProps.data) || !utils.isEqual(this.state.value, nextProps.value) || !utils.isEqual(this.state.angleCountArrObj, nextProps.angleCountArrObj)) {
      // console.log('接收到的 angleCount 数据', nextProps.angleCountArrObj);
      const data = utils.deepClone(nextProps.data);
      const value = utils.deepClone(nextProps.value);
      const angleCountArrObj = utils.deepClone(nextProps.angleCountArrObj);
      this.setAngleCount(data, angleCountArrObj);
      this.setData(data, value);
    }
  }

  // 设置角标数据
  setAngleCount = (data, angleCountArrObj) => {
    // console.log('设置角标数据', data, angleCountArrObj);
    data.forEach((item) => {
      if (angleCountArrObj[item.id]) {
        item.angleCount = angleCountArrObj[item.id]?.angleCount;
      }
      if (item.children && item.children.length > 0) {
        this.setAngleCount(item.children, angleCountArrObj);
      }
    })
  }

  setData = (data, value) => {
    let _data = [], _value = '';
    if (data && data.length > 0) {
      _data = this.format(data);
      _value = value || this.getValue(_data);
    }
    this.setState({ data: _data, value: _value });
  }

  format = (data, parentId) => {
    return data.map((item) => {
      const _item = utils.deepClone(item);
      parentId ? _item.parentId = parentId : delete _item.parentId;
      _item.icon = '';
      _item.activeIcon = '';
      _item.title = item.content;
      _item.content = (
        <div className="app-729087887109857281-navbarmenu-title">
          <div title={item.content} className="app-729087887109857281-navbarmenu-title-text">{item.content}{item.angleCount && item.angleType === 1 ? `(${item.angleCount})` : ''}</div>
          {item.count !== 0 && <div className="app-729087887109857281-navbarmenu-title-count">{item.count}</div>}
          {item.hasSearch && (
            <div title="自定义菜单设置" className="app-729087887109857281-navbarmenu-setting-icon" onClick={this.onSetting}>
              <CorsComponent app="@weapp/cusapp" compName="SetSearchDialogComp" menu={{ id: item.id }} />
            </div>
          )}
          {item?.angleCount > 0 && item.angleType === 0 && <div className={item.angleType === 0 ? "app-729087887109857281-navbarmenu-angle-count" : ''}>{item?.angleCount}</div>}
          {item?.angleIcon && <div><Icon name={item?.angleIcon} onClick={(e) => {this.toAngleRoute(item?.angleRoute, e)}} /></div>}
        </div>
      );
      if (_item.children && _item.children.length > 0) {
        _item.children = this.format(_item.children, item.id);
      }
      return _item;
    });
  }

  getValue = () => {
    let value = '';
    const { search = '' } = this.props.location;
    const params = qs.parse(search, { ignoreQueryPrefix: true });
    if (params && params.cusMenuId) {
      value = params.cusMenuId;
    }
    return value;
  }

  onChange = (value, item, e) => {
    if(item && item.pageType && item.pageType == 'dir'){
      return
    }
    this.setState({ value }, () => this.props.onChange(item, e));
  }

  onSetting = (e) => {
    utils.pauseEvent(e);
  }

  toAngleRoute = (angleRoute, e) => {
    utils.pauseEvent(e);
    this.props.history.push(angleRoute);
  }

  render() {
    const { data, value } = this.state;
    return (
      <div className="app-729087887109857281-navbarmenu">
        <Menu
          type="tab"
          mode="horizontal"
          overflowType="scroll"
          childChangeToUpdateParent={false}
          childTriggerProps={{ popupClassName: 'app-729087887109857281-navbarmenu-popup' }}
          data={data}
          value={value}
          onChange={this.onChange}
          parentCanBeSelected={true}
        />
      </div>
    );
  }
}

export default withRouter(NavbarMenu);
