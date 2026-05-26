import axios from 'axios';

/**
 * 此案例主要通过接口响应拦截的方式去调整浏览按钮新建，每个类型浏览按钮不一，具体需要拦截哪个接口，查看点击浏览按钮触发的相关接口即可
 * 
 * 浏览按钮上的快捷新建来源接口：以下是文档浏览按钮的，此接口会返回addButton的数据，如果有值就会显示新建
 * 示例：/api/doc/common/browser/associate/document
 * 
 * 浏览按钮点开的弹框上的新建来源接口：以下是文档浏览按钮的，此接口会返回extraButtons的数据，如果有值就会显示新建
 * 示例：/api/doc/common/browser/prop/document
 **/

//此按钮是屏蔽该类型浏览按钮的所有菜单，如果想要单独屏蔽某些，按照提示调整即可
axios.interceptors.response.use(res=>{
  const {url=''} = res?.config||{};
  //屏蔽浏览按钮上的新建
  if(url.match(/\/api(\/app)?\/doc\/common\/browser\/associate\/document/) && res?.data?.code===200){
    let addButton = res.data.data.addButton;
    //快捷菜单可能会有多个，如文档浏览按钮，此数据就是数组
    if(Array.isArray(addButton)){//如果想屏蔽某些菜单，走此逻辑，如果想全部屏蔽，直接将此判断条件改为if(false)走后续逻辑即可
      res.data.data.addButton = addButton.filter(item=>false);//如果是要过滤某些按钮，里面写上判断条件即可
    }else{
      res.data.data.addButton = null;
    }
  }

  //屏蔽浏览按钮上的新建
  if(url.match(/\/api(\/app)?\/doc\/common\/browser\/prop\/document/) && res?.data?.code===200){
    let extraButtons = res.data.data.extraButtons;
    //快捷菜单可能会有多个，如文档浏览按钮，此数据就是数组
    if(Array.isArray(extraButtons)){//如果想屏蔽某些菜单，走此逻辑，如果想全部屏蔽，直接将此判断条件改为if(false)走后续逻辑即可
      res.data.data.extraButtons = addButton.filter(item=>false);//如果是要过滤某些按钮，里面写上判断条件即可
    }else{
      res.data.data.extraButtons = null;
    }
  }

  return res;
})