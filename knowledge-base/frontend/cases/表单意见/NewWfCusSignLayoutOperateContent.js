import {HrmCard} from '@weapp/ui';
import {appInfo} from "@weapp/utils";

const {openHrmCard} = HrmCard;

export default class NewWfCusSignLayoutOperateContent extends React.Component<any>{
  constructor(props: propsType) {
    super(props);
  }

  showCard=(e,link_id,isMobile)=>{
    if(isMobile){
      e.stopPropagation();
      let root = appInfo('@weapp/workflow').publicUrl || "";
      window.open(`${root}/mobile/hrm/profile/${link_id}`, '_self')
    }else{
      openHrmCard(e, link_id, 'inside', 'bs/hrm');
    }
  }

  render() {
    const { agent, operator, showAgent,separator, signData, OriginCom,isMobile,ref } = this.props;
    const {className='',style={}} = operator.props;
    const {customInfoMap={}} = signData;
    const {replyOperatorIds='',replyOperatorUserNames=''} = customInfoMap; 
    if(replyOperatorIds!=''){
      let operatorArr=[];
      if(showAgent){
        operatorArr.push(<>{agent}{separator}</>);
      }
      operatorArr.push(operator);
      let replyOperatorIdArr = replyOperatorIds.split(",");
      let replyOperatorUserNameArr = replyOperatorUserNames.split(",");
      for(let i =0;i<replyOperatorIdArr.length;i++){
        let replyOperatorId = replyOperatorIdArr[i];
        let replyOperatorName = replyOperatorUserNameArr[i];
        operatorArr.push(<a className={className} onClick={(e)=>this.showCard(e,replyOperatorId,isMobile)} style={style}>{replyOperatorName}</a>);
      }
      return <>{operatorArr}</>
    }else{
      return <OriginCom ref={ref} {...this.props}/>
    }
    
  }
}