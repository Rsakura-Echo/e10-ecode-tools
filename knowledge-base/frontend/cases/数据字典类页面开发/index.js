

import React from 'react';
import { Select, Table, Button } from '@weapp/ui';
import { asyncImport } from '@weapp/ecodesdk';
import { setTitle } from '@weapp/utils';
import TableInfo from './table-info';

const prefixCls = 'ecode-datadic';

class DataDic extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      data: [],
      modulename: '',
      database: '',
      visible: false,
      modalData: {}
    };
  }

  loadData = () => {
    asyncImport('${appId}', 'data').then(res => {
      const { columns, data } = res.default;
      this.setState({ columns, data });
    })
  }

  componentDidMount() {
    this.loadData();
    setTitle({
      title: '数据字典'
    })
  }

  handleModule = (val) => {
    this.setState({ modulename: val });
  }

  handleDatabase = (val) => {
    this.setState({ database: val });
  }

  getSelectData = (keyname) => {
    const { data } = this.state;
    const keySet = new Set();
    const res = [];
    data.forEach(x => {
      if (!keySet.has(x[keyname])) {
        res.push({
          id: x[keyname], content: x[keyname]
        });
        keySet.add(x[keyname]);
      }
    })
    return res;
  }

  handleCls = () => {
    this.setState({ modulename: '', database: '' })
  }

  render() {

    const { columns, data, modulename, database, visible, modalData } = this.state;

    return <div className={`${prefixCls}-body`}>
      <div className={`${prefixCls}-header`}>  
        <div className={`${prefixCls}-title`}>
          数据字典
        </div>
        <div className={`${prefixCls}-opt`}>
          <div className={`${prefixCls}-opt-item`}>
            <Select
              data={this.getSelectData('modulename')}
              onChange={this.handleModule}
              value={modulename}
            />
          </div>
          <div className={`${prefixCls}-opt-item`}>
            <Select
              data={this.getSelectData('database')}
              onChange={this.handleDatabase}
              value={database}
            />
          </div>
          <div className={`${prefixCls}-opt-item`}>
            <Button onClick={this.handleCls} >重置</Button>
          </div>
        </div>
      </div>
      <div className={`${prefixCls}-data`}>
        <Table
          columns={columns.map(x => ({
            dataIndex: x.dataIndex,
            title: x.title
          }))}
          data={data.filter(x => {
            if (modulename != '' && database != '') {
              return x.modulename === (modulename) && x.database === database;
            }
            if (modulename != '') {
              return x.modulename === modulename;
            }
            if (database != '') {
              return x.database === database;
            }
            return true;
          })}
          showOrder
          bordered
          onRowClick={(data) => {
            this.setState({ visible: true, modalData: data });
          }}
        />  
      </div>
      <TableInfo
        visible={visible}
        title={`${modalData.tablename || ''}`}
        data={modalData}
        onClose={() => this.setState({ visible: false })}
      />
    </div>
  }

}

export default DataDic;