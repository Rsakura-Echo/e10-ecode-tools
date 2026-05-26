import React from 'react';
import { Carousel, Checkbox, Button } from '@weapp/ui';
import { Base64, encode, decode } from './utils/Base64'

const PUBLIC_KEY = "305c300d06092a864886f70d0101010500034b00304802410080913dd5d712743c94406b4ae1de541aa11d9a618b0e87d4724c5e608a92e1ef5497faaf53b543d15555ff706a3bee8e9e6b70228ffcc5fd5d6882a9f07e58770203010001";

export default class RememberPassword extends React.Component {

  constructor(props: any) {
    super(props);
    this.state = {
      accountCheckValue: Boolean(localStorage.getItem('accountCheckValue')),
      passwordCheckValue: Boolean(localStorage.getItem('passwordCheckValue'))
    }
  }
  
  componentDidMount() {
    loadjs("/ecodestatic/jsencrypt/jsencrypt.min.js",{
        success: function() {
        }
    })
    this.init()
    
  }

  encryptParamRsa = (param: any) => {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(PUBLIC_KEY);
    const encrypted = encrypt.encrypt(param);
    return encrypted;
  }

  init = function () {
    
    const loginBtn = document.querySelector('.weapp-passport-common-login-panel .weapp-passport-common-login-panel-btn')
    document.onkeydown = function (e) {
      var theEvent = window.event || e;
      var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
      if (code == 13) {
        const loginBtn = document.querySelector('.weapp-passport-common-login-panel .weapp-passport-common-login-panel-btn')
        loginBtn.click();
      }
    }
    
    // 点击登录，判断是否记住密码，是，存密码，不是 ，清空缓存
loginBtn.onclick = () => {
      const { passwordCheckValue, accountCheckValue } = this.state
      const cnkiAccount = document.querySelector('.weapp-passport-common-login-panel-form input[type="text"]').value
      const passdordElementValue = document.getElementsByClassName("ui-input-wrap has-clear ui-input-suffix-wrap qq weapp-passport-ui-input")[1].querySelector('input').value
      localStorage.setItem('cnkiAccount', cnkiAccount)
      localStorage.setItem('cnkiPassword', this.encryptParamRsa(passdordElementValue))
      if(passwordCheckValue === true) { // 记住密码
        const account = document.querySelector('.weapp-passport-common-login-panel-form input[type="text"]').value
        //const password = encode(document.querySelector('.weapp-passport-common-login-panel-form input[type="password"]').value)
        const password = encode(document.getElementsByClassName("ui-input-wrap has-clear ui-input-suffix-wrap qq weapp-passport-ui-input")[1].querySelector('input').value)
        if(account == '' || password == ''){
          return
        }
        //

        localStorage.removeItem('passwordCheckValue')
        localStorage.removeItem('accountCheckValue')
        localStorage.removeItem('account')
        localStorage.removeItem('password')
        //
        console.log(account,password)
        
        localStorage.setItem('passwordCheckValue', true)
        localStorage.setItem('accountCheckValue', true)
        localStorage.setItem('account', account)
        localStorage.setItem('password', password)
        setTimeout("console.log('123')", 3000 )
      } else if(passwordCheckValue === false && accountCheckValue === true) { // 记住账号
        localStorage.setItem('accountCheckValue', true)
        const account = document.querySelector('.weapp-passport-common-login-panel-form input[type="text"]').value
        localStorage.setItem('account', account)
        localStorage.removeItem('passwordCheckValue')
        localStorage.removeItem('password')
      } else {
        localStorage.removeItem('passwordCheckValue')
        localStorage.removeItem('accountCheckValue')
        localStorage.removeItem('account')
        localStorage.removeItem('password')
      } 
    }
    // 记住密码 账号 密码回显
    if(localStorage.getItem('passwordCheckValue') && localStorage.getItem('account') && localStorage.getItem('password')) {
      this.setNativeValue('.weapp-passport-common-login-panel-form input[type="text"]',localStorage.getItem('account'))
      this.setNativeValue('.weapp-passport-common-login-panel-form input[type="password"]',decode(localStorage.getItem('password')))
      return
    }
    // 记住账号 账号回显
    if(localStorage.getItem('accountCheckValue') && localStorage.getItem('account')) {
      this.setNativeValue('.weapp-passport-common-login-panel-form input[type="text"]',localStorage.getItem('account'))
    }
    
    
    // console.log(localStorage.getItem('account'))
    // document.querySelector('.weapp-passport-common-login-panel-form input[type="password"]').click()
    // document.querySelector('.weapp-passport-common-login-panel-form input[type="text"]').innerText = localStorage.getItem('account')
  }
/**
 * @parame qs 元素querySelector选择器
 * @parame value 给input设置的值
 */
  setNativeValue = function(qs, value) {
    const element = document.querySelector(qs)
    const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set
    const prototype = Object.getPrototypeOf(element)
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set
    if(valueSetter && valueSetter !== prototypeValueSetter) {
      prototypeValueSetter.call(element,value)
    } else {
      valueSetter.call(element,value)
    }
    element.dispatchEvent(new Event('input', {bubbles: true}))
  }
  accountCheckOnClick = (v) => {
    if(v === false) {
      this.setState({passwordCheckValue: false})
    }
    this.setState({ accountCheckValue: v})
  }
  passwordCheckOnClick = (v) => {
    if(v === true) {
      this.setState({accountCheckValue: true})
    }
    this.setState({passwordCheckValue: v})
  }


  /**
   * 忘记密码点击事件
   */
  forgetPasswordClick = () => {
    // document.querySelector('.weapp-passport-common-login-panel-no-header').style.display = 'none'
    document.querySelector('.weapp-passport-common-login-panel').style.display = 'none'
    document.querySelector('.ecode-login-carousel').style.display = 'none'
    document.querySelector('.ecode-login-cheked-dom-forget-password').style.display = 'flex'
  }



  render() {
    const { passwordCheckValue, accountCheckValue } = this.state
    return(<>
      <Checkbox value={ accountCheckValue } onClick={this.accountCheckOnClick}>记住账号</Checkbox>
      <Checkbox value={ passwordCheckValue } onClick={this.passwordCheckOnClick}>记住密码</Checkbox>
      <div className='ecode-login-cheked-dom-button'>
        <Button style={{color:'#0070ff'}}  type="link" onClick={this.forgetPasswordClick}>忘记密码</Button>
      </div>
    </>)
  }

}

