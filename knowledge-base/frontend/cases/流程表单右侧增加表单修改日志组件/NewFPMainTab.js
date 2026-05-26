import { Icon,CorsComponent} from '@weapp/ui';

export default class NewFPMainTab extends React.Component {
  constructor(props) {
    super(props);   
    this.state = {
      "IconName":"Icon-Right-arrow01"
    } 
  }

  
  render(){
    const {OriginCom} = this.props;
    const {requestId,workflowId} = window.weappWorkflow?.getFlowPageSDK()?.getBaseParam();
    const {IconName} = this.state;
    return (
      <div className={"NewFPMainTab-container"}>        
        <div className={"NewFPMainTab-left-div"}>
          <OriginCom {...this.props} />
        </div>        
        <div className={"NewFPMainTab-right-div"}>
            <div className={"NewFPMainTab-right-Icon-div"} title="" onClick={()=>{this.toggleRightDiv()}}>
              <span className={"ui-icon ui-icon-wrapper"}>
                  <Icon className={'NewFPMainTab-right-icon'} name={IconName} size='lg' style={{"color":"aliceblue"}}></Icon>  
              </span>
            </div>          
            
            <CorsComponent
              weId={`${this.props.weId || ''}_1xjgso`}
              app='@weapp/workflow'
              compName="FlowPage"
              wfCompName = "FormLog"
              requestId = {requestId}
              workflowId = {workflowId}
              style = {{"height":"100%"}}
          />


        </div>
      </div>
    )
  }

  toggleRightDiv = ()=> {
    const rightDiv = document.querySelector('.NewFPMainTab-right-div');
    rightDiv.classList.toggle('collapsed');
    const {IconName} = this.state;
    if(IconName == 'Icon-Right-arrow01'){
      this.setState({"IconName":"Icon-left-arrow01"})
    }else{
      this.setState({"IconName":"Icon-Right-arrow01"})
    }
    
  }


}

export default NewFPMainTab;