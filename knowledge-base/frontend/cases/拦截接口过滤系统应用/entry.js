import axios from 'axios';

axios.interceptors.response.use((response)=>{
  const {config,data} = response;
  const {url=''} = config||{};
  if((url.indexOf('/api/baseserver/queryApplicationList')>-1 || url.indexOf('/api/app/baseserver/queryApplicationList')>-1) && +data.code===200 && Array.isArray(data?.data)){
    //id可以查看接口查找具体的应用id，下面的id只是示例
    //如果屏蔽某个分类，如：汇报分类应用
    // response.data.data = data.data.filter(item=>item.id!=="2325033688842155022")
    //如果是屏蔽某个分类里的应用：如汇报分类下面的日报应用
    response.data.data = data.data.map(item=>{
      if(item.id==="2325033688842155022" && Array.isArray(item.menus) && item.menus.length>0){//汇报应用分类的id
        item.menus = item.menus.filter(item=>item.id!=='6')//屏蔽工作日报
      }
      return item;
    })
  }
  return response;
})