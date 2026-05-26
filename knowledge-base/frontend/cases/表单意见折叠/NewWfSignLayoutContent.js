import { Comment, HrmCard, Button } from '@weapp/ui';
const { CommentContent } = Comment;
const { openHrmCard } = HrmCard;

export default class NewWfSignLayoutContent extends React.Component<any>{
  constructor(props: propsType) {
    super(props);    
  }

  componentDidMount =()=>{
    const {signData={}}=this.props;        
  }

   click=()=>{
     const wffpSdk = window.weappWorkflow.getFlowPageSDK();
      const {signData={},wfpNodeSignViewStore}=this.props;
      const {commonParam = {}} = wfpNodeSignViewStore;
      const {componentKey = ""} = commonParam;
      const {operatorDept} = signData;
      const showAll = window['__showAll_'+operatorDept];
      window['__showAll_'+operatorDept] = !showAll;

      const layout = wffpSdk.getSignLayoutByIds(componentKey);   

      layout.map(it=>{
          //过滤意见
          it.groupItemEntities = it.groupItemEntities.filter(item=>{
            const __operatorDept = item.operatorDept;
            if(window['__showAll_'+__operatorDept] == undefined || window['__showAll_'+__operatorDept] == false){
              return item.customInfoMap?.isDefaultShow == "1"
            }
            return true;
          });     
              
        })        

      wffpSdk.filterSignLayout(componentKey,layout);

    }

  render() {
    // console.log("wcq::new props=",this.props);
    const { signData = {}, isMobile = false,OriginCom } = this.props;
    const { customInfoMap = {},operatorDept} = signData;
    const showAll = window['__showAll_'+operatorDept];
    const { isLastDefaultShow,isLast } = customInfoMap; 
    return <div style={{ border: "1px dashed #ddd" }}>
      <OriginCom {...this.props} />
      { showAll && isLast && 
        <a style={{float:'right',fontSize:'22px',fontFamily:'FANGSONG'}} id={`showAll${signData.logId}`} onClick={()=>{this.click()}}>收起...</a>
      }

      { !showAll && isLastDefaultShow && 
        <a style={{float:'right',fontSize:'22px',fontFamily:'FANGSONG'}} id={`showAll${signData.logId}`} onClick={()=>{this.click()}}>展开...</a>
      }
    </div>
  }
}