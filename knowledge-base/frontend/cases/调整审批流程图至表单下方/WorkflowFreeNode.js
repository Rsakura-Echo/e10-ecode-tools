import {inject, observer} from "mobx-react";
import  React  from 'react';
import { withRouter } from 'react-router-dom';
import { Icon,IconNames,Browser, FormItem } from "@weapp/ui";
import { getLabel } from "@weapp/utils";
import { toJS } from "mobx";
import { getFreeObjById } from './utils/workflowFreeUtils';

@inject('freeChartStore')
@observer
class WorkflowFreeNode extends React.Component<any>{
   
    /**必填红色箭头标识 */
    mustPassIcon = (mustPass:boolean,mergeType:string,nodeType:string) => {
        const { drawFlowMode } = this.props.freeChartStore;
        // 必须通过标识 icon-coms-download icon-coms-positive-sequence
        if(mustPass && mergeType == '0'){
            return (
                <span 
                    className={drawFlowMode == 'vertical' ? 'mustPass-icon vertical' : 'mustPass-icon horizontal'}
                    title={getLabel('132512','此节点必须通过') }
                >
                    <Icon weId={`${this.props.weId || ''}_rj7yro`} name="Icon-Down-arrow05" size="xs"/>
                </span>
            );
        }
    }
   
    clickNode = (e:React.MouseEvent) => {
        const {  nodeParams = {},isReadOnlyModel ,isMobile='0',belongWhereTag} = this.props;
        const { nodeChartEntity:{edit }} = this.props.nodeParams;
        const { getNodeRight,setCurrentMouseEnterId,chartParams:{chartRenderNum}} = this.props.freeChartStore;
        e.stopPropagation();
        if(isReadOnlyModel){
            window['setOperatePanel_' + chartRenderNum] &&  window['setOperatePanel_' + chartRenderNum](e, {...nodeParams, isAddSignNode: '1'}); 
            return;
        }
        //如果是查看 只读模式 不走请求
        if(isMobile == '0'){
            getNodeRight(nodeParams,belongWhereTag);
        }
        setCurrentMouseEnterId(nodeParams.id);
    }
   
    //设置节点操作者
    setNodeOperator = (value:any) => {
        const { nodeParams } = this.props;
        const { setFreeNodeUsers } = this.props.freeChartStore;
        setFreeNodeUsers(nodeParams, value);
    }
    getNodeActions = () => {//添加悬停节点时的操作按钮
        const {  nodeParams = {} ,isFlowModel = '0'} = this.props;
        const { nodeChartEntity:{del,addParall,addNext,edit}, nodeEntity:{nodeOperators = []} } = this.props.nodeParams;
        const { drawFlowMode,globalNextNodeEditPurview} = this.props.freeChartStore;
        let actionComs = null;
        let nodeClass =  drawFlowMode == 'vertical' ? `free-node-v2-action-area ${nodeParams.id} vertical` : `free-node-v2-action-area ${nodeParams.id} horizontal`;
        if(!globalNextNodeEditPurview && isFlowModel == '1') {
            return null
        }
        return (
            <div className={nodeClass} style={{background:'rgba(0,0,0,0.001)'}}>
                { del &&
                    <div className="action-item delete" 
                        title = {getLabel('100750','删除节点') }
                        onClick={this.deleteNode}
                    >
                         <Icon weId={`${this.props.weId || ''}_rmbh90`}  name={'Icon-error01'} size='sm' />
                    </div>
                }
                {
                    edit &&  <div className="action-item operator" 
                        title = {getLabel('132477','更改操作者') }
                    >   
                        <Browser weId={`${this.props.weId || ''}_dq30dh`}
                            type="resource"
                            module="workflow/core"
                            multiple
                            onChange={this.setNodeOperator}
                            value={nodeOperators}
                        >
                            <Icon weId={`${this.props.weId || ''}_f05jkk`}  name={'Icon-Customer-consolidation'} size='sm' />
                        </Browser>
                    </div>
                }



                
                { addParall &&
                    <div className="action-item addSerial" 
                        title = {getLabel('132513','添加并行节点')  }
                        onClick={this.addParallelNode}>
                    <Icon weId={`${this.props.weId || ''}_rmbh90`}  name={'Icon-enlarge-scale'} size='sm' />
                    </div>
                }
                { addNext && 
                    <div className="action-item addParalla" 
                        title = {getLabel('132528','添加串行节点') }
                        onClick={this.addSerialNode}>
                        <Icon weId={`${this.props.weId || ''}_rmbh90`}  name={'Icon-enlarge-scale'} size='sm' />
                    </div>
                }
            </div>
        )
    }

