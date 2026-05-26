
import React from 'react';
import { Dialog, Button, Table } from '@weapp/ui';
import AddDialog from './add';

export default class FillComModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      addVisible: false
    };
  }

  handleClose = () => {
    this.props?.onClose();
  }

  loadData = () => {
    // 加载配置列表数据
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
  }

  componentDidMount() {
    this.loadData();
  }

  addTemplateData = () => {
    this.setState({ addVisible: true });
  }

  render() {
    const { visible } = this.props;
    const { loading, addVisible } = this.state;

    const columns = [
      { title: '编号', dataIndex: 'id' },
      { title: '名称', dataIndex: 'name' },
      { title: '添加时间', dataIndex: 'add_date' },
      { title: '操作', dataIndex: 'opt', bodyRender: (data) => {
        return <div className={`toolbar-opt`}>
          <Button size="small" type="primary">使用</Button>
          <div style={{ width: 6 }}></div>
          <Button size="small" type="danger">删除</Button>
        </div>
      } },
    ];

    return <Dialog
      title={'自定义数据填充'}
      closable
      destroyOnClose
      scale
      draggable
      mask
      maskClosable
      top="10%"
      width={'75%'}
      icon={'Icon-N-Applysettings'}
      visible={visible}
      onClose={this.handleClose}
      buttons={[
        <Button onClick={this.loadData}>刷新</Button>,
        <Button onClick={this.addTemplateData}>添加</Button>
      ]}
    >
      <Table
        loading={loading}
        data={[]}
        columns={columns}
      />
      <AddDialog visible={addVisible} onClose={() => this.setState({ addVisible: false })} />
    </Dialog>

  }

}
