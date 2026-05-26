import React from 'react';
import { withRouter } from 'react-router-dom';
import { CorsComponent, AppIcon, Menu, Icon, Scroller, utils } from '@weapp/ui';
import { request, qs } from '@weapp/utils';
import { LayoutSDK } from '@weapp/layout';

class AsideMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { data: [], value: '', asideData: [], angleCountArrObj: {} };
  }

  // 获取角标数据，统计-放入新对象，以 id 为键，count 为值
  getAngleCount = (data) => {
    // console.log('传递过来的菜单数据', data);
    data.map((item) => {
      if (!!item.anglePath) {
        item.hasSearch = item.hasSearch ? '1' : '0';
        item.wfExpand = item.wfExpand ? toString(item.wfExpand) : '0';
        request({
          method: 'post',
          url: item.anglePath,
          data: item
        }).then(res => {
          if (res.code === 200 && utils.isObject(res.data)) {
            // console.log('角标数据是否一致', utils.isEqual(this.state.angleCountArrObj, {...this.state.angleCountArrObj, ...angleCountObj}));
            // console.log('角标数据', this.state.angleCountArrObj, { angleCountArrObj: {...this.state.angleCountArrObj, ...angleCountObj}});
            let angleCountObj = { [item.id]: res.data.count };
            // console.log('角标数据', angleCountObj);
            const newAngleCountArrObj = {...this.state.angleCountArrObj, ...angleCountObj};
            // console.log('新的角标数据', utils.isEqual(this.state.angleCountArrObj, newAngleCountArrObj));
            if (!utils.isEqual(this.state.angleCountArrObj, newAngleCountArrObj)) {
              this.setState({ angleCountArrObj: {...this.state.angleCountArrObj, ...angleCountObj}})
            }
          }
        })
      }
      if (item.children && item.children.length > 0) {
        this.getAngleCount(item.children);
      }
    })
  }

  componentDidMount() {
    request({ url: '/api/cusapp/app/hybridModuleMenus?terminalType=PC&menuType=0', method: 'GET' }).then((result) => {
      const { data = [] } = result;
      const _data = data.map((item) => {
        const cusAppMenu = item.cusAppMenus[0];
        return { id: item.id, module: item.module, moduleStr: item.moduleStr, menuName: cusAppMenu.menuName, children: cusAppMenu.children, menuLevel: '1' };
      });
      const portalMenus = _data.find(item => item.module === 'portal');
      const _reSortMenus = _data.filter(item => item.module !== 'portal');
      if(_data.find(item => item.module === 'portal')) _reSortMenus.unshift(portalMenus);
     /* if (_reSortMenus && _reSortMenus.length > 0) {
        this.getAngleCount(_reSortMenus);
      }*/
      this.setState({ data: _reSortMenus });
    });
    LayoutSDK && LayoutSDK.regHook('asideMenusData', (result) => {
      //console.log('asideMenusData', result);
      const data = result.value || [];
      this.props.onAsideHiddenChange(data.length === 0);
    });
    LayoutSDK && LayoutSDK.regHook('asideMenuActiveKey', (result) => {
     // console.log('asideMenuActiveKey', result);
      const value = result?.value?.id || result?.value || '';
      if (!utils.isEqual(this.state.value, value)) {
        this.setState({ value });
      }
    });
    LayoutSDK && LayoutSDK.regHook('themeMenuData', (result) => { 
      // console.log('themeMenuData', Object.values(result.value));
      let arr = {};
      Object.values(result.value).map((item) => {
        arr[item.id] = item.angleCount;
      });
      this.setState({ angleCountArrObj: {...this.state.angleCountArrObj, ...arr}});
    });
  }

  onChange = (data, e) => {
    //console.log('混合菜单切换', data, e, data.moduleStr);
    data.appId = data.parentIds.length > 0 ? data.parentIds[0] : data.id;
    LayoutSDK && LayoutSDK.doEvent('moduleMenuItemClick_mixed', { data, e, event: e });
  }

  onAsideMenuSettingChange = () => {
    request({ url: '/api/cusapp/app/hybridModuleMenus?terminalType=PC&menuType=0', method: 'GET' }).then((result) => {
      const { data = [] } = result;
      const _data = data.map((item) => {
        const cusAppMenu = item.cusAppMenus[0];
        return { id: item.id, module: item.module, moduleStr: item.moduleStr, menuName: cusAppMenu.menuName, children: cusAppMenu.children };
      });
      const portalMenus = _data.find(item => item.module === 'portal')
      const _reSortMenus = _data.filter(item => item.module !== 'portal');
       if(_data.find(item => item.module === 'portal')) _reSortMenus.unshift(portalMenus);
      this.setState({ data: _reSortMenus });
    });
    this.props.onAsideHiddenChange(result?.value.length === 0);
    this.setState({ asideData: result?.value });
  }

  render() {
    const { data, value, angleCountArrObj } = this.state;
    return <AsideMenuContent {...this.props} data={data} value={value} onChange={this.onChange} angleCountArrObj={angleCountArrObj} onAsideMenuSettingChange={this.onAsideMenuSettingChange}/>;
  }
}