    //删除节点
    deleteNode = (event: React.MouseEvent) => {
        event.stopPropagation();
        const { nodeParams, belongWhereTag } = this.props;
        const { deleteFreeNodeItem } = this.props.freeChartStore;
        deleteFreeNodeItem(nodeParams.id,belongWhereTag);
    }

    //添加串行节点
    addSerialNode = (event: React.MouseEvent) => {
        event.stopPropagation();
        const { belongWhereTag, nodeParams,isFlowModel } = this.props;
        const { beSerialNodes } = this.props.freeChartStore;
        if(nodeParams.trunkNode){
            beSerialNodes(isFlowModel=='1'?nodeParams.id:'root',belongWhereTag);
        }else{
            beSerialNodes(nodeParams.id,belongWhereTag);
        }
    }

    //添加并行节点
    addParallelNode = (event: React.MouseEvent) => {
        event.stopPropagation();
        const { nodeParams,belongWhereTag } = this.props;
        const { beParallelWithCurNode } = this.props.freeChartStore;
        beParallelWithCurNode(nodeParams.id,belongWhereTag)
    }

    getNodeIcon = () => {
        const { nodeEntity } = this.props.nodeParams;
        let iconName = '';
        switch(nodeEntity.nodeType) { //普通节点
            case '1': iconName ='Icon-Examine-and-approve'; break; //批准节点
            case '2': iconName ='Icon-confirm'; break; //提交节点
            case '9': iconName ='Icon-preview'; break; //查阅节点
        }
        return <div key={`${Math.round(Math.random()*80+20)}_${new Date().getTime()}`}>
            <Icon weId={`${this.props.weId || ''}_dpjmmy`} key={iconName} name={iconName as IconNames} size={'sm'}/>
            <Icon weId={`${this.props.weId || ''}_dpjmmy`} key={iconName} name={'Icon-Countersign'} size={'xs'}/>
        </div>
    }
    render(){
        const { nodeParams = {}, nodeStyle = {} , isReadOnlyModel, isFlowModel = '0',isMobile='0',belongWhereTag} = this.props;
        const { currentMouseEneterItemId , currentChoosedItemId,wfFreeDatas,circulationParams,getFreeObjById,nodeOperatorsReplaceDatas,globalNextNodeEditPurview, forecastNodeIds,
            componentNeedRender, templateId
        } = this.props.freeChartStore;
        
        console.log('当前更新', componentNeedRender);
        const { nodeEntity = {} , noOperatedUsers = [] , operatedUsers = [] , parentid = '' , id=''
        , currentNodeGroup = false} = nodeParams;
        const { nodeName = '' , nodeType = '1' , nodeStatus = '0' , mustPass = false , nextNodeEditPurview = '2',nodeOperators = [],defaultOperatorName = ''} = nodeEntity;

        /** 获取当前 准确位置上的自由节点数据*/
        let startId =  belongWhereTag.split('_')[0];
        let datasIndex =  belongWhereTag.split('_')[1];
        let currentFreeDatas = wfFreeDatas[startId][datasIndex];
        /************/

        const currentParentElement = getFreeObjById(parentid,currentFreeDatas) || {};
        const { mergeType = ''} = currentParentElement;
        const curOperatorsObj = nodeOperatorsReplaceDatas[id] || [];

        let curStyleObj:any = {} , operatorsName = '', isCurrentAndOperator = false;
        if(nodeStatus == '0' || nodeStatus == '3'){// nodeStatus 0 :未处理节点  1 当前节点  2 已处理节点  3:未经过---
            curStyleObj = circulationParams.noPassedNodeShouldCheckRight;
        }else if(nodeStatus == '2'){
            curStyleObj = circulationParams.passedNodeAndNoOPeration;
        }else if(nodeStatus == '1'){
            curStyleObj = circulationParams.currentNodeAndNoOperation;
            if(currentNodeGroup){//当前节点&&(是当前人)
                curStyleObj = circulationParams.currentMustPassNode;
                isCurrentAndOperator = true;
            }
        }

        //预测节点
        if((nodeStatus == '0' || nodeStatus == '3') && forecastNodeIds && forecastNodeIds != '' && (","+forecastNodeIds+",").indexOf(","+nodeParams.nodeid+",") > -1) {
            curStyleObj = circulationParams.forecastNode;
        }

        let needBoxShadow = !isReadOnlyModel && (currentMouseEneterItemId == nodeParams.id || nodeParams.id == currentChoosedItemId);
        const selectedStyle = {
            boxShadow : needBoxShadow ? `0 0 0 1px ${curStyleObj.borderColor}` : '' ,
            border : `1px solid ${curStyleObj.borderColor}`,
            background : `${curStyleObj.backgroundColor}`,
            cursor : isReadOnlyModel ? 'default' : 'pointer'
        }
        // 控制节点操作者的显示（先未操作 - 后已操作 且只取第一个操作者名称）
        if(noOperatedUsers.length > 0){
            let extraStr = noOperatedUsers.length > 1 ? '...' : '';
            const {userid,beAgentUserId,lastname,beAagentUserName} = noOperatedUsers[0];
            operatorsName = beAgentUserId > 0 ? `${beAagentUserName}->${lastname}`: lastname;
        }else if(operatedUsers.length > 0){
            let extraStr = operatedUsers.length > 1 ? '...' : '';
            let tempOperatedUsers = operatedUsers.filter((item:any) => {return item.userid == item.processUser;});
            let tempOperatedUser = tempOperatedUsers.length > 0 ?tempOperatedUsers[0] : operatedUsers[0];
            const {userid,beAgentUserId,lastname,beAagentUserName} = tempOperatedUser;
            operatorsName = beAgentUserId > 0 ? `${beAagentUserName}->${lastname}`: lastname;
        }
        if(defaultOperatorName != '' && isReadOnlyModel) {
            operatorsName = defaultOperatorName;
        } else {
            if(nodeOperators.length > 0 && operatorsName == ''){//当节点名称上没有人员时获取
                let extraStr = nodeOperators.length > 1 ? `等${nodeOperators.length}人` : '';
                operatorsName = nodeOperators[0].name + extraStr;
            }
        }
        operatorsName =  operatorsName == '' ? getLabel('58967','未设置')  : operatorsName;
        let nodeFlowStatus = ''; 
        switch(nodeStatus) {
            case(0): {nodeFlowStatus = 'not_passed'}; break;
            case(1): {nodeFlowStatus = 'current_node'}; break;
            case(2): {nodeFlowStatus = 'passed_node'}; break;
            default: nodeFlowStatus = 'not_passed';
        }
        // 1:审批 2：提交 5：查阅
        if(isFlowModel == '1'){
            return (
                <div className={`workflow-design-free-node-v2 ${nodeParams.id} ${(nodeType == '0' || nodeType == '3') ? 'templatenode' : ''}`}  
                    style = {nodeStyle} 
                    >
                    {(nodeType == '0' || nodeType == '3') ? 
                        <div className={` free-node circleModel ${nodeType == '3' ? 'endNode' : ''}`} 
                        >
                            {nodeType == '0'?
                                <div className="name" title={getLabel('132529','加签节点') } >{getLabel('132529','加签节点') }</div>
                                :
                                <div className="name" >...</div>
                            }
                            {!isReadOnlyModel && this.getNodeActions()}
                        </div>
                        :
                        <div className={"free-node"}
                            onClick={this.clickNode} 
                            style={selectedStyle}
                            >
                            <div className="showname" title={nodeName} style={{backgroundColor:curStyleObj.nodeColor}}>
                                <span className="nodename-text">{nodeName}</span>
                            </div>
                            <div className={nodeEntity.nodeType == '9'? "check-node nodetype-icon ": "nodetype-icon"}>{this.getNodeIcon()}</div>
                            <div className="node-operators"  title={operatorsName} style={{color:curStyleObj.operatorColor}}>{operatorsName}</div>
                            {!isReadOnlyModel && this.getNodeActions()
                            }
                            {this.mustPassIcon(mustPass,mergeType,nodeType)}
                        </div>
                    }
                </div>
            )
        }else{
            return (
                <div className={`workflow-design-free-node-v2 ${nodeParams.id} templateId_${parseInt(templateId)+1} ${nodeFlowStatus} ${isCurrentAndOperator ? 'isCurrentAndOperatorNode' : ''}`}  
                    style = {nodeStyle} 
                    >
                    {
                        <div className='free-node'
                            onClick={this.clickNode} 
                            style={selectedStyle}
                        >
                            <div className="showname" title={nodeName} style={{backgroundColor:curStyleObj.nodeColor}}>
                                <span className="nodename-text">{nodeName}</span>
                            </div>
                            <div className={nodeEntity.nodeType == '9'? "check-node nodetype-icon ": "nodetype-icon"}>{this.getNodeIcon()}</div>
                            <div className="node-operators"  title={operatorsName} style={{color:curStyleObj.operatorColor}}>{operatorsName}</div>
                            {!isReadOnlyModel && isMobile != '1' &&  this.getNodeActions()
                            }
                            {this.mustPassIcon(mustPass,mergeType,nodeType)}
                        </div>
                    }
                    
                </div>
            )
        }
    }
}

export default WorkflowFreeNode;