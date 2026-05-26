


import React from 'react';
import axios from 'axios';
import { Spin, Select, Button, Dialog, Menu, Icon } from '@weapp/ui';
const prefixCls = `ecode-eb-com-weather`;
const { MenuContent } = Menu;
import WeatherCom from './weather-com';
// https://www.cnblogs.com/toosuo/p/3868004.html 城市代码
const cityData = [
  { id: '101010100', content: '北京市', },
  { id: '101020100', content: '上海市' },
  { id: '101271106', content: '长宁区' },
  { id: '101020200', content: '闵行区' },
  { id: '101021300', content: '浦东新区' },
  { id: '101210401', content: '宁波' }
];

export default class Com extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      value: '',
      data: [],
      errmsg: '',
      select: ''
    }
  }

  loadData = () => {
    this.setState({ loading: true, select: '', value: '', errmsg: '', data: [] });
    axios({
      url: '/api/ecode/serverless/func/exec', method: 'post', data: {
        funcId: '781490787315097600', token: 'HLM2PO1LNKM301PL20E', params: {}
      }
    }).then(res => {
      if (res.status === 200 && res.data?.code === 200) {
        this.setState({ data: res.data?.data?.data || [], errmsg: '', select: (res.data?.data?.data || [])[0]?.id });
      } else {
        this.setState({ errmsg: res.data?.data?.msg || '获取失败' });
        Dialog.message({ type: 'error', content: '请求失败' + res.data.msg });
      }
    }).catch(err => {
      console.error(err);
      Dialog.message({ type: 'error', content: '请求异常' });
    }).finally(() => this.setState({ loading: false }))
  }

  componentDidMount() {
    this.loadData();
  }


  handleWeather = (code) => {
    if (!code) return undefined;
    return <WeatherCom code={code} />
  }

  renderMenuContent = () => {
    const { data = [], select } = this.state;
    
    return data.map(x => {
      const obj = data.find(y => y.id === select);
      return <MenuContent
        bindKey={"weather-com"}
        dataId={select}
        value={x.id}
      >
        <div className={`${prefixCls}-body`}>
          {this.handleWeather(obj?.citycode)}
        </div>
      </MenuContent>
    });
  }

  addData = () => {
    const { value } = this.state;
    axios({
      url: '/api/ecode/serverless/func/exec', method: 'post', data: {
        funcId: '781490834509406208', token: 'LPQMTSLQQTKLSSLMOMA', params: { citycode: value }
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
            funcId: '781490903431897091', token: 'FJK2NM1M0KMK3LN41MG', params: { id: this.state.select }
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
    </div>
  }
  render() {
    const { loading, value, select, data = [] } = this.state;
    return <div className={prefixCls}>
      <div className={`${prefixCls}-toolbar`}>
        <div className={`${prefixCls}-toolbar-select`}>
          <Select allowClear showSearch data={cityData}  value={value} placeholder="请选择城市" onChange={val => this.setState({ value: val })} />
        </div>
        <div style={{ width: 12 }}></div>
        <div className={`${prefixCls}-toolbar-button`}><Button type="primary" disabled={!value} onClick={this.addData}>添加</Button></div>
      </div>
      <Spin spinning={loading}>
        <Menu
          bindKey={'weather-com'}
          value={select}
          data={data.map(x => ({ ...x, content: cityData.find(y => y.id === x.citycode)?.content || '' }))}
          onChange={(val) => this.setState({ select: val })}
          extraContent={this.renderExtra()}
        />
        { this.renderMenuContent() }
      </Spin>
    </div>
  }

}