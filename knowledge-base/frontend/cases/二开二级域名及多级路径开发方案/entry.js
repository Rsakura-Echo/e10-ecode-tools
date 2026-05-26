import { getSecondPathUrl, request } from '@weapp/utils';

/**
 * 二级域名及多级路径开发方案
 */

/**
 * 不需要处理二级域名及多级路径的情况
 * 
 * 如果使用标准的上传，request接口请求，window.open方法，以及css样式文件里涉及路径时，使用标准组件以及方法的情况
 * 底层会默认支持替换二级域名以及多级路径，所以不需要考虑
 * 以下为不需要处理的情况
 */

//接口请求
// request({
//   url: '/api/doc/.....'
// })

//window.open方法
//window.open("/sp/doc/.....")

// css文件
// .test{
//   background: url('/build/doc/....')
// }

//上传组件
// <Upload
//   uploadUrl="/api/file/module/upload"
// />

/**
 * 需要处理二级域名及多级路径的情况
 * 
 * 涉及的地方包括页面内置的img,a,iframe等标签内置了地址的情况，非使用标准组件以及方法的情况才需要处理，标准的组件及方法默认已经处理过
 * 在开启二级域名和多级路径时
 * 需要进行调整链接，在写路径的时候使用weappUtils里的getSecondPathUrl方法进行获取带二级域名及多级路径的地址即可
 */

//页面内置图片：
//错误写法：<img src={'/build/test/test.jpg'}/>
//正确写法：<img src={getSecondPathUrl('/build/test/test.jpg')}/>

//页面内置a标签：
//错误写法：<a href={'/build/test/test.jpg'}/>
//正确写法：<a href={getSecondPathUrl('/build/test/test.jpg')}/>

//页面内置iframe：
//错误写法：<iframe src={'/sp/doc/docPreview/....'}/>
//正确写法：<iframe src={getSecondPathUrl('/sp/doc/docPreview/....')}/>


//上面方法在不涉及按照仓库进行区分二级域名及多级路径时可以使用getSecondPathUrl获取
//如果客户存在按照仓库进行区分二级域名及多级路径时，可以在window抛出下面事件，进行获取地址，使用方法和上面一样

//页面内置iframe：
//错误写法：<iframe src={'/sp/doc/docPreview/....'}/>
//正确写法：<iframe src={window.packageUrl('/sp/doc/docPreview/....')}/>

/**
 * url地址封装多级路径或多级域名，包括单页地址、接口地址、静态文件地址
 * window.open 和 request 不需要走此封装，底层组件会封装
 * @param url
 * @param otherParams
 */
// window.packageUrl=(url:string,otherParams?:{
//   haveOrigin:boolean;//是否带域名，默认不带
// })=>{
//   const {haveOrigin = false} = otherParams||{};
//   let matchUrl = url.match(/^\/(splayout|sp|build|mobile|p?api|info)?(\/app)?(\/bs)?\/([^/?]+)/);
//   let origin = "";
//   let secondPath = "";
//   let module = "";
//   if(matchUrl){
//     module = matchUrl[4]||"";//模块
//     const {publicDomain="",publicUrl=""} = window?.weappUtils?.appInfo?.(`@weapp/${module}`)||{};
//     switch (matchUrl[1]){
//       case "sp":
//       case "splayout":
//       case "mobile":
//       case "info":
//         origin = haveOrigin?window.location.origin:"";
//         secondPath = publicUrl;
//         break;
//       case "build":
//         origin = haveOrigin? (publicDomain||window.location.origin):publicDomain;
//         secondPath = publicUrl;
//         break;
//       case "api":
//       case "papi":
//         origin = haveOrigin?window.location.origin:"";
//         module = module.slice(0,1).toUpperCase()+module.slice(1);
//         secondPath = window[`apiUrlweapp${module}`] || window.publicUrlapi || window.publicUrl ||"";
//         break;
//       default:
//         break;
//     }
//     return `${origin||""}${secondPath||""}${url}`;
//   }else {
//     matchUrl = url.match(/^\/(doc|sp|mobile|splayout|build)/);
//     if(matchUrl){
//       module = "doc";
//       const {publicUrl=""} = window?.weappUtils?.appInfo?.(`@weapp/${module}`)||{};
//       origin = haveOrigin?window.location.origin:"";
//       secondPath = publicUrl;
//       return `${origin||""}${secondPath||""}${url}`;
//     }else {
//       return url;
//     }
//   }
// }