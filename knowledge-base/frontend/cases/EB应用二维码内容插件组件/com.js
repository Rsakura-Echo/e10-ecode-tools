

import React from 'react';
import { Textarea, Button, Qrcode, Dialog } from '@weapp/ui';

const prefixCls = `ebapp-qrcode`;

function uuid() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}

export default class Com extends React.Component {

  comRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      content: '',
      qrText: ''
    }
  }

  handleCreate = () => { // 生成二维码
    this.setState({ qrText: this.state.content });
  }

  exportImg = () => { // 通过uuid的形式命名
    // 获取当前对象中的canvas对象，然后提取其中的图片以供下载
    const canvas = this.comRef?.current.querySelector('canvas');
    if (!canvas) {
      Dialog.message({ type: 'error', content: '未找到canvas对象' });
      return;
    }
    // 导出cavas图片
    const elink = document.createElement('a');
    elink.download = uuid() + '.png';
    elink.style.display = 'none';
    elink.href = canvas.toDataURL('image/png');
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href);
    document.body.removeChild(elink);
  }

  render() {
    return <div className={prefixCls} ref={this.comRef}>
      <div className={`${prefixCls}-img`}>
        <Qrcode
          url={this.state.qrText}
          size={150}
          level={'M'}
        />
      </div>
      <div className={`${prefixCls}-right`}>
        <div className={`${prefixCls}-content`}>
          <Textarea value={this.state.content} onChange={val => this.setState({ content: val })} />
        </div>
        <div className={`${prefixCls}-btns`}>
          <Button type="primary" onClick={this.handleCreate}>生成</Button>
          <div style={{ width: 12 }} />
          <Button type="primary" onClick={this.exportImg}>导出图片</Button>
        </div>
      </div>
    </div>
  }

}
