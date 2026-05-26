import React from "react";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import { getCurrentElementPoint } from './utils';
import WorkflowFreeNode from './WorkflowFreeNode';

@inject('freeChartStore')
@observer
class FreeChartDrawNode extends React.Component<any> {


    drawElementNode = (element:any={},inital:boolean=false,posTag='') => {//posTag = startId_arrayIndex
        let { isFlowModel = '0'  , isReadOnlyModel} = this.props;
        const { wfFreeDatasPoints,drawFlowMode,currentPostParams} = this.props.freeChartStore;
        const { nodeElement = false , hasNext = false , next = {} , nodeEntity = {} , id = '' } = element;
        let elementNodes = [];
        let currentELtPoint = getCurrentElementPoint(element,wfFreeDatasPoints,posTag);
        if(nodeElement){
            let style =  {  //默认纵向模式
                left : currentELtPoint.x - 85 + 'px',
                top : currentELtPoint.y  - 50 + 'px'
            };
            if(drawFlowMode == 'horizontal') {  //横向模式
                style = {
                    left : currentELtPoint.x  + 'px',
                    top: currentELtPoint.y - 32 + 'px'
                }
            } else if(currentPostParams.isFlowModel == '1' && element.nodeElement && (nodeEntity.nodeType == '0' || nodeEntity.nodeType == '3')) {
                if(nodeEntity.nodeType == '0') { //startGroup
                    style = {
                        left: currentELtPoint.x - 45 + 'px',
                        top: currentELtPoint.y - 80 + 'px'
                    }
                } else { //endGroup
                    style = {
                        left: currentELtPoint.x - 20 + 'px',
                        top: currentELtPoint.y - 40 + 'px'
                    }
                }
            }
           
            elementNodes.push(
                <WorkflowFreeNode weId={`${this.props.weId || ''}_x8lpc7`} ecId={`${this && this.props && this.props.ecId || ''}_WorkflowFreeNode@0fgnvz@${id}`}
                    nodeParams = {element} 
                    nodeStyle ={style} 
                    isReadOnlyModel = {isReadOnlyModel}
                    isFlowModel = {this.props.isFlowModel}
                    belongWhereTag = {posTag}
                    key={posTag}
                />
            );
        } else { 
            let elts = element.parallelNodeGroupDatas;
            let subNodes:any = [];
            elts && elts.map((v:any)=>{
               let ssubNodes = this.drawElementNode(v,false,posTag);
               ssubNodes.map(c=>{
                   subNodes.push(c);
               })
            });
            subNodes.map((v:any)=>{
                elementNodes.push(v);
            });
        }
        if(hasNext){
            let subNodes = this.drawElementNode(next,false,posTag);
            subNodes.map(v=>{
                elementNodes.push(v);
            });
        }
        return elementNodes;
    }


    render() {
        const { wfFreeDatas, allValidNodesPostions,wfFreeDatasPoints,componentNeedRender } = this.props.freeChartStore;
        const { isFlowModel } = this.props;
        const _wfFreeDatas = toJS(wfFreeDatas);
        console.log('分组中的渲染', componentNeedRender);
         /** 渲染nodes 和 分支 连接线 */
         let allNodes:any = [];
         
         if(_wfFreeDatas){
             for(let key in _wfFreeDatas){
                 let arr = _wfFreeDatas[key];
                 arr.map((v:any,i:number)=>{
                     /**绘制连接线 */
                     if(v){
                         allNodes = allNodes.concat(this.drawElementNode(v,true,`${key}_${i}`));
                       
                     }   
                 });
             }
         }
        return (
            <div className='wf-design-free-nodeInfo'>
                {allNodes}
            </div>
        )
    }
}

export default FreeChartDrawNode