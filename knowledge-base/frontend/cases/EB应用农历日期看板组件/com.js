 
import React from 'react';
import loadjs from 'loadjs';
const prefixCls = `ebapp-ecode-lunar`;

export default class Com extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lunarDate: '',
      lunarYear: ''
    }
  }

  componentDidMount() {
    loadjs(['/api/ecode/resource/view/${appId}/lunar.js'], {
      success: () => {
        const lunar = Lunar.fromDate(new Date());;
        this.setState({ 
          lunarYear: `${lunar.getYearInGanZhi()}【${lunar.getYearShengXiao()}年】`,
          lunarDate: `${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`
        })
      }
    })
  }

  getWeek = () => {
    // 获取今天的星期
    const arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    return arr[new Date().getDay()];
  }

  getDay = () => {
    return new Date().getDate();
  }

  render() {
    const { lunarDate, lunarYear } = this.state;
    return <div className={prefixCls}>
      <div className={`${prefixCls}-left`}>
        <div className={`${prefixCls}-week`}>{this.getWeek()}</div>
        <div className={`${prefixCls}-day`}>
          {this.getDay()}
          <div className={`${prefixCls}-block`}></div>
        </div>
      </div>
      <div className={`${prefixCls}-line`} />
      <div className={`${prefixCls}-right`}>
        <div className={`${prefixCls}-lunar-date`}>{lunarDate}</div>
        <div className={`${prefixCls}-lunar-year`}>{lunarYear}</div>
      </div>
    </div>
  }

}
