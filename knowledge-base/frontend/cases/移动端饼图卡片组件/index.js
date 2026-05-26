

import React from 'react';

import { MEChart } from '@weapp/ui';

const prefixCls = 'ecode-com-m-pie-card';

class PieCard extends React.Component {

  render() {
    const { datas = [], colors, title, names = [], unit = '' } = this.props;
    const allSum = datas.reduce((a, b) => a + b);
    const options = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'right',
        top: 'middle',
        textStyle: {
          color: 'gray'
        },
        formatter: (name, data) => {
          let index = names.indexOf(name);
          return name + ' | ' + datas[index] + unit + ' | ' + (datas[index] / allSum * 100).toFixed(2) + '%';
        }
      },
      series: [
        {
          type: 'pie',
          left: 0,
          bottom: 0,
          top: 0,
          right: 200,
          data: datas.map((x, index) => {
            return { value: x, name: names[index] }
          }),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            show: false
          }
        }
      ]
    }
    if (Array.isArray(colors)) {
      options.color = colors;
    }
    return <div className={prefixCls}>
      {title && <div className={`${prefixCls}-title`}>{title}</div>}
      <MEChart
        style={{height: 180}}
        option={options}
      />
    </div>
  }

}

export default PieCard;
