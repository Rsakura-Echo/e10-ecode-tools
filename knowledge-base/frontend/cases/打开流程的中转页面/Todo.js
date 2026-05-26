import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { appInfo,qs } from '@weapp/utils';
const { publicUrl } = appInfo('@weapp/ecodesdk');

class Todo extends React.Component {


  componentDidMount(){
    let params = qs.parse( location.search, {
        ignoreQueryPrefix: true
    });
    let that = this;
    if(params.requestId){
      var axios = require('axios');
      var data = JSON.stringify(params);
      var config = {
          method: 'post',
          url: '/api/secondev/flow/cusflowjump/listFlowJumpAddr',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
      };
      axios(config).then(function (response) {
          console.log("res",JSON.stringify(response.data));
           let data = response.data;
           let jumpUrl = data?.data?.jumpUrl;
          if(data.code =='200' && that.isValidUrl(jumpUrl)){
            window.location.href = jumpUrl;
          }else{
            // 业务处理完成后，重定向到指定地址  
            window.location.href = `${publicUrl}${decodeURIComponent(params?.oldUrl)}`; // 替换为你的目标路径  
          }
      }).catch(function (error) {
          console.log(error);
      }); 
    }
    
  }

  isValidUrl=(str)=>{
    try{
      new URL(str);
      return true;
    }catch(e){
      return false;
    }
  }

  
  render() {
    return (
      <>
        <p style={{"display":"none"}}>{"正在跳转指定页面，请稍等......"}</p>
      </>
    );
  }
}
export default withRouter(Todo);
