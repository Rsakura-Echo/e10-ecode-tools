import { SlideTabs, Layout, Carousel } from '@weapp/ui';
import { request } from '@weapp/utils';

let fProps

export default class NewButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentValue: '2',
      data: this.props?.children?.props?.data || [],
      props: this.props,
      MathRandom: Math.random()
    }
  }

  componentDidMount() {
    const { weId = "" } = this.props;
    if (weId && weId.endsWith("_4j9239")) {
      fProps = this.props
      this.onChange('2')
    }
  }

  onChange = (value: string) => {
    this.setState({
      currentValue: value
    })
    this.props.callback(value);

    let meetingidReg = /meetingId=(\d+)/;
    let signFlagReg = /signFlag=(\d+)/;
    let params = {
      meetingid: window.location.href.match(meetingidReg)[1],
      signFlag: window.location.href.match(signFlagReg) ? window.location.href.match(signFlagReg)[1] : '',
      showNotSign:value
    }
    window.setScreenDataState(value)
    window.reloadScreenData(params)
  }

  render() {
      return (<>
        <span className="ns-custom-slideTabs">
          <SlideTabs
            data={
              [
                { id: '2', content: '全部1' },
                { id: '0', content: '已签到2', },
                { id: '1', content: '未签到3' },
              ]
            }
            value={this.state.currentValue}
            onChange={this.onChange}
          />
          </span>
        </>)
    } 
}