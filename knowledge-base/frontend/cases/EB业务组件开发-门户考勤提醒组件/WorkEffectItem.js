import { EChart, Icon } from "@weapp/ui";

interface TargetCardItemProps {
  title: string;
  num: any;
  unit: string;
  color: string;
  url?: string;
  urlDesc?: string;
}

export class TargetCardItem extends React.Component<TargetCardItemProps> {

  render() {
    const { title, num, unit, color, url='',urlDesc='' } = this.props;
    return (
      <div className={'Pa-element-target-card'}>
        <div className={'Pa-element-target-card-top'}>
          <div className={'Pa-element-target-card-top-color'} style={{ background: color }}></div>
          <div className={'Pa-element-target-card-top-title'}>{title}</div>
        </div>
        <div className={'Pa-element-target-card-bottom'}>
          <a 
            className={'Pa-element-target-card-bottom-num'}
            href={url}
            title={urlDesc}
            target='_blank'
          >{num}</a>
          <span
            className={'Pa-element-target-card-bottom-unit'}
            style={unit !== '' ? { marginLeft: '4px' } : {}}
          >
            {unit}
          </span>
        </div>
      </div>
    );
  }
}

interface IncreaseCardItemProps {
  title: string;
  num: any;
  unit: string;
  icon: string;
  url?: string;
  urlDesc?: string;
}

export class IncreaseCardItem extends React.Component <IncreaseCardItemProps> {
  render() {
    const { title, num, unit, icon, url='', urlDesc='' } = this.props;
    return (
      <div className={'Pa-element-increase-card'}>
        <div className={'Pa-element-increase-card-icon'}>
          <Icon name={icon} size={'sm'} />
        </div>
        <div className={'Pa-element-increase-card-content'}>
          <div className='Pa-element-increase-card-num'>
            <a 
              className={'Pa-element-increase-card-num-a'}
              href={url}
              title={urlDesc}
              target='_blank'
          >{num}</a>
            <span className={'Pa-element-increase-card-unit'}>{unit}</span>
          </div>
          <div className='Pa-element-increase-card-title'>{title}</div>
        </div>
      </div>
    );
  }
}


interface EChartHtProps {
  title: string;
  xData?: any[];
  yData?: any[];
  color?: any;
}

interface EChartHtState {
  barChartOpt: any;
}

export class EChartHt extends React.Component<EChartHtProps, EChartHtState> {
  echarts: any;

  constructor(props: any) {
    super(props);

    const { title, xData = [], yData = [], color = ['#5b4470'] } = props;
    this.state = {
      barChartOpt: {
        color: color,
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '10px',
          bottom: '45px',
          containLabel: false
        },
        xAxis: {
          type: 'category',
          data: xData,
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            interval: 0,
            formatter: function(value: any) {
              let ret = ''; // 拼接加\n返回的类目项
              let maxLength = 2; // 每项显示文字个数
              let valLength = value.length; // X轴类目项的文字个数
              let rowN = Math.ceil(valLength / maxLength); // 类目项需要换行的行数
              if (rowN > 1) {// 如果类目项的文字大于3
                for (let i = 0; i < rowN; i++) {
                  let temp = ''; // 每次截取的字符串
                  let start = i * maxLength; // 开始截取的位置
                  let end = start + maxLength; // 结束截取的位置
                  // 这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                  temp = value.substring(start, end) + '\n';
                  ret += temp; // 凭借最终的字符串
                }
                return ret;
              } else {
                return value;
              }
            }
          }
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [
          {
            name: '(万元)',
            type: 'bar',
            barWidth: '60%',
            // 数据
            data: yData
          }
        ]
      }
    };
  }

  componentDidUpdate(prevProps) {
    const {yData:prevYdata} = prevProps;
    const { xData = [], yData = [], color = ['#5b4470'] } = this.props;
    if(yData !== prevYdata){
      this.setState({barChartOpt: {
        color: color,
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '10px',
          bottom: '45px',
          containLabel: false
        },
        xAxis: {
          type: 'category',
          data: xData,
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            interval: 0,
            formatter: function(value: any) {
              let ret = ''; // 拼接加\n返回的类目项
              let maxLength = 2; // 每项显示文字个数
              let valLength = value.length; // X轴类目项的文字个数
              let rowN = Math.ceil(valLength / maxLength); // 类目项需要换行的行数
              if (rowN > 1) {// 如果类目项的文字大于3
                for (let i = 0; i < rowN; i++) {
                  let temp = ''; // 每次截取的字符串
                  let start = i * maxLength; // 开始截取的位置
                  let end = start + maxLength; // 结束截取的位置
                  // 这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                  temp = value.substring(start, end) + '\n';
                  ret += temp; // 凭借最终的字符串
                }
                return ret;
              } else {
                return value;
              }
            }
          }
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [
          {
            name: '(万元)',
            type: 'bar',
            barWidth: '60%',
            // 数据
            data: yData
          }
        ]
      }})
    }
  }

  render() {
    const { title, xData = [], yData = [], color = ['#5b4470'] } = this.props;

    return (
      <div className={'Pa-element-chart'}>
        <EChart option={this.state.barChartOpt} />
        <div className={'Pa-element-chart-title'}>
          {title}
        </div>
      </div>
    );
  }
}