class AsideMenuContent extends React.PureComponent {
  constructor(props) {
    super(props);
    // this.state = { data: [], value: '', expandKeys: [] };
    this.state = { data: [], value: '', angleCountArrObj: {} };
  }

  componentDidMount() {
    const data = utils.deepClone(this.props.data);
    const value = utils.deepClone(this.props.value);
    const angleCountArrObj = utils.deepClone(this.props.angleCountArrObj);
    this.setAngleCount(data, angleCountArrObj);
    this.setParentIds(data, '', []);
    this.setData(data, value);
  }

  componentWillReceiveProps(nextProps) {
    if (!utils.isEqual(this.props.data, nextProps.data) || !utils.isEqual(this.state.value, nextProps.value) || !utils.isEqual(this.state.angleCountArrObj, nextProps.angleCountArrObj)) {
      const data = utils.deepClone(nextProps.data);
      const value = utils.deepClone(nextProps.value);
      const angleCountArrObj = utils.deepClone(nextProps.angleCountArrObj);
      this.setAngleCount(data, angleCountArrObj);
      this.setParentIds(data, '', []);
      this.setData(data, value);
    }
  }

  // 设置角标数据
  setAngleCount = (data, angleCountArrObj) => {
    // console.log('设置角标数据', data, angleCountArrObj);
    data.forEach((item) => {
      if (angleCountArrObj[item.id]) {
        item.angleCount = angleCountArrObj[item.id];
      }
      if (item.children && item.children.length > 0) {
        this.setAngleCount(item.children, angleCountArrObj);
      }
    })
  }

  setParentIds = (data, parentId, parentIds) => {
    data.forEach((item) => {
      item.parentIds = parentId ? [...parentIds, parentId] : [];
      if (item.children && item.children.length > 0) {
        this.setParentIds(item.children, item.id, item.parentIds);
      }
    });
  }

  setData = (data, value) => {
    let _data = [], _value = '';
    if (data && data.length > 0) {
      _data = this.format(data);
      _value = value || this.getValue(_data);
      // _expandKeys = this.getExpandKeys(_data, _value);
    }
    // this.setState({ data: _data, value: _value, expandKeys: _expandKeys });
    this.setState({ data: _data, value: _value });
  }

  // setData = (data, value) => {
  //   let _data = [], _value = '';
  //   if (data && data.length > 0) {
  //     _data = this.format(data);
  //     _value = value || this.getValue(_data);
  //   }
  //   this.setState({ data: _data, value: _value });
  // }

