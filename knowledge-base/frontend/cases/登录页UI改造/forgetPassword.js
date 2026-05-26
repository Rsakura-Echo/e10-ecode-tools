import React, { Component } from "react";
import { Provider } from 'mobx-react'
import { Input,Button,Dialog } from '@weapp/ui';
const { message } = Dialog;
const { Password } = Input;
import {getValidCode,changepwd} from './api/api'

const PUBLIC_KEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCo34ZSQ/0G2Hf9znZgOvWR4UClg7vFvFZdeE51P/vfJsWqCO9iRtNOcsWMVhYNpB3W4ZVsnKIAPkWVnGWgV0bmJY9Y6yUNhef9+66HCl9CNOOviBUARnQZDFur8ZjAZzP9CWjP4ueKK/aq2A95lmu2OA+rIaCxsPt2OwUCSH9OHQIDAQAB";

export default class ForgetPassword extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      userInfo:'',
      validCode:'',
      newPassword:'',
      newPassword1:'',
      flag:false
    }
  }

  componentDidMount() {
    loadjs("/ecodestatic/jsencrypt/jsencrypt.min.js",{
        success: function() {
        }
    })
  }


  encryptParamRsa = (param: any) => {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(PUBLIC_KEY);
    const encrypted = encrypt.encrypt(param);
    return encrypted;
  }

  clearAllCookie = () => {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if(keys) {
        for(var i = keys.length; i--;)
        document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      for (var i = keys.length; i--;) {
        document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString();//清除当前域名下的,例如：m.kevis.com
        document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString();//清除当前域名下的，例如 .m.kevis.com
        document.cookie = keys[i] + '=0;path=/;domain=kevis.com;expires=' + new Date(0).toUTCString();//清除一级域名下的或指定的，例如 .kevis.com
      }
    }

  }

  flagFalese=()=>{
    this.setState({flag:false})
  }

  handleClick = async () => {
    const {userInfo,newPassword,newPassword1,validCode} = this.state
    if(userInfo == ""){
      message({
        type: 'error', // type: 'info', 'error', 'success'
        content: '账号信息为空！',
      });
      return
    }
    if(validCode == ''){
      message({
        type: 'error', // type: 'info', 'error', 'success'
        content: '验证码为空！',
      });
      return
    }
    if(newPassword == '' || newPassword1 == '' ){
      message({
        type: 'error', // type: 'info', 'error', 'success'
        content: '新密码为空！',
      });
      return
    }
    if(newPassword == '' || newPassword1 == '' || validCode == ''){
      message({
        type: 'error', // type: 'info', 'error', 'success'
        content: '相关信息未填写！',
      });
      return
    }
    if(newPassword1 != newPassword){
      message({
        type: 'error', // type: 'info', 'error', 'success'
        content: '输入的两次新密码不一致！',
      });
      return
    }

    console.log(this.state)
    //修改密码的方法
    let changeRes = await changepwd(userInfo, validCode, this.encryptParamRsa(newPassword),this.encryptParamRsa(newPassword1))
    if(changeRes?.response != null && changeRes?.response?.code != 200) {

      message({
        type: 'error', // type: 'info', 'error', 'success'
        content: changeRes?.response?.data?.msg,
      });
      return
    }
    if(changeRes?.data?.code == 200){
      message({
        type: 'success', // type: 'info', 'error', 'success'
        content: changeRes?.data?.msg,
      });
      setTimeout(()=>{
        this.clearAllCookie();
        location.href="/";
      },1000)
    }else {

      message({
        type: 'error', // type: 'info', 'error', 'success'
        content: changeRes?.data?.msg,
      });
    }

    
    console.log('---',changeRes)
  }

  handleValidCodeClick = async () => {
    const {userInfo,newPassword,newPassword1,validCode} = this.state
    if(userInfo == ""){
      message({
        type: 'error', // type: 'info', 'error', 'success'
        content: '账号信息为空！',
      });
      return
    }
    let codeResponse = await getValidCode(userInfo,'shortMessage')
    //let codeResponse = null;
    if(codeResponse?.data?.code == 200){
      message({
        type: 'success', // type: 'info', 'error', 'success'
        content: codeResponse?.data?.msg,
      });
      //限制按钮时间为60s
      this.setState({
      flag:true
      })
      setTimeout(()=>{
      this.flagFalese()
      },60000)

    }else {
      message({
        type: 'error', // type: 'info', 'error', 'success'
        content: codeResponse?.data?.msg,
      });
    }
  }

  handleValidCodeChange = (value) => {
    this.setState({
      validCode:value
    })
  }

  handleUserInfoChange = (value) => {
    this.setState({
      userInfo:value
    })
  }

  handleNewPasswordChange = (value) => {
    this.setState({
      newPassword:value
    })
  }

  handleNewPassword1Change = (value) => {
    this.setState({
      newPassword1:value
    })
  }

  handleExitClick = () => {
    this.clearAllCookie();
    // document.querySelector('.weapp-passport-common-login-panel-no-header').style.display = 'block'
    // document.querySelector('.ecode-login-carousel').style.display = 'block'
    // document.querySelector('.ecode-login-cheked-dom-forget-password').style.display = 'none'
    location.href="/login";
  }

  render() {
    const {userInfo, newPassword,newPassword1,validCode,flag} = this.state
    return (
      <Provider>
        <div className='ecode-custom-password-${appId}' style={{ height: '100%'}}>

          <div className='ecode-custom-password-${appId}-all'>
            <div className='ecode-custom-password-${appId}-the'>
              <div className='ecode-custom--password-text'>
                账号
              </div>
              <Input
                style={{ width: 500 }}
                placeholder="账号"
                value={userInfo} 
                autoTrim
                onChange={this.handleUserInfoChange}/>
            </div>
            <div className='ecode-custom-password-${appId}-the'>
              <div className='ecode-custom--password-text'>
                新密码
              </div>
              <Password
                style={{ width: 500 }}
                placeholder="请输入新密码"
                autoTrim
                value={newPassword}
                onChange={this.handleNewPasswordChange}
              />
            </div>
            <div className='ecode-custom-password-${appId}-the'>
              <div className='ecode-custom--password-text'>
                密码确认
              </div>
              <Password
                style={{ width: 500 }}
                placeholder="密码确认"
                autoTrim
                value={newPassword1}
                onChange={this.handleNewPassword1Change}
              />
            </div>
            <div className='ecode-custom-password-${appId}-the'>
              <div className='ecode-custom--password-text'>
                验证码
              </div>
              <Input
                style={{ width: 372, marginRight: 24 }}
                placeholder="验证码"
                value={validCode} 
                autoTrim
                onChange={this.handleValidCodeChange}/>
              <Button className="ecode-custom-valid-button" 
                onClick={this.handleValidCodeClick}
                disabled={flag}
                type="primary"
                >
                获取验证码
              </Button>
            </div>
            <div className="ecode-custom-change-password-buttons">
              <Button className="ecode-custom-password-button" 
                size='large' 
                onClick={this.handleClick} 
                type="primary">
              修改密码</Button>
              <Button className="ecode-custom-exit-button" 
                size='large' 
                onClick={this.handleExitClick} 
                type="primary">
              返回登录</Button>
            </div>
            <div  className="ecode-custom-password-newnotice">
              <ul class="ecode-lili-ul">
                <li>1.密码不能匹配或包含用户账号;</li>
                <li>2.密码长度至少为8个字符，且以字母开头;</li>
                <li>3.密码至少包含：一个个大写字母、一个小写字母、三个特殊字符、一个数字;</li>
                <li>4.新密码不能与旧密码一样;</li>
                <li>5.密码范例：Abcd#@!1234(禁止使用范例作为密码) </li>
              </ul>
            </div>
          </div>

          
        </div>
      </Provider>
      
    );
  }
}