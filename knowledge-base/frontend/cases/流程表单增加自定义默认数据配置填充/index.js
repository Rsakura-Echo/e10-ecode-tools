

import React from 'react';
import FillComModal from './com';
import { Icon } from '@weapp/ui';
const prefixCls = 'ecode-wf-fill-ball-com';

export default class FillBall extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      modalVisible: false
    }
  }

  componentDidMount() {
    // 设置轮循器，判断流程表单sdk是否初始化完成
    let t = 0;
    const inter = setInterval(() => {
      try {
        const weFormSdk = WeFormSDK.getWeFormInstance();
        this.setState({ visible: true });
        clearInterval(inter);
      } catch(err) {}
      if (t++ > 300) {
        console.error('获取weFormSdk超时');
        clearInterval(inter);
      }
    }, 100);
  }

  render() {
    const { visible, modalVisible } = this.state;
    if (!visible) return <></>;

    return <>
      { 
        visible && <div className={prefixCls}>
          <div className={`${prefixCls}-bg`} onClick={() => {
            this.setState({ modalVisible: true });
          }}><Icon component={<svg  class="icon" viewBox="0 0 1024 1024"  p-id="5125" width="38" height="38">
            <path d="M418.496 645.344L259.04 554.592a32 32 0 0 0-31.68 55.616l159.456 90.752a32 32 0 0 0 31.68-55.616z" p-id="5126">
            </path>
            <path d="M790.208 379.808a32 32 0 0 0-31.616-55.648L508.8 466.336 259.04 324.192a32 32 0 0 0-31.68 55.616l253.344 
            144.16V832a32 32 0 1 0 64 0V522.688c0-0.992-0.48-1.856-0.576-2.848l246.08-140.032z" p-id="5127"></path>
            <path d="M880.288 232.48L560.192 45.12a95.648 95.648 0 0 0-96.64 0L143.68 232.48A96.64 
            96.64 0 0 0 96 315.904v397.664c0 34.784 18.624 66.88 48.736 84l320 181.92a95.52 95.52 0 0 0 94.496 
            0l320-181.92a96.576 96.576 0 0 0 48.768-84V315.904a96.64 96.64 0 0 0-47.712-83.424zM864 713.568c0 
            11.584-6.208 22.304-16.256 28l-320 181.92a31.776 31.776 0 0 1-31.488 0l-320-181.92a32.192 32.192 0 0 
            1-16.256-28V315.904c0-11.456 6.048-22.048 15.904-27.808l319.872-187.36a31.84 31.84 0 0 1 32.192 0l320.128
             187.392c9.856 5.728 15.904 16.32 15.904 27.776v397.664z" p-id="5128"></path>
             <path d="M778.656 453.952L629.312 542.08c-20.608 12.16-37.344 38.944-37.344 59.808v176.416c0 20.864 16.704 
             27.904 37.344 15.744l149.344-88.128C799.264 693.76 816 666.976 816 646.112V469.696c0-20.864-16.704-27.904-37.344-15.744z"
              p-id="5129">
            </path>
          </svg>} /></div>
        </div> 
      }
      <FillComModal visible={modalVisible} onClose={() => {
        this.setState({ modalVisible: false, visible: true });
      }} />
    </>
  }

}
