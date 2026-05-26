




import React from 'react';
import GraphCollapse from './index';
import { setTitle } from '@weapp/utils';
import { MEChart } from '@weapp/ui';


class Page extends React.Component {

  componentDidMount() {
    setTitle({
      title: '移动端图表折叠面板'
    })
  }

  render() {
    return <div style={{ padding: 12 }}>
      <GraphCollapse
        title="边际成本"
        headerTitle={'单位名称'}
        headerUnit={'边际成本（元/MWh）'}
        defaultExpenseKeys={[]}
        datas={[
          {
            id: '1',
            name: '邯郸厂',
            value: '285.13',
            renderChart: () => {
              return <MEChart
                style={{ height: 200 }}
                option={{
                  xAxis: {
                    type: 'category', data: ['0:00', '4:00', '8:00', '12:00', '16:00', '20:00', '24:00'], boundaryGap: false
                  },
                  yAxis: { type: 'value' },
                  series: [{
                    type: 'line',
                    smooth: true,
                    data: [10, 20,30,40,50,60,10]
                  }],
                  legend: { left: 'right' },
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
                }}
              />
            }
          },
          {
            id: '2',
            name: '邯郸厂',
            value: '285.13',
            renderChart: () => {
              return <MEChart
                style={{ height: 200 }}
                option={{
                  xAxis: {
                    type: 'category', data: ['0:00', '4:00', '8:00', '12:00', '16:00', '20:00', '24:00'], boundaryGap: false
                  },
                  yAxis: { type: 'value' },
                  series: [{
                    type: 'line',
                    smooth: true,
                    data: [10, 20,30,40,50,60,10]
                  }],
                  legend: { left: 'right' },
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
                }}
              />
            }
          },
          {
            id: '3',
            name: '邯郸厂3',
            value: '285.13',
            renderChart: () => {
              return <MEChart
                style={{ height: 200 }}
                option={{
                  xAxis: {
                    type: 'category', data: ['0:00', '4:00', '8:00', '12:00', '16:00', '20:00', '24:00'], boundaryGap: false
                  },
                  yAxis: { type: 'value' },
                  series: [{
                    type: 'line',
                    smooth: true,
                    data: [10, 20,30,40,50,60,10]
                  }],
                  legend: { left: 'right' },
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
                }}
              />
            }
          }
        ]}
      />
    </div>
  }

}


export default Page;
