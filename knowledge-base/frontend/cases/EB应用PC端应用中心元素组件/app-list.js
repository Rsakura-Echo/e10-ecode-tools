

import React from 'react';
import { Menu } from '@weapp/ui';

const { MenuContent } = Menu;

const prefixCls = `ecode-com-applist`;

export default class AppList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      data: [],
      selectMenu: ''
    };
  }

  loadData = () => {
    this.setState({
      menus: [
        { id: 'recent', content: '最近使用' },
        { id: 'todo-tools', content: '代办工具' },
        { id: 'research', content: '问卷调研' },
        { id: 'hrm', content: '综合人事' }
      ],
      data: [
        { tabId: 'recent', name: '客户管理', logoSrc: 'https://eteams.cn/css/index/icon-customer.png'  , url: 'https://eteams.cn/product/customer' },
        { tabId: 'recent', name: '商机线索', logoSrc: 'https://eteams.cn/css/index/icon-salechance.png'  , url: 'https://eteams.cn/product/salechance' },
        { tabId: 'recent', name: '报价管理', logoSrc: 'https://eteams.cn/css/index/icon-price.png'  , url: 'https://eteams.cn/product/price' },
        { tabId: 'recent', name: '合同订单', logoSrc: 'https://eteams.cn/css/index/icon-orderform.png'  , url: 'https://eteams.cn/product/contract' },
        { tabId: 'recent', name: '电子签署', logoSrc: 'https://eteams.cn/css/index/icon-eletronic.png'  , url: 'https://eteams.cn/product/electronic' },
        { tabId: 'recent', name: '费用报销', logoSrc: 'https://eteams.cn/css/index/icon-expensesclaim.png'  , url: 'https://eteams.cn/product/expensesclaim' },
        { tabId: 'recent', name: '公文管理', logoSrc: 'https://eteams.cn/css/index/公文管理.png'  , url: 'https://eteams.cn/product/odoc' },
      ],
      selectMenu: 'recent'
    });
  }

  componentDidMount() { // 加载应用数据
    this.loadData();
  }

  renderMenuTab = () => {
    const { menus = [], selectMenu } = this.state;
    return <div className={`${prefixCls}-menu`}>
      <Menu
        bindKey={"applist"}
        value={selectMenu}
        data={menus}
        onChange={val => this.setState({ selectMenu: val })}
      />
    </div>

  }

  renderMenuContent = () => {
    const { menus = [], data = [] } = this.state;
    
    return <div className={`${prefixCls}-content`}>
      {
        menus.map(x => {
          const subData = data.filter(sub => sub.tabId === x.id);
          return <MenuContent
            bindKey={"applist"}
            dataId={this.state.selectMenu}
            value={x.id}
          >
            <div className={`${prefixCls}-itemlist`}>
              {subData.map(subData => {
                return <div className={`${prefixCls}-item`} onClick={() => {
                  window.open(subData.url);
                }}>
                  <div className={`${prefixCls}-logo`}>
                    <img src={subData.logoSrc}/>
                  </div>
                  <div className={`${prefixCls}-name`}>{subData.name}</div>
                </div>
              })}
            </div>
          </MenuContent>
        })
      }
    </div>
  }

  render() {
    return <div className={prefixCls}>
      {this.renderMenuTab()}
      {this.renderMenuContent()}
    </div>
  }

}