  format = (data, parentId, moduleStr) => {
    return data.map((item) => {
      // 处理设置中 /setting（暂时）
      if (item.menuName === '设置') {
        if (item.children) {
          item.subsetting = item.children;
          delete item.children;
        }
        if (item.pageId === '/setting' && moduleStr !== 'portal') {
          item.pageId = '';
        }
      }
      const _item = utils.deepClone(item);
      // 为了解决一级菜单点击定位问题而进行的修改，一级菜单也带 moduleStr
      // moduleStr ? _item.moduleStr = moduleStr : delete _item.moduleStr;
      moduleStr ? _item.moduleStr = moduleStr : _item.moduleStr;
      parentId ? _item.parentId = parentId : delete _item.parentId;
      
      // 无图标应用单独处理
      let iconName = '';
      switch (item.module) {
        case 'portal':
          iconName = 'Icon-gateway';
          break;
        case 'profile':
          iconName = 'Icon-set-up';
          break;
        case 'hrm/addressbook':
          iconName = 'Icon-maillist2-o';
          break;
        case 'hrm/orgsetting':
          iconName = 'Icon-organizational-structure-o';
          break;
      }
      // 无图标
      const itemIconOne = (
        <div className="app-737142488378564608-asidemenu-item">
          <Icon name={iconName} size="lg" style={{marginRight: '20px'}} />
          <div className="app-737142488378564608-asidemenu-item-content">
            <div className="app-737142488378564608-asidemenu-item-content-title">
              <div className="app-737142488378564608-asidemenu-item-content-title-text">{item.menuName}</div>
            </div>
          </div>
          <span className="app-737142488378564608-asidemenu-item-right"><Icon name="Icon-Right-arrow01" size="lg"/></span>
        </div>
      );
      // 有图标
      const itemIconTwo = (
        <div className="app-737142488378564608-asidemenu-item">
          <AppIcon value={item.module || ''} noLinear={true} size={22} />
          <div className="app-737142488378564608-asidemenu-item-content">
            <div className="app-737142488378564608-asidemenu-item-content-title">
              <div className="app-737142488378564608-asidemenu-item-content-title-text">{item.menuName}</div>
            </div>
          </div>
          <span className="app-737142488378564608-asidemenu-item-right"><Icon name="Icon-Right-arrow01" size="lg"/></span>
        </div>
      );
      _item.icon = parentId ? '' : item.module === 'portal' || item.module === 'profile' || item.module === 'hrm/addressbook' || item.module === 'hrm/orgsetting' ? itemIconOne : itemIconTwo;
      _item.activeIcon = '';
      _item.title = item.menuName || item.content;
      _item.content = (
        <div className="app-737142488378564608-asidemenu-title">
          <div title={item.menuName || item.content} className="app-737142488378564608-asidemenu-title-text">{item.menuName || item.content}{item.angleCount && item.angleType === 1 ? `(${item.angleCount})` : ''}</div>
          {item.count !== 0 && <div className="app-737142488378564608-asidemenu-title-count">{item.count}</div>}
          {item.hasSearch === 1 && (
            <div title="自定义菜单设置" className="app-737142488378564608-asidemenu-setting-icon" onClick={this.onSetting}>
              <CorsComponent app="@weapp/cusapp" compName="SetSearchDialogComp" menu={{ id: item.id }} menus={{ ...item }} onSave={this.onSave}/>
            </div>
          )}
          {item.angleType === 0 && item?.angleCount > 0 && <div className={item.angleType === 0 ? "app-737142488378564608-asidemenu-angle-count" : ''}>{item?.angleCount}</div>}
          {item?.angleIcon && <div><Icon name={item?.angleIcon} onClick={(e) => {this.toAngleRoute(item?.angleRoute, e)}} /></div>}
        </div>
      );
      if (_item.children && _item.children.length > 0) {
        _item.children = this.format(_item.children, item.id, item.moduleStr || _item.moduleStr);
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

  // getExpandKeys = (data, value) => {
  //   let expandKeys = [];
  //   const loop = (data) => {
  //     data.forEach((item) => {
  //       if (item.id === value) {
  //         expandKeys = item.parentIds || [];
  //       } else if (item.children && item.children.length > 0) {
  //         loop(item.children);
  //       }
  //     });
  //   }
  //   loop(data);
  //   return expandKeys;
  // }

  onChange = (value, item, e) => {
    // console.log('菜单切换', value, item, e);
    if(item && item.pageType && item.pageType == 'dir'){
      return
    }
    this.setState({ value }, () => this.props.onChange(item, e));
  }

  onSetting = (e) => {
    // console.log('自定义菜单点击', e, item.moduleStr, this.state.data);
    // const b = this.state.data.find(a => a.module === item.moduleStr);
    // console.log(b?.children);
    utils.pauseEvent(e);
  }

  toAngleRoute = (angleRoute, e) => {
    utils.pauseEvent(e);
    this.props.history.push(angleRoute);
  }

  // 齿轮点击之后保存回调，重新请求接口数据
  onSave = () => {
    this.props.onAsideMenuSettingChange();
  }

  render() {
    const { data, value } = this.state;
    return (
      <div className="app-737142488378564608-asidemenu">
        <Scroller height={document.body.clientHeight - 60 - 102}>
          <Menu
            type="menu"
            mode="inline"
            inlineIndent={18}
            inlineCollapsed={true}
            data={data}
            value={value}
            needFormatData={false}
            parentCanBeSelected={true}
            triggerProps={{ popupClassName: 'app-737142488378564608-asidemenu-popup' }}
            childTriggerProps={{ popupClassName: 'app-737142488378564608-asidemenu-popup' }}
            onChange={this.onChange}
          />
         {/*
                   <Menu
            type="menu"
            mode="horizontal"
            data={data}
            position="left"
            hideBottomLine
            value={value}
            childTriggerProps={{
              popupClassName: 'menuDemo-tabs'
            }}
            childPopupPlacement="right"
            popupPlacement="right"
            childChangeToUpdateParent={false}
            onChange={this.onChange}
          />
          */}
        </Scroller>
      </div>
    );
  }
}

export default withRouter(AsideMenu);
