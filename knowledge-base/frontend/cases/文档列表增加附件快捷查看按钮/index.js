


import { Dialog, Table, Button } from '@weapp/ui';
import { dayjs } from '@weapp/utils';
import React from 'react';
import { inject, observer } from "mobx-react";


@inject('attachDialogStore')
@observer
class AttachListDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  handleDown = (record) => {
    const downUrl = `/api/file/remotedownload/${record.fileid}/upload/true?docId=${record.docId}&module=document`;
    // 下载文件
    const downloadElement = document.createElement('a');
    downloadElement.href = downUrl;
    document.body.appendChild(downloadElement);
    downloadElement.click(); //点击下载
    document.body.removeChild(downloadElement); //下载完成移除元素
  }


  onClose = () => {
    this.props.onClose?.();
  }

  render() {

    const { doc } = this.props;
    const { docAttachments = [] } = doc || {};

    return <Dialog 
      visible={this.props.visible}
      title={"查看附件-" + doc.name}
      footer={[
        <Button onClick={this.onClose}>关闭</Button>
      ]}
      onClose={this.onClose}
      width="65%"
      mask={false}
      maskClosable={false}
      resize={true}
      closable
      scale={true}
    >
      <Table
        columns={[
          { title: '模块', dataIndex: 'module' },
          { title: '名字', dataIndex: 'name' },
          { title: '大小', dataIndex: 'size' },
          { title: '类型', dataIndex: 'type' },
          { title: '上传时间', dataIndex: 'uploadTime', bodyRender: (record) => {
            return dayjs(record.uploadTime).format('YYYY-MM-DD HH:mm:ss');
          } },
          { title: '操作', dataIndex: 'opt', bodyRender: (record) => {
            return <Button type="primary" onClick={() => this.handleDown(record)} >下载</Button>
          } },
        ]}
        data={docAttachments}
        bordered={true}
      />
    </Dialog>
  }

}


export default AttachListDialog;
