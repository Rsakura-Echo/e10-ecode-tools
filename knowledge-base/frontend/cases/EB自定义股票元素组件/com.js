





import React from 'react';
import axios from 'axios';
import { Spin, Select, Button, Dialog, Menu, Icon } from '@weapp/ui';
const prefixCls = `ecode-eb-com-stock`;
const { MenuContent } = Menu;
import StockCom from './stock-com';
export default class Com extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      confData: [],
      select: '',
      addDatas: [],
      value: '',
      itemObjs: {}
    }
  }

  loadData = () => {
    this.setState({ loading: true });
    // 获取股票配置信息数据
    axios({
      url: '/api/ecode/serverless/func/exec', method: 'post', data: {
        funcId: '781658724858191872', token: 'DH6331744L7163K374I', params: {}
      }
    }).then(res => {
      if (res.status === 200 && res.data?.code === 200) {
        const data = res.data?.data?.data || [];
        console.info('data => ', data);
        this.setState({ confData: data, select: data[0]?.id });
      } else {
        Dialog.message({ type: 'error', content: '请求失败' + res.data.msg });
      }
    }).catch(err => {
      console.error(err);
      Dialog.message({ type: 'error', content: '请求异常' });
    }).finally(() => this.setState({ loading: false }))
  }

  loadStockList = () => {
    axios({
      url: '/api/ecode/serverless/func/exec', method: 'post', data: {
        funcId: '781657238833061888', token: 'LPQNNLOORRQQQLMNRSA', params: {}
      }
    }).then(res => {
      if (res.status === 200 && res.data?.code === 200) {
        this.setState({ addDatas: (res.data?.data?.data || []).map(x => ({...x, content: x.mc, id: x.dm })) });
      } else {
        Dialog.message({ type: 'error', content: '请求失败' + res.data.msg });
      }
    }).catch(err => {
      console.error(err);
      Dialog.message({ type: 'error', content: '请求异常' });
    })
  }

  componentDidMount() {
    this.loadData();
    this.loadStockList();
  }

  renderMenuContent = () => {
    const { select, confData } = this.state;
    return confData.map(x => {
      const { dm } = x;
      return <MenuContent
        bindKey={"stock-com"}
        dataId={select}
        value={x.id}
      >
        <StockCom dm={dm} mount={ obj => this.setState({ itemObjs: { ...this.state.itemObjs, [select]: obj } }) } />
      </MenuContent>
    })
  }

  addData = () => {
    const { value } = this.state;
    axios({
      url: '/api/ecode/serverless/func/exec', method: 'post', data: {
        funcId: '781658789374976001', token: 'FJK331L5LML4NN5200G', params: { dm: value }
      }
    }).then(res => {
      if (res.status === 200 && res.data?.code === 200) {
        this.loadData();
        Dialog.message({ type: 'success', content: '添加成功' });
      } else {
        Dialog.message({ type: 'error', content: '请求失败' + res.data.msg });
      }
    }).catch(err => {
      console.error(err);
      Dialog.message({ type: 'error', content: '请求异常' });
    })
  }

  renderExtra = () => {
    return <div className={`${prefixCls}-extra`}>
      <div className={`${prefixCls}-extra-item`} onClick={() => {
        axios({
          url: '/api/ecode/serverless/func/exec', method: 'post', data: {
            funcId: '781658815186722819', token: 'JNOLL1POL0LPLMMNOMC', params: { id: this.state.select }
          }
        }).then(res => {
          if (res.status === 200 && res.data?.code === 200) {
            this.loadData();
            Dialog.message({ type: 'success', content: '删除成功' });
          } else {
            Dialog.message({ type: 'error', content: '请求失败' + res.data.msg });
          }
        }).catch(err => {
          console.error(err);
          Dialog.message({ type: 'error', content: '请求异常' });
        })
        
      }}><Icon size="lg" name="Icon-Rule-base-deletion" /></div>
      <div className={`${prefixCls}-extra-item`} onClick={() => {
        if (this.state.select) {
          this.state.itemObjs[this.state.select]?.reload();
        }
      }}><Icon name="Icon-Refresh" size="lg"/></div>
    </div>
  }

  render() {
    const { loading, confData = [], select, addDatas = [], value } = this.state;
    return <div className={prefixCls}>
      <Spin spinning={loading}>
        <div className={`${prefixCls}-toolbar`}>
          <div className={`${prefixCls}-toolbar-select`}>
            <Select allowClear showSearch data={addDatas}  value={value} placeholder="请选择股票" onChange={val => this.setState({ value: val })} />
          </div>
          <div style={{ width: 12 }}></div>
          <div className={`${prefixCls}-toolbar-button`}><Button type="primary" disabled={!value} onClick={this.addData}>添加</Button></div>
        </div>
        <Menu 
          bindKey={"stock-com"}
          data={confData.map(x => ({ ...x, content: addDatas.find(y => y.dm == x.dm)?.mc }))}
          value={select}
          onChange={select => this.setState({ select })}
          extraContent={this.renderExtra()}
        />
        { this.renderMenuContent() }
      </Spin>
    </div>
  }

}