import React from 'react';
import {withRouter } from 'react-router-dom';
import { CorsComponent } from '@weapp/ui';


class CustomBatchExport extends  React.Component{
    constructor(props:any){
      super(props);
      this.state = {
        visible: false,
        exportBizIds:[]
      }
    }
    componentDidMount(){
      window.$devThis = this;
    }

    /**
       * 导出组件 关闭事件
       */
      processOnClose = () => {            
          this.setState({visible: false, exportBizIds: []});
          weappUi.Dialog.message({
              type: 'info',
              delay: 5000,
              content: '历史导出记录如需下载，可至[导入导出记录]中进行下载！'
          });
      }

    
    render(){
      if(this.state.visible){
        let autoDownloadParams ={
            needAutoClose:false,
            moduleName: 'workflow',
            functionName: "exportListData",
            bizIds: this.state.exportBizIds
        }
        return (
                <CorsComponent
                   app='@weapp/ebatch'
                   compName='CommonProgressNew'
                   visible={this.state.visible} //必填 控制显隐
                    type="export" //必填
                    closable={true}
                    posX={'80%'} //选填  百分比不会出屏幕
                    posY={'70%'}  //选填 百分比不会出屏幕
                    params={autoDownloadParams}
                    onClose={this.processOnClose}   //关闭导入进度条回调方法，控制回显
                    allowDownloadAll={false}
                    closeDirect={true}
                    enableAuth={true}
                  />
          )
      }else{
        return(<span></span>)
      }
      
    }

    
}

export default withRouter(CustomBatchExport)
