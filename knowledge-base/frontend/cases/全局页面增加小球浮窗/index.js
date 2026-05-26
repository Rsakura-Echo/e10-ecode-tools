
import React from 'react';
import { Icon } from '@weapp/ui';
import message from './utils/message';

const prefixCls = `ecode-float-ball-main`;

class FloatBall extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      left: '80%',
      top: '80%'
    };
  }

  loadposData = () => { // 加载位置信息

  }

  componentDidMount() {
    this.loadposData();
  }

  handleClick = () => {
    message.info('点击了悬浮小球');
  }

  render() {
    const { left, top } = this.state;
    return <div style={{ left, top }} className={prefixCls} onClick={this.handleClick}>
      ecode
    </div>
  }

}

export default FloatBall;
