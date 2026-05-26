
import React from 'react';

import { MEChart } from '@weapp/ui';

const prefixCls = 'ecode-com-m-curve-graph-card';

/**
 * 对组数据对比
 */
class CurveGraphCard extends React.Component {

  render() {

    const { datas = [], colors, title, names = [] } = this.props;

    const options = {
      title: {
        text: title || '折线图'
      },
      xAxis: {
        type: 'category',
        data: ['0:00', '4:00', '8:00', '12:00', '16:00', '20:00', '24:00'],
        boundaryGap: false
      },
      yAxis: {
        type: 'value'
      },
      series: datas.map((x, index) => {
        return {
          name: names[index] || '',
          data: x,
          type: 'line',
          smooth: true
        }
      }),
      legend: {
        left: 'right'
      },
      tooltip: { // 鼠标悬浮提示框显示 X和Y 轴数据
        trigger: 'axis',
        backgroundColor: 'rgba(32, 33, 36,.7)',
        borderColor: 'rgba(32, 33, 36,0.20)',
        borderWidth: 1,
        textStyle: { // 文字提示样式
          color: '#fff',
          fontSize: '12'
        },
        axisPointer: { // 坐标轴虚线
          type: 'cross',
          label: {
              backgroundColor: '#6a7985'
          }
        },
      }

    }
    if (Array.isArray(colors)) {
      options.color = colors;
    }
    return <div className={prefixCls}>
      <MEChart
        option={options}
      />
    </div>
  }

}


export default CurveGraphCard;
