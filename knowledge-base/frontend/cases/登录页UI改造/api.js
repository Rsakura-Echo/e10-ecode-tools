import axios from 'axios';

// const baseURL = 'http://10.65.78.23:18600'
const baseURL = 'http://10.65.79.83:86'
const token = localStorage.getItem('iam_token')
// 获取验证码接口呢
export const getValidCode = async function (userInfo,typeInfo) {
  try {
    const res = await axios({
      url:`${baseURL}/ims-idms/message/sendVerCode`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Blade-Auth':`bearer ${token}`
      },
      params:{
        "userInfo":userInfo,
        "type":typeInfo
      }
    });
    return res
  } catch (err) {
    console.log(err)
    return []
  }
}

// 修改密码接口
export const changepwd = async function (currentLoginAccount,validCode,newpawd,newpwd1) {
  try {
    const res = await axios({
      url:`${baseURL}/ims-idms/forgetpassword/forgetPwd`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Blade-Auth':`bearer ${token}`
      },
      params:{
        "userInfo":currentLoginAccount,
        "verCode":validCode,
        "pwd":newpawd,
        "newPwd":newpwd1
      }
    });
    return res
  } catch (err) {
    console.log(err)
    return []
  }
}