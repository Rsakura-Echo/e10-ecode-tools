
import React from 'react';
import { withRouter } from 'react-router-dom';
import * as API from  './api/index';
import { Spin } from '@weapp/ui';

const tableId = "980952745168928771";
const viewUrl = '/sp/ebdfpage/list/980952762239746056'

class CustomPage extends React.Component {
  
  devStatusStore:any;
  apiStr:string = 'workflow';

  constructor(props:any){
    super(props);
    this.state ={
      requestid :"-1",
      reload :false
    }   
    this.init();
  }
  
  init(){
    const baseParams = top.window.weappWorkflow?.getFlowPageSDK()?.getBaseParam();
    baseParams.tableId = tableId;    
    API.updateStatusData(baseParams,this.apiStr).then((res: any) => {
        this.setState({requestid:baseParams.requestId,reload:true});
    })
  }

  componentDidUpdate(){
    this.hideHeader();
  }

  componentDidMount(){
    this.hideHeader();    
  }

  hideHeader (){
    const interval = setInterval(()=>{
      const element = window.frames["customRequestStatusPage"].document.getElementsByClassName("weapp-ebdf-view-header");
      // window.document.getElementById("root")[0].setAttribute("style","height:790px");
      if(element.length>0){
        clearInterval(interval);
        element[0].setAttribute("style","display:none");
      }
      
    },500)
  }

  render() {
    const {reload} = this.state;
    let requestid = top.window.weappWorkflow?.getFlowPageSDK()?.getBaseParam().requestId;
    return ( 
      <div style={{height:"790px"}}>
        {reload &&
          <iframe 
            className = "customRequestStatusPage"
            name = "customRequestStatusPage"
            src={`${viewUrl}?requestid=${requestid}`}  //ebuilder 查询列表的地址
        />
        }
        {
          !reload && 
          <div style={{display:'flex',justifyContent:'space-around',alignItems:'center','margin-top':'300px'}}>          
            <Spin />
          </div>
        }
      </div>
    );
  }
}
export default withRouter(CustomPage);