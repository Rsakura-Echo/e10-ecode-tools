import React from 'react';
import { Carousel, Icon } from '@weapp/ui';
import { weappSDK  } from '@weapp/utils';

const prefixCls = `ecode-login-carousel`
const carouselCls = 'ecode-com-carousel-bg';

const s1 = "/ecodestatic/release/resources/975837194108436484/image (1).png" ;
const s2 = "/ecodestatic/release/resources/975837194108436484/image (2).png";
const s3 = "/ecodestatic/release/resources/975837194108436484/image.png";

 /*
 * @params functionName: 'closeWindow' 关闭窗口, 'maxmizeWindow' 最大视口, 'minmizeWindow' 最小化, isMinimized 是否最小化
 * isMaximized  是否最大化，
 * */
const changeClientWindow = (functionName) => {
    weappSDK.checkApi(functionName).then((res)=> {
      weappSDK.exec(functionName,{})
    },(err) => {
      console.log(err)
    })
}

const isMac = (): boolean => {
 const userAgent = navigator.userAgent.toLowerCase();
 return /mac os/.test(userAgent);
}
export default class LoginCarousel extends React.Component {

  constructor(props: any) {
    super(props);
    this.state = {
      isShow: true,
      isMaximized: false
    }
  }
  
  componentDidMount() {
    window.addEventListener('click', (e) => {
      this.setState({
        isShow:location.pathname === '/login'
      })
    })
    window.addEventListener('popstate', () => {
      this.setState({
        isShow:location.pathname === '/login'
      })
    })
    weappUtils?.weappSDK?.customSDK?.invoke('isMaximized',{
      success:(e) => this.setState({isMaximized: e.result})
    })
    // let a = document.querySelector('.weapp-passport-common-login-panel-link')
  }

  renderClientOperation() {
    const {isMaximized} = this.state
    const clientOperationList = [
      {
        imgUrl: '/ecodestatic/operateBtn/mini.png',
        operationType: 'minimizeWindow',
        name: 'Icon-open'
      },
      {
        imgUrl: isMaximized? '/ecodestatic/operateBtn/scaleing.png': '/ecodestatic/operateBtn/full.png',
        operationType: 'maxmizeWindow',
        name: 'Icon-Mark-complete'
      },
      {
        imgUrl: '/ecodestatic/operateBtn/close.png',
        operationType: 'closeWindow',
        name: 'Icon-error01'
      }
    ]
    return (<div className='app-775135562923868254-clientOperation'>
      {
        !isMac() && clientOperationList.map((item, i) => (
          <Icon className='app-774996148288151553-client-operation-icon' 
          url={item.imgUrl} 
          size='lg' 
          onClick={() => {
            if(item.operationType === 'maxmizeWindow') {
              this.setState({isMaximized: !isMaximized})
            }
            changeClientWindow(item.operationType)}
          } />
        ))
      }
    </div>)
  }

  render() {
    const { isShow } = this.state
    return <> 
      {isShow && <div className={prefixCls}>
        <Carousel
          autoplay
          fillWays="imgFill"
          effect='fade'
          fadeEffect={
            { crossFade: true }
          }
          navigation
          loop
        >
          <img src={s1} alt="" />
          <img src={s2} alt="" />
          <img src={s3} alt="" />
        </Carousel>
      </div>}
      {this.renderClientOperation()}
    </>
  }

}

