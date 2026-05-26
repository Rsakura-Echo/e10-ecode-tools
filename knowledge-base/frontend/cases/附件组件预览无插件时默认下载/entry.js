import { regOvProps } from '@weapp/utils';
/**
 * 此案例针对系统中所有的附件组件，如果要针对某些某块自己加限定即可
 */

const overrideUploadProps=(from)=>{
  return (props)=>{
    const {uploadParams,commonParams} = props;
    props.data = props.data.map(item=>{
      const {options=[]} = item;
      let canDownload = options.find(item=>item.id==="download")
      let canPreview = options.find(item=>item.id==="preview");
      if(canDownload && !canPreview){
        item.options = [
          ...options,
          {id:'preview'}
        ]
        item.isPreviewDownload = true;
      }
      
      return item;
    })
    let lastOnBeforeOptionClick = props.onBeforeOptionClick;
      props.onBeforeOptionClick=async (value: any, fileData: any, fileIndex)=>{
        if(lastOnBeforeOptionClick){//此处是执行组件原拦截事件，如果不需要管原拦截事件可以放后执行
          let flag = await lastOnBeforeOptionClick?.(value,fileData,fileIndex);
          if(!flag) return false;
        }
        if(value==='preview'){
          const {options,id,fileid} = fileData;
          if(fileData.isPreviewDownload ){
            window.weappUi.Upload.download({
              fileId:id||fileid,
              module:commonParams.module||uploadParams.module,
              params:{
                ...commonParams,
                ...uploadParams
              }
            })
            return false;
          }
        }
        
        return true;
      }
    return props;
  }
}

regOvProps('weappUi','Upload',overrideUploadProps("PC"),0)
regOvProps('weappUi','MUpload',overrideUploadProps("MOBILE"),0)